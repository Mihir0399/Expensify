import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Transaction = ({navigation, route}) => {
  const {width, height} = Dimensions.get('screen');
  const [userIncome, setUserIncomes] = useState([]);
  const [userExpences, setUserExpences] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [currentType, setCurrentType] = useState('Expence');
  const [loader, setLoader] = useState(true);
  const [userIncomeAndExpences, setUserIncomeAndExpences] = useState([]);
  const types = [
    {label: 'Income', value: 'Income'},
    {label: 'Expence', value: 'Expence'},
    {label: 'ALL', value: 'ALL'},
  ];
  // const i_category = [
  //   'Salary',
  //   'Rent',
  //   'Commition',
  //   'Profit',
  //   'Interest',
  //   'Dividend',
  //   'Other',
  // ];
  // const e_category = [
  //   'Food',
  //   'Movie',
  //   'Fuel',
  //   'Shopping',
  //   'Travel',
  //   'Education',
  //   'Sport',
  //   'Tickets',
  //   'General',
  //   'Rent',
  //   'Other',
  // ];
  useEffect(() => {
    setCurrentType(route.params?.mode ? route.params?.mode : 'Expence');
  }, []);

  useEffect(() => {
    callOnce();
  }, []);

  setTimeout(() => {
    setLoader(false);
  }, 3000);

  const callOnce = () => {
    getUserinfo()
      .then(result => {
        getData();
      })
      .catch(err => {});
  };

  const getUserinfo = async () => {
    try {
      const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
      setUserEmail(loginData.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getData = async () => {
    const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
    const userData = await firestore()
      .collection('user')
      .doc(loginData.user.email)
      .get();
    if (userData._data != undefined) {
      setUserIncomeAndExpences(userData._data.value);
      let income = [];
      let expence = [];
      userData._data.value.forEach(element => {
        element.Type == 'Income'
          ? (income = [...income, element])
          : (expence = [...expence, element]);
      });
      setUserIncomes(income);
      setUserExpences(expence);
      // let e_Food = [];
      // let e_Movie = [];
      // let e_Fuel = [];
      // let e_Shopping = [];
      // let e_Travel = [];
      // let e_Education = [];
      // let e_Sports = [];
      // let e_Tickets = [];
      // let e_General = [];
      // let e_Rent = [];
      // let e_Other = [];
      // let i_Rent = [];
      // let i_Salary = [];
      // let i_Commition = [];
      // let i_Profit = [];
      // let i_Interest = [];
      // let i_Divident = [];
      // income.forEach(element => {
      //   element.category == 'Salary'
      //     ? (i_Salary = [...i_Salary, element])
      //     : element.category == 'Rent'
      //     ? (i_Rent = [...i_Rent, element])
      //     : element.category == 'Commition'
      //     ? (i_Commition = [...i_Commition, element])
      //     : element.category == 'Profit'
      //     ? (i_Profit = [...i_Profit, element])
      //     : element.category == 'Interest'
      //     ? (i_Interest = [...i_Interest, element])
      //     : element.category == 'Dividend'
      //     ? (i_Divident = [...i_Divident, element])
      //     : element.category == 'Other'
      //     ? (i_Other = [...i_Other, element])
      //     : null;
      // });
      // expence.forEach(element => {
      //   element.category == 'Food'
      //     ? (e_Food = [...e_Food, element])
      //     : element.category == 'Movie'
      //     ? (e_Movie = [...e_Movie, element])
      //     : element.category == 'Fuel'
      //     ? (e_Fuel = [...e_Fuel, element])
      //     : element.category == 'Shopping'
      //     ? (e_Shopping = [...e_Shopping, element])
      //     : element.category == 'Travel'
      //     ? (e_Travel = [...e_Travel, element])
      //     : element.category == 'Education'
      //     ? (e_Education = [...e_Education, element])
      //     : element.category == 'Sport'
      //     ? (e_Sports = [...e_Sports, element])
      //     : element.category == 'Tickets'
      //     ? (e_Tickets = [...e_Tickets, element])
      //     : element.category == 'General'
      //     ? (e_General = [...e_General, element])
      //     : element.category == 'Rent'
      //     ? (e_Rent = [...e_Rent, element])
      //     : element.category == 'Other'
      //     ? (e_Other = [...e_Other, element])
      //     : null;
      // });
    }
  };

  const handaleCardPress = item => {
    navigation.navigate('EditTransaction', {item});
  };

  const showDeleteAlert = item => {
    Alert.alert(
      'Delete Transaction',
      'are you sure want to delete this transaction?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'default',
        },
        {
          text: 'Yes',
          onPress: () => deleteTransaction(item),
          style: 'default',
        },
      ],
      {
        cancelable: false,
        onDismiss: () => {},
      },
    );
  };

  const deleteTransaction = item => {
    const index = userIncomeAndExpences.findIndex(
      x =>
        x.amount === item.item.amount &&
        x.name === item.item.name &&
        x.categories === item.item.categories &&
        x.ImageUrl === item.item.ImageUrl &&
        x.Type === item.item.Type &&
        x.mode === item.item.mode &&
        x.date === item.item.date &&
        x.time === item.item.time,
    );
    const deletedItem = userIncomeAndExpences.splice(index, 1);
    firestore()
      .collection('user')
      .doc(userEmail)
      .update({value: [...userIncomeAndExpences]})
      .then(result => {
        getData();
      })
      .catch(err => {
        console.log('firebase firestore error', err);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          width: width,

          position: 'relative',
        }}>
        <Text style={styles.txtAllT}>Your transactions</Text>

        <View
          style={{
            height: 60,
            width: 110,
            borderRadius: 1,
            marginLeft: 90,
            right: 10,
            top: 10,
          }}>
          <DropDownPicker
            items={types}
            open={isTypeOpen}
            value={currentType}
            setOpen={() => {
              setIsTypeOpen(!isTypeOpen);
            }}
            setValue={val => {
              setCurrentType(val);
            }}
            maxHeight={120}
            disableBorderRadius={false}
            showTickIcon={false}
            style={styles.typepkr}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            getData();
          }}>
          <Icon
            name="rotate"
            size={25}
            color={'black'}
            style={{marginTop: 20, marginLeft: 10, right: 10}}
          />
        </TouchableOpacity>
      </View>
      {/* {currentType == 'Expence' ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={e_category}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TransactionDetail', {
                  category: item.item,
                  type: currentType,
                });
              }}>
              <View
                style={[
                  styles.Transaction,
                  {
                    width: width - 20,
                    borderColor: '#fd3c4a',
                  },
                ]}>
                <View style={styles.iconContainer}>
                  <Icon name="angles-down" size={30} color={'#fd3c4a'} />
                </View>

                <View style={styles.txtContainer}>
                  <Text style={[styles.txtCatagory, {left: 10}]}>
                    {item.item}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={i_category}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TransactionDetail', {
                  category: item.item,
                  type: currentType,
                });
              }}>
              <View
                style={[
                  styles.Transaction,
                  {
                    width: width - 20,
                    borderColor: '#00a86b',
                  },
                ]}>
                <View style={styles.iconContainer}>
                  <Icon name="angles-up" size={30} color={'#00a86b'} />
                </View>

                <View style={styles.txtContainer}>
                  <Text style={[styles.txtCatagory, {left: 10}]}>
                    {item.item}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )} */}

      {currentType == 'ALL' ? (
        userIncomeAndExpences.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userIncomeAndExpences}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  handaleCardPress(item.item);
                }}
                onLongPress={() => {
                  showDeleteAlert(item);
                }}>
                <View
                  style={[
                    styles.Transaction,
                    {
                      width: width - 20,
                      borderColor:
                        item.item.Type == 'Income' ? '#00a86b' : '#fd3c4a',
                    },
                  ]}>
                  {item.item.ImageUrl ? (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: item.item.ImageUrl,
                        }}
                        style={styles.image}></Image>
                    </View>
                  ) : (
                    <View style={styles.iconContainer}>
                      {item.item.Type == 'Income' ? (
                        <Icon name="angles-up" size={30} color={'#00a86b'} />
                      ) : (
                        <Icon name="angles-down" size={30} color={'#fd3c4a'} />
                      )}
                    </View>
                  )}

                  <View style={styles.txtContainer}>
                    <Text style={[styles.txtCatagory, {left: 10}]}>
                      {item.item.category}
                    </Text>
                    <Text style={[styles.txtDiscription, {left: 7}]}>
                      {item.item.name}
                    </Text>
                  </View>
                  <View style={styles.txtSubContainer}>
                    <Text
                      style={[
                        styles.txtCatagory,
                        {
                          right: 10,
                          color:
                            item.item.Type == 'Income' ? '#00a86b' : '#fd3c4a',
                        },
                      ]}>
                      {item.item.Type == 'Income' ? '+' : '-'}Rs{' '}
                      {item.item.amount}
                    </Text>
                    <Text style={[styles.txtDiscription, {right: 15}]}>
                      {item.item.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#5271fa'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text>No transaction</Text>
          </View>
        )
      ) : currentType == 'Income' ? (
        userIncome.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userIncome}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  handaleCardPress(item.item);
                }}
                onLongPress={() => {
                  showDeleteAlert(item);
                }}>
                <View
                  style={[
                    styles.Transaction,
                    {
                      width: width - 20,
                      borderColor: '#00a86b',
                    },
                  ]}>
                  {item.item.ImageUrl ? (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: item.item.ImageUrl,
                        }}
                        style={styles.image}></Image>
                    </View>
                  ) : (
                    <View style={styles.iconContainer}>
                      <Icon name="angles-up" size={30} color={'#00a86b'} />
                    </View>
                  )}

                  <View style={styles.txtContainer}>
                    <Text style={[styles.txtCatagory, {left: 10}]}>
                      {item.item.category}
                    </Text>
                    <Text style={[styles.txtDiscription, {left: 7}]}>
                      {item.item.name}
                    </Text>
                  </View>
                  <View style={styles.txtSubContainer}>
                    <Text
                      style={[
                        styles.txtCatagory,
                        {
                          right: 10,
                          color: '#00a86b',
                        },
                      ]}>
                      + Rs {item.item.amount}
                    </Text>
                    <Text style={[styles.txtDiscription, {right: 15}]}>
                      {item.item.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#5271fa'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text>No transaction</Text>
          </View>
        )
      ) : currentType == 'Expence' ? (
        userExpences.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userExpences}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => {
                  handaleCardPress(item.item);
                }}
                onLongPress={() => {
                  showDeleteAlert(item);
                }}>
                <View
                  style={[
                    styles.Transaction,
                    {
                      width: width - 20,
                      borderColor: '#fd3c4a',
                    },
                  ]}>
                  {item.item.ImageUrl ? (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{
                          uri: item.item.ImageUrl,
                        }}
                        style={styles.image}></Image>
                    </View>
                  ) : (
                    <View style={styles.iconContainer}>
                      <Icon name="angles-down" size={30} color={'#fd3c4a'} />
                    </View>
                  )}

                  <View style={styles.txtContainer}>
                    <Text style={[styles.txtCatagory, {left: 10}]}>
                      {item.item.category}
                    </Text>
                    <Text style={[styles.txtDiscription, {left: 7}]}>
                      {item.item.name}
                    </Text>
                  </View>
                  <View style={styles.txtSubContainer}>
                    <Text
                      style={[
                        styles.txtCatagory,
                        {
                          right: 10,
                          color: '#fd3c4a',
                        },
                      ]}>
                      {item.item.Type == 'Income' ? '+' : '-'}Rs{' '}
                      {item.item.amount}
                    </Text>
                    <Text style={[styles.txtDiscription, {right: 15}]}>
                      {item.item.time}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : loader ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={'#5271fa'} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text>No transaction</Text>
          </View>
        )
      ) : null}

      <View style={{height: 100}}></View>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  txtAllT: {
    marginTop: 20,
    color: 'black',
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 17,
  },
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
    //alignItems: 'center',
    height: 100,
    width: 210,
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
  txtSubContainer: {justifyContent: 'space-evenly', height: 100, width: 100},
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
