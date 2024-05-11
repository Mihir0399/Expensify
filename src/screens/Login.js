import React, {useState, useEffect} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errTxt, setErrTxt] = useState('');
  const [showPass, setShowPass] = useState(true);

  const login = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        setErrTxt('');
        const Islogin = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        try {
          await AsyncStorage.setItem('Login', JSON.stringify(Islogin));
        } catch (error) {
          console.log(error.message);
        }
        console.log('Islogin=============================', Islogin);
        navigation.replace('MainTab');

        // if (Islogin.user.emailVerified) {
        //   navigation.replace('MainTab');
        // } else {
        //   Alert.alert('Please check inbox and verify acount');
        //   auth().currentUser.sendEmailVerification();
        // }
      } else {
        setErrTxt('Please enter your email address and password');
      }
    } catch (error) {
      setErrTxt(error.message);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '617826540532-vlnuk2mi3ua1k60as5gnf04s817piti1.apps.googleusercontent.com',
    });
  });
  const signIn = async () => {
    // try {
    //   // Check if your device supports Google Play
    //   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    //   // Get the users ID token
    //   const userdetails = await GoogleSignin.signIn();
    //   // userdetails === null ? setLoader(true) : setLoader(false);
    //   // setUser(userdetails);
    //   console.log('......................', userdetails);

    //   // Create a Google credential with the token
    //   const googleCredential = auth.GoogleAuthProvider.credential(
    //     userdetails?.idToken,
    //   );yarn

    //   // Sign-in the user with the credential
    //   return auth().signInWithCredential(googleCredential);
    //   navigation.replace('MainTab');
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     console.log('......................', SIGN_IN_CANCELLED);
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //     console.log('......................', IN_PROGRESS);
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //     console.log('......................', PLAY_SERVICES_NOT_AVAILABLE);
    //   } else {
    //     // some other error happened
    //     console.log('......................', error);
    //   }
    // }
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      try {
        await AsyncStorage.setItem('Login', JSON.stringify(userInfo));
      } catch (error) {
        console.log(error.message);
      }
      navigation.replace('MainTab');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
      } else {
        console.log(error.code);
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Logo />
      <View>
        <Text style={styles.txtLogin}>Login</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            inputMode="email"
            style={styles.textFields}></TextInput>
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
          <TouchableOpacity
            onPress={() => {
              navigation.push('ForgotPassword');
            }}
            style={styles.btnForgotPass}>
            <Text style={styles.txtForgotPass}>Forgot your password?</Text>
          </TouchableOpacity>
          {errTxt ? <Text style={styles.errTxt}>{errTxt}</Text> : null}
          <TouchableOpacity onPress={login}>
            <View style={styles.btnLogin}>
              <Text style={styles.txtLogin}>Login</Text>
            </View>
          </TouchableOpacity>
          {/* <Text>or</Text> */}
          {/* <TouchableOpacity onPress={signIn}>
            <View style={styles.btnLoginGoogle}>
              <Image
                source={require('C:/Users/Admin/React-native project/Expensify/src/assets/google.png')}
                style={styles.ImgGoogle}></Image>
              <Text style={styles.txtLoginWithGoogle}>Login With Google</Text>
            </View>
          </TouchableOpacity> */}
          <View style={styles.btnSignUpCntainer}>
            <Text style={styles.fontSize14}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.push('SignUp');
              }}>
              <Text style={styles.txtSignUp}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  errTxt: {fontSize: 11, color: 'red', fontWeight: '300', marginHorizontal: 50},
  mainContainer: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  txtLogin: {fontSize: 20, marginBottom: 10, fontWeight: '500'},
  container: {alignItems: 'center'},
  textFields: {
    borderWidth: 0.8,
    width: 300,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    borderColor: '#3d7f8f',
  },
  btnForgotPass: {marginLeft: 155, margin: 10},
  txtForgotPass: {color: '#3d7f8f', fontSize: 14, fontStyle: 'italic'},
  btnLogin: {
    backgroundColor: '#3d7f8f',
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  txtLogin: {color: 'white', fontSize: 18},
  btnLoginGoogle: {
    borderWidth: 1,
    borderColor: '#3d7f8f',
    height: 45,
    width: 250,
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    paddingLeft: 15,
    flexDirection: 'row',
  },
  ImgGoogle: {height: 25, width: 25},
  txtLoginWithGoogle: {marginLeft: 30, fontSize: 16},
  btnSignUpCntainer: {flexDirection: 'row', margin: 10},
  fontSize14: {fontSize: 14},
  txtSignUp: {color: '#3d7f8f', fontStyle: 'italic'},
  btnEye: {height: 25, width: 25, marginTop: 11, marginEnd: 20},
});
