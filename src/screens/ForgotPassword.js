import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../components/logo/logo';
import auth from '@react-native-firebase/auth';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errTxt, setErrTxt] = useState('');
  const sendLink = async email => {
    if (email.length > 0) {
      setErrTxt('');
      try {
        await auth().sendPasswordResetEmail(email);
        setEmail('');
        Alert.alert(
          'Reset Password',
          `password reset email is sent to ${email} \ncheck your Inbox.`,
        );
      } catch (error) {
        setErrTxt(error.message);
      }
    } else {
      setErrTxt('Please enter a valid email address');
    }
  };
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.txtForgotPassword}>Forgot Password?</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        inputMode="email"
        style={styles.textFields}></TextInput>
      {errTxt ? <Text style={styles.errTxt}>{errTxt}</Text> : null}
      <TouchableOpacity
        onPress={() => {
          sendLink(email);
        }}>
        <View style={styles.btnLogin}>
          <Text style={styles.txtLogin}>Send Link</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  errTxt: {fontSize: 11, color: 'red', fontWeight: '300', marginHorizontal: 50},
  container: {flex: 10, alignItems: 'center'},
  textFields: {
    borderWidth: 0.8,
    width: 300,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    borderColor: '#3d7f8f',
  },
  txtForgotPassword: {fontSize: 20, fontWeight: 'bold', marginBottom: 20},
  btnLogin: {
    backgroundColor: '#3d7f8f',
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 20,
  },
  txtLogin: {color: 'white', fontSize: 18},
});
