import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home';
import Profile from '../../screens/Profile';
import Transaction from '../../screens/Transaction';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTransaction from '../../screens/AddTransaction';
import Chart from '../../screens/Chart';
const Tab = createBottomTabNavigator();
const CustomTabBarNutton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        elevation: 5,
      }}
      onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 35,
          backgroundColor: '#5271fa',
        }}>
        <Icon name="plus" color="white" size={35} />
      </View>
    </TouchableOpacity>
  );
};
const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 3,
          backgroundColor: '#FFFF',
          borderRadius: 15,
          height: 60,
          paddingBottom: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="home" color={focused ? '#5271fa' : 'gray'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="exchange"
              color={focused ? '#5271fa' : 'gray'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddTransaction"
        component={AddTransaction}
        options={{
          tabBarButton: props => <CustomTabBarNutton {...props} />,
        }}
      />
      <Tab.Screen
        name="Chart"
        component={Chart}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="pie-chart"
              color={focused ? '#5271fa' : 'gray'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon name="user" color={focused ? '#5271fa' : 'gray'} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
