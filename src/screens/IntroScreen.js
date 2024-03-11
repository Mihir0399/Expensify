import React, {useEffect} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import Logo from '../components/logo/logo';
const Intro = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Logo color={'#4042e2'} marginVertical={70} />
      <Image
        source={require('C:/Users/Admin/React-native project/Expensify/src/assets/expenseManagement.jpg')}
        style={{height: 300, width: 400}}></Image>

      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '500',
            marginTop: 20,
            color: 'black',
          }}>
          Welcome to
        </Text>
        <View style={{width: 5}}></View>
        <Text
          style={{
            fontSize: 23,
            fontWeight: '700',
            marginTop: 20,
            color: '#4042e2',
          }}>
          Expensify
        </Text>
      </View>
      <Text
        style={{
          fontSize: 17,
          marginTop: 20,
          fontStyle:'italic',
          fontWeight:'bold',
          color:'black'
        }}>
        Track and manage your expenses effortlessly!
      </Text>
        <TouchableOpacity style={{marginTop:50}} onPress={()=>{navigation.replace('Login')}}>
          <View style={{height:50,width:100,backgroundColor:'#4042e2',borderRadius:30,alignItems:'center',justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:20}}>Start</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};
export default Intro;

