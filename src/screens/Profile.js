import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/logo/logo';
const Profile = ({navigation}) => {
  const [userData, setUserData] = useState();
  const {height, width} = Dimensions.get('screen');
  const logOut = async () => {
    try {
      await Auth().signOut();
      console.log('Log Out');
      navigation.replace('Login');
    } catch (error) {}
    try {
      await GoogleSignin.signOut();
      console.log('Log Out');
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const getUserinfo = async () => {
    try {
      const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
      setUserData(loginData.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const showLogoutAlert = () => {
    Alert.alert(
      'Logout',
      'are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: () => logOut(),
          style: 'default',
        },
      ],
      {
        cancelable: false,
        onDismiss: () => {},
      },
    );
  };

  useEffect(() => {
    getUserinfo();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: width - 20,
        }}>
        <View style={{marginRight: 5}}>
          <Logo color={'#5271fa'} marginVertical={15} size={10} />
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.userIconContainer}>
          <Icon name="user" color={'#5271fa'} size={60} />
        </View>
        <Text style={{color: 'black', fontSize: 17, marginTop: 10}}>
          {userData?.givenName}
        </Text>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{fontSize: 17}}>Email : </Text>
          <Text style={{color: 'black', fontSize: 17}}>{userData?.email}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.txtAllContainer}
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}>
          <Text style={styles.txtAll}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.txtAllContainer}
          onPress={() => {
            navigation.navigate('T&C');
          }}>
          <Text style={styles.txtAll}>Terms of Use</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.txtAllContainer}
          onPress={() => {
            navigation.navigate('ContectUs');
          }}>
          <Text style={styles.txtAll}>Contect us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.txtAllContainer}
          onPress={() => {
            showLogoutAlert();
          }}>
          <Text style={[styles.txtAll, {color: 'red'}]}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  txtAll: {color: '#3d7f8f', fontSize: 17},
  txtAllContainer: {
    height: 50,
    width: 300,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'gray',
    marginTop: 20,
    justifyContent: 'center',
    padding: 10,
  },
  btnContainer: {marginTop: 30},
  profileContainer: {
    backgroundColor: 'white',
    height: 250,
    width: 300,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  userIconContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
