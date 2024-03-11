import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import Logo from '../components/logo/logo';
import auth from '@react-native-firebase/auth';
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [errTxt, setErrTxt] = useState('');
  const [passErr, setPassErr] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [showCnfPass, setShowCnfPass] = useState(true);
  const signUp = async () => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      cnfPassword.length > 0
    ) {
      setErrTxt('');
      if (password == cnfPassword) {
        setPassErr('');
        try {
          const IsSignUp = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          await auth().currentUser.sendEmailVerification();
          Alert.alert(
            'Verify your account',
            'Verification link sent to your Email Address check Inbox.',
          );
          console.log(IsSignUp, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,');
          navigation.replace('MainTab');
        } catch (err) {
          setErrTxt(err.message);
        }
      } else {
        setPassErr('Password not matched');
      }
    } else {
      setErrTxt('All fields are required');
    }
  };
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Logo />
      <View>
        <Text style={{fontSize: 20, marginBottom: 10, fontWeight: '500'}}>
          Create account
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            onChangeText={setName}
            value={name}
            placeholder="Name"
            style={{
              borderWidth: 0.8,
              width: 300,
              borderRadius: 20,
              margin: 10,
              padding: 10,
              borderColor: '#3d7f8f',
            }}></TextInput>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            inputMode="email"
            style={{
              borderWidth: 0.8,
              width: 300,
              borderRadius: 20,
              margin: 10,
              padding: 10,
              borderColor: '#3d7f8f',
            }}></TextInput>
          <View
            style={[
              styles.textFields,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 0,
                paddingLeft: 6,
              },
            ]}>
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry={showPass}
              style={{width: 200}}></TextInput>
            {showPass ? (
              <TouchableOpacity
                onPress={() => {
                  setShowPass(!showPass);
                }}>
                <Image
                  source={require('C:/Users/Admin/React-native project/Expensify/src/assets/hidePassword.png')}
                  style={styles.btnEye}></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setShowPass(!showPass);
                }}>
                <Image
                  source={require('C:/Users/Admin/React-native project/Expensify/src/assets/showPassword.png')}
                  style={styles.btnEye}></Image>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={[
              styles.textFields,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 0,
                paddingLeft: 6,
              },
            ]}>
            <TextInput
              onChangeText={setCnfPassword}
              value={cnfPassword}
              placeholder="Confirm Password"
              secureTextEntry={showCnfPass}
              style={{width: 200}}></TextInput>
            {showCnfPass ? (
              <TouchableOpacity
                onPress={() => {
                  setShowCnfPass(!showCnfPass);
                }}>
                <Image
                  source={require('C:/Users/Admin/React-native project/Expensify/src/assets/hidePassword.png')}
                  style={styles.btnEye}></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setShowCnfPass(!showCnfPass);
                }}>
                <Image
                  source={require('C:/Users/Admin/React-native project/Expensify/src/assets/showPassword.png')}
                  style={styles.btnEye}></Image>
              </TouchableOpacity>
            )}
          </View>
          {/* <TextInput
            onChangeText={setCnfPassword}
            value={cnfPassword}
            placeholder="Confirm Password"
            style={{
              borderWidth: 0.8,
              width: 300,
              borderRadius: 20,
              borderColor: '#3d7f8f',
              margin: 10,
              padding: 10,
            }}></TextInput> */}
          {errTxt ? (
            <Text style={styles.errTxt}>{errTxt}</Text>
          ) : passErr ? (
            <Text style={styles.errTxt}>{passErr}</Text>
          ) : null}
          <TouchableOpacity onPress={signUp}>
            <View
              style={{
                backgroundColor: '#3d7f8f',
                height: 45,
                width: 250,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                margin: 10,
              }}>
              <Text style={{color: 'white', fontSize: 18}}>SignUp</Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text style={{fontSize: 14}}>Already have account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <Text style={{color: '#3d7f8f', fontStyle: 'italic'}}>LogIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUp;
const styles = StyleSheet.create({
  errTxt: {fontSize: 11, color: 'red', fontWeight: '300', marginHorizontal: 50},
  textFields: {
    borderWidth: 0.8,
    width: 300,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    borderColor: '#3d7f8f',
  },
  btnEye: {height: 25, width: 25, marginTop: 11, marginEnd: 20},
});
