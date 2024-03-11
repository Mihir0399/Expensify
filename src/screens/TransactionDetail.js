import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionDetail = ({navigation, route}) => {
  const [cat_data, setCat_data] = useState([]);
  const category = route.params?.category;
  const type = route.params?.type;
  const {width, height} = Dimensions.get('screen');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getData();
  }, []);
  setTimeout(() => {
    setLoader(false);
  }, 3000);

  const getData = async () => {
    const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
    const userData = await firestore()
      .collection('user')
      .doc(loginData.user.email)
      .get();
    if (userData._data != undefined) {
      let data = [];

      userData._data.value.forEach(element => {
        element.Type == type && element.category == category
          ? (data = [...data, element])
          : null;
      });
      setCat_data(data);
      console.log('data', data);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View>
        <Text
          style={{
            fontSize: 30,
            alignSelf: 'center',
            color: type == 'Income' ? '#00a86b' : '#fd3c4a',
            fontWeight: '500',
          }}>
          {category}
        </Text>
      </View>
      {cat_data.length > 0 ? (
        <FlatList
          data={cat_data}
          renderItem={item => (
            <View
              style={[
                styles.Transaction,
                {
                  width: width - 20,
                  borderColor: type == 'Income' ? '#00a86b' : '#fd3c4a',
                },
              ]}>
              {item.item.ImageUrl ? (
                <View style={styles.imageContainer}>
                  <Image source={{}} style={styles.image}></Image>
                </View>
              ) : (
                <View style={styles.iconContainer}>
                  <Icon
                    name="angles-up"
                    size={30}
                    color={type == 'Income' ? '#00a86b' : '#fd3c4a'}
                  />
                </View>
              )}

              <View style={[styles.txtContainer]}>
                <Text style={[styles.txtCatagory, {left: 7}]}>
                  {item.item.name}
                </Text>
                <Text style={[styles.txtDiscription]}>{item.item.date}</Text>
              </View>
              <View style={styles.txtSubContainer}>
                <Text
                  style={[
                    styles.txtCatagory,
                    {
                      right: 10,
                      color: type == 'Income' ? '#00a86b' : '#fd3c4a',
                    },
                  ]}>
                  + Rs {item.item.amount}
                </Text>
                <Text style={[styles.txtDiscription, {right: 15}]}>
                  {item.item.time}
                </Text>
              </View>
            </View>
          )}
        />
      ) : loader ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <ActivityIndicator
            size={'large'}
            color={type == 'Income' ? '#00a86b' : '#fd3c4a'}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No transaction</Text>
        </View>
      )}
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  Transaction: {
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    //elevation: 20,
    borderWidth: 0.5,
    borderBlockColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderColor: 'black',
    borderRadius: 35,
    borderWidth: 0.5,
  },
  txtContainer: {
    justifyContent: 'space-evenly',
    //marginLeft: 10,
    height: 100,
    width: 180,
  },
  txtCatagory: {
    fontSize: 25,
    color: 'black',
    //fontWeight: '500',
  },
  txtDiscription: {
    fontSize: 15,
    color: 'black',
    opacity: 0.5,
    marginLeft: 7,
  },
  txtSubContainer: {
    justifyContent: 'space-evenly',
    height: 100,
    width: 120,
  },
  imageContainer: {
    // elevation: 5,
    height: 60,
    width: 60,
    marginLeft: 10,
    borderRadius: 30,
  },
  typepkr: {
    borderColor: 'black',
    borderWidth: 0,
  },
  iconContainer: {
    height: 60,
    width: 60,
    marginLeft: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0,
  },
  txtNTContainer: {flex: 1, justifyContent: 'center'},
});
