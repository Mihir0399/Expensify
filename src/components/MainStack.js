import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Intro from '../screens/IntroScreen';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import SplashScreen from '../screens/SplashScreen';
import EditTransaction from '../screens/EditTransaction';
import MainTab from './MainTab/MainTab';
import TermsAndCondition from '../screens/T&C';
import ContectUs from '../screens/ContectUs';
import TransactionDetail from '../screens/TransactionDetail';
const stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="intro"
          component={Intro}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="EditTransaction"
          component={EditTransaction}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="TransactionDetail"
          component={TransactionDetail}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />

        <stack.Screen
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="T&C"
          component={TermsAndCondition}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="ContectUs"
          component={ContectUs}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
