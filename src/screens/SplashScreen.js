import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../components/logo/logo';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const SplashScreen = ({navigation}) => {
  const isLogin = async () => {
    let isSignedInG = await GoogleSignin.isSignedIn();
    console.log('isSignedInG', isSignedInG);
    if (auth().currentUser || isSignedInG) {
      console.log('auth().currentUser', auth().currentUser);
      console.log('GoogleSignin.getCurrentUser()', isSignedInG);
      navigation.replace('MainTab');
    } else {
      console.log('GoogleSignin.getCurrentUser()', isSignedInG);
      navigation.replace('intro');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      isLogin();
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <Logo color={'white'} marginVertical={320} />
      <ActivityIndicator
        color={'white'}
        size="large"
        style={{marginBottom: 10}}
      />
      <Text style={styles.txtTMS}>Track, Manage & Succeed </Text>
      {/* <Text style={styles.txtEnd}>Your Partner in Tracking Financial Adventures</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3d7f8f',
  },
  txtTMS: {color: 'white', fontSize: 15, fontWeight: '400'},
  txtEnd: {color: 'white', fontSize: 15, fontWeight: '400'},
});
