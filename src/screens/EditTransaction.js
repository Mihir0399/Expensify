import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Button,
  PermissionsAndroid,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
const EditTransaction = ({navigation, route}) => {
  var today = new Date();
  var time = today.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const [mydate, setDate] = useState(new Date());
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionTime, setTransactionTime] = useState('');
  const [displaymode, setMode] = useState('date');
  const [isDisplayDate, setShow] = useState(false);
  const [displaytimemode, setTimeMode] = useState('time');
  const [isDisplayTime, setTimeShow] = useState(false);
  const [cameraPhoto, setCameraPhoto] = useState();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState('');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [currentType, setCurrentType] = useState('');
  const [errTxt, setErrTxt] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userIncomeAndExpences, setUserIncomeAndExpences] = useState('');
  const {width, height} = Dimensions.get('screen');
  const item = route.params?.item;

  const categories =
    currentType == 'Income'
      ? [
          {label: 'Salary', value: 'Salary'},
          {label: 'Rent', value: 'Rent'},
          {label: 'Commition', value: 'Commition'},
          {label: 'Profit', value: 'Profit'},
          {label: 'Interest', value: 'Interest'},
          {label: 'Dividend', value: 'Dividend'},
          {label: 'Other', value: 'Other'},
        ]
      : [
          {label: 'Food', value: 'Food'},
          {label: 'Movie', value: 'Movie'},
          {label: 'Fuel', value: 'Fuel'},
          {label: 'Shopping', value: 'Shopping'},
          {label: 'Travel', value: 'Travel'},
          {label: 'Education', value: 'Education'},
          {label: 'Sport', value: 'Sport'},
          {label: 'Tickets', value: 'Tickets'},
          {label: 'General', value: 'General'},
          {label: 'Rent', value: 'Rent'},
          {label: 'Other', value: 'Other'},
        ];
  const modes = [
    {label: 'Cash', value: 'Cash'},
    {label: 'Credit Card', value: 'Credit Card'},
    {label: 'Debit Card', value: 'Debit Card'},
    {label: 'Net Banking', value: 'Net Banking'},
    {label: 'Cheque', value: 'Cheque'},
    {label: 'Other', value: 'Other'},
  ];
  const types = [
    {label: 'Income', value: 'Income'},
    {label: 'Expence', value: 'Expence'},
  ];

  useEffect(() => {
    setCameraPhoto(item.ImageUrl);
    setAmount(item.amount);
    setName(item.name);
    setCurrentType(item.Type);
    setCurrentCategory(item.category);
    setCurrentMode(item.mode);
    setTransactionDate(item.date);
    setTransactionTime(item.time);
  }, []);
  useEffect(() => {
    callOnce();
  }, []);
  useEffect(() => {
    getData();
  }, [amount]);
  const callOnce = () => {
    getUserinfo()
      .then(result => {
        getData();
      })
      .catch(err => {});
  };

  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTransactionDate(
      currentDate.getDate() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getFullYear(),
    );
    setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const displayDatepicker = () => {
    showMode('date');
  };

  const changeSelectedTime = (event, selectedDate) => {
    const currentTime = selectedDate;
    setTransactionTime(
      currentTime.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    );
    setTimeShow(false);
  };
  const showTimeMode = currentMode => {
    setTimeShow(true);
    setTimeMode(currentMode);
  };
  const displayTimepicker = () => {
    showTimeMode('time');
  };
  let options = {
    savetoPhotos: true,
    mediaType: 'photo',
    cameraType: 'front',
  };

  const getData = async () => {
    const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
    const userData = await firestore()
      .collection('user')
      .doc(loginData.user.email)
      .get();
    setUserIncomeAndExpences(userData._data.value);
  };

  const getUserinfo = async () => {
    try {
      const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
      setUserEmail(loginData.user.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const setIncomeAndExpenceToLocal = async () => {
    try {
      await AsyncStorage.setItem(
        'userIncomeAndExpences',
        JSON.stringify(userIncomeAndExpences),
      );
    } catch (error) {
      console.log('asyncStorage error', error);
    }
  };
  const deleteTransaction = () => {
    const index = userIncomeAndExpences.findIndex(
      x =>
        x.amount === item.amount &&
        x.name === item.name &&
        x.categories === item.categories &&
        x.ImageUrl === item.ImageUrl &&
        x.Type === item.Type &&
        x.mode === item.mode &&
        x.date === item.date &&
        x.time === item.time,
    );
    console.log('index: ', index);
    const deletedItem = userIncomeAndExpences.splice(index, 1);
    console.log('deletedItem.....................', deletedItem);
    firestore()
      .collection('user')
      .doc(userEmail)
      .update({value: [...userIncomeAndExpences]})
      .then(result => {
        setAmount('');
        setCameraPhoto('');
        setCurrentCategory('');
        setCurrentMode('');
        setCurrentType('');
        setName('');
        setIncomeAndExpenceToLocal();
        navigation.navigate('Transaction');
      })
      .catch(err => {
        console.log('firebase firestore error', err);
      });
  };

  const editTransaction = () => {
    if (
      name.length > 0 &&
      amount != '' &&
      currentCategory.length > 0 &&
      currentMode.length > 0 &&
      currentType.length > 0
    ) {
      setErrTxt('');

      const data = {
        Type: currentType,
        name: name,
        amount: amount,
        category: currentCategory,
        mode: currentMode,
        ImageUrl: cameraPhoto == undefined ? null : cameraPhoto,
        date: transactionDate,
        time: transactionTime,
      };
      console.log(
        'userIncomeAndExpences......................',
        userIncomeAndExpences,
      );
      const index = userIncomeAndExpences.findIndex(
        x =>
          x.amount === item.amount &&
          x.name === item.name &&
          x.categories === item.categories &&
          x.ImageUrl === item.ImageUrl &&
          x.Type === item.Type &&
          x.mode === item.mode &&
          x.date === item.date &&
          x.time === item.time,
      );

      userIncomeAndExpences[index] = data;
      console.log('index: ', index);
      firestore()
        .collection('user')
        .doc(userEmail)
        .update({value: [...userIncomeAndExpences]})
        .then(result => {
          setAmount('');
          setCameraPhoto('');
          setCurrentCategory('');
          setCurrentMode('');
          setCurrentType('');
          setName('');
          setIncomeAndExpenceToLocal();
          navigation.navigate('Transaction');
        })
        .catch(err => {
          console.log('firebase firestore error', err);
        });
    } else {
      setErrTxt('All fields are required');
    }
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const result = await launchCamera(options);
        setCameraPhoto(result.assets[0].uri);
      } catch (error) {}
    }
  };
  const openGalary = async () => {
    const result = await launchImageLibrary(options);
    setCameraPhoto(result.assets[0].uri);
  };

  const showDeleteAlert = () => {
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
          onPress: () => deleteTransaction(),
          style: 'default',
        },
      ],
      {
        cancelable: false,
        onDismiss: () => {},
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.txtET, {marginLeft: 20}]}>Edit transaction</Text>
        <TouchableOpacity
          onPress={() => {
            showDeleteAlert();
          }}>
          <Icon
            name="delete"
            size={30}
            color={'#fd3c4a'}
            style={{marginRight: 20, marginTop: 10}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <TouchableOpacity
          onPress={() => {
            openCamera();
          }}>
          {cameraPhoto ? (
            <Image source={{uri: cameraPhoto}} style={styles.image}></Image>
          ) : (
            <Icon name="add-photo-alternate" size={50} />
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.txtET}>Transaction Image</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        style={[styles.textFields]}
        placeholder="Transaction Name"></TextInput>
      <View style={{flexDirection: 'row', width: 320}}>
        <TextInput
          onChangeText={setAmount}
          value={amount}
          style={[styles.dtpkr, {height: 60}]}
          placeholder="Amount"
          keyboardType="decimal-pad"></TextInput>
        <View style={{}}>
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
            maxHeight={150}
            autoScroll
            placeholder="Type"
            disableBorderRadius={false}
            style={[styles.dtpkr, {height: 60}]}
          />
        </View>
      </View>
      <View style={[styles.dateTimeContainer, {width: 300}]}>
        <Text style={{marginLeft: 15}}>Date</Text>
        <Text style={{marginLeft: 130}}>Time</Text>
      </View>
      <View style={[styles.dateTimeContainer]}>
        <TouchableOpacity
          onPress={() => {
            displayDatepicker();
          }}>
          <View style={styles.dtpkr}>
            <Icon
              name="calendar-month"
              size={30}
              color={
                currentType
                  ? currentType == 'Income'
                    ? '#00a86b'
                    : '#fd3c4a'
                  : '#5271fa'
              }
            />
            <Text style={styles.txtdt}>{transactionDate}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            displayTimepicker();
          }}>
          <View style={styles.dtpkr}>
            <Icon
              name="access-time"
              size={30}
              color={
                currentType
                  ? currentType == 'Income'
                    ? '#00a86b'
                    : '#fd3c4a'
                  : '#5271fa'
              }
            />
            <Text style={styles.txtdt}>{transactionTime}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: 300,
          margin: 10,
        }}>
        <DropDownPicker
          items={categories}
          open={isCategoryOpen}
          value={currentCategory}
          setOpen={() => {
            setIsCategoryOpen(!isCategoryOpen);
          }}
          setValue={val => {
            setCurrentCategory(val);
          }}
          maxHeight={150}
          autoScroll
          placeholder="Select Category"
          dropDownDirection="TOP"
          disableBorderRadius={false}
          style={[styles.textFields, {margin: 0}]}
        />
      </View>

      <View
        style={{
          width: 300,
          margin: 10,
        }}>
        <DropDownPicker
          items={modes}
          open={isModeOpen}
          value={currentMode}
          setOpen={() => {
            setIsModeOpen(!isModeOpen);
          }}
          setValue={val => {
            setCurrentMode(val);
          }}
          maxHeight={150}
          autoScroll
          placeholder="Select Mode"
          dropDownDirection="TOP"
          disableBorderRadius={false}
          style={[styles.textFields, {margin: 0}]}
        />
      </View>
      {errTxt ? <Text style={styles.errTxt}>{errTxt}</Text> : null}
      <TouchableOpacity
        onPress={() => {
          editTransaction();
        }}>
        <View
          style={[
            styles.btnLogin,
            {
              backgroundColor: currentType
                ? currentType == 'Income'
                  ? '#00a86b'
                  : '#fd3c4a'
                : '#5271fa',
            },
          ]}>
          <Text style={styles.txtLogin}>Update</Text>
        </View>
      </TouchableOpacity>

      {isDisplayDate && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mydate}
          mode={displaymode}
          is24Hour={false}
          display="default"
          onChange={changeSelectedDate}
        />
      )}
      {isDisplayTime && (
        <DateTimePicker
          value={mydate}
          mode={displaytimemode}
          is24Hour={false}
          display="default"
          onChange={changeSelectedTime}
        />
      )}
      <View style={{height: 200}}></View>
    </View>
  );
};

export default EditTransaction;

const styles = StyleSheet.create({
  errTxt: {fontSize: 11, color: 'red', fontWeight: '300', marginHorizontal: 50},
  imageContainer: {
    borderBlockColor: 'black',
    borderWidth: 0.1,
    borderRadius: 40,
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    marginTop: 50,
  },
  txtET: {
    marginTop: 15,
    color: 'black',
    marginBottom: 10,
    fontSize: 17,
  },
  textFields: {
    borderWidth: 0.8,
    width: 300,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    borderColor: 'black',
    height: 50,
  },
  dateTimeContainer: {
    flexDirection: 'row',
  },
  dtpkr: {
    height: 70,
    width: 140,
    margin: 10,
    borderColor: 'black',
    borderWidth: 0.8,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  txtdt: {
    margin: 10,
  },
  image: {height: 80, width: 80, borderRadius: 40},
  btnLogin: {
    height: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  txtLogin: {color: 'white', fontSize: 18},
});
