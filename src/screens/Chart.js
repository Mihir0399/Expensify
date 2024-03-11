import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LineChart from 'react-native-chart-kit/dist/line-chart';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Chart = () => {
  const [today, setToday] = useState(
    new Date().getDate() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getFullYear(),
  );
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [currentType, setCurrentType] = useState('Expence');
  const [userIncome, setUserIncomes] = useState({});
  const [userExpences, setUserExpences] = useState({});
  const [userIncomeAndExpences, setUserIncomeAndExpences] = useState([]);
  const {height, width} = Dimensions.get('screen');
  const [loader, setLoader] = useState(true);
  const types = [
    {label: 'Income', value: 'Income'},
    {label: 'Expence', value: 'Expence'},
  ];
  let lastDateObj = new Date();
  lastDateObj.setDate(lastDateObj.getDate() - 6);
  let day6Obj = new Date();
  day6Obj.setDate(day6Obj.getDate() - 5);
  let day5Obj = new Date();
  day5Obj.setDate(day5Obj.getDate() - 4);
  let day4Obj = new Date();
  day4Obj.setDate(day4Obj.getDate() - 3);
  let day3Obj = new Date();
  day3Obj.setDate(day3Obj.getDate() - 2);
  let day2Obj = new Date();
  day2Obj.setDate(day2Obj.getDate() - 1);
  const lastDate =
    lastDateObj.getDate() +
    '-' +
    (lastDateObj.getMonth() + 1) +
    '-' +
    lastDateObj.getFullYear();

  let day1Amt = 0;
  let day2Amt = 0;
  let day3Amt = 0;
  let day4Amt = 0;
  let day5Amt = 0;
  let day6Amt = 0;
  let day7Amt = 0;
  let day1AmtI = 0;
  let day2AmtI = 0;
  let day3AmtI = 0;
  let day4AmtI = 0;
  let day5AmtI = 0;
  let day6AmtI = 0;
  let day7AmtI = 0;
  let day1 = lastDateObj.getDate() + '/' + (lastDateObj.getMonth() + 1);
  let day2 = day6Obj.getDate() + '/' + (day6Obj.getMonth() + 1);
  let day3 = day5Obj.getDate() + '/' + (day5Obj.getMonth() + 1);
  let day4 = day4Obj.getDate() + '/' + (day4Obj.getMonth() + 1);
  let day5 = day3Obj.getDate() + '/' + (day3Obj.getMonth() + 1);
  let day6 = day2Obj.getDate() + '/' + (day2Obj.getMonth() + 1);
  let day7 = new Date().getDate() + '/' + (new Date().getMonth() + 1);
  let date1 =
    lastDateObj.getDate() +
    '-' +
    (lastDateObj.getMonth() + 1) +
    '-' +
    lastDateObj.getFullYear();
  let date2 =
    day6Obj.getDate() +
    '-' +
    (day6Obj.getMonth() + 1) +
    '-' +
    day6Obj.getFullYear();
  let date3 =
    day5Obj.getDate() +
    '-' +
    (day5Obj.getMonth() + 1) +
    '-' +
    day5Obj.getFullYear();
  let date4 =
    day4Obj.getDate() +
    '-' +
    (day4Obj.getMonth() + 1) +
    '-' +
    day4Obj.getFullYear();
  let date5 =
    day3Obj.getDate() +
    '-' +
    (day3Obj.getMonth() + 1) +
    '-' +
    day3Obj.getFullYear();
  let date6 =
    day2Obj.getDate() +
    '-' +
    (day2Obj.getMonth() + 1) +
    '-' +
    day2Obj.getFullYear();
  let date7 =
    new Date().getDate() +
    '-' +
    (new Date().getMonth() + 1) +
    '-' +
    new Date().getFullYear();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

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
      expence.forEach(element => {
        element.date == date1
          ? (day1Amt = day1Amt + parseFloat(element.amount))
          : element.date == date2
          ? (day2Amt = day2Amt + parseFloat(element.amount))
          : element.date == date3
          ? (day3Amt = day3Amt + parseFloat(element.amount))
          : element.date == date4
          ? (day4Amt = day4Amt + parseFloat(element.amount))
          : element.date == date5
          ? (day5Amt = day5Amt + parseFloat(element.amount))
          : element.date == date6
          ? (day6Amt = day6Amt + parseFloat(element.amount))
          : element.date == date7
          ? (day7Amt = day7Amt + parseFloat(element.amount))
          : null;
      });
      income.forEach(element => {
        element.date == date1
          ? (day1AmtI = day1AmtI + parseFloat(element.amount))
          : element.date == date2
          ? (day2AmtI = day2AmtI + parseFloat(element.amount))
          : element.date == date3
          ? (day3AmtI = day3AmtI + parseFloat(element.amount))
          : element.date == date4
          ? (day4AmtI = day4AmtI + parseFloat(element.amount))
          : element.date == date5
          ? (day5AmtI = day5AmtI + parseFloat(element.amount))
          : element.date == date6
          ? (day6AmtI = day6AmtI + parseFloat(element.amount))
          : element.date == date7
          ? (day7AmtI = day7AmtI + parseFloat(element.amount))
          : null;
      });

      setUserIncomes({
        labels: [day1, day2, day3, day4, day5, day6, day7],
        datasets: [
          {
            data: [
              day1AmtI,
              day2AmtI,
              day3AmtI,
              day4AmtI,
              day5AmtI,
              day6AmtI,
              day7AmtI,
            ],
          },
        ],
      });
      setUserExpences({
        labels: [day1, day2, day3, day4, day5, day6, day7],
        datasets: [
          {
            data: [
              day1Amt,
              day2Amt,
              day3Amt,
              day4Amt,
              day5Amt,
              day6Amt,
              day7Amt,
            ],
          },
        ],
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',

        backgroundColor: 'white',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: 110, marginLeft: 140, marginTop: 20}}>
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
          }}
          style={{marginLeft: 80, marginTop: 15}}>
          <Icon
            name="rotate"
            size={25}
            color={'black'}
            style={{marginTop: 20, marginLeft: 10, right: 10}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 200,
        }}></View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 30,
        }}>
        {currentType == 'Income' ? (
          Object.keys(userIncome).length > 0 ? (
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 20,
                  alignSelf: 'center',
                  marginRight: 30,
                }}>
                Earn Frequency ({day1} - {day7})
              </Text>
              <LineChart
                data={userIncome}
                width={width + 20} // from react-native
                height={220}
                yAxisLabel="Rs"
                //yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  // backgroundColor: 'white',
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(64, 65, 66, ${opacity})`,
                  color: (opacity = 1) => `rgba(82, 113, 250, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '2',
                    strokeWidth: '1',
                    stroke: 'white',
                  },

                  propsForBackgroundLines: {opacity: 0.3},
                }}
                bezier
                style={{
                  marginVertical: 10,
                  borderRadius: 16,
                  marginHorizontal: 10,
                }}
              />
              <Text style={{alignSelf: 'center', marginRight: 30}}>
                Last seven days earn Frequency
              </Text>
            </View>
          ) : loader ? (
            <ActivityIndicator
              size={'large'}
              color={'#5271fa'}
              style={{marginRight: 30, marginTop: 50}}
            />
          ) : (
            <Text style={{marginRight: 30, marginTop: 100}}>
              No transaction
            </Text>
          )
        ) : Object.keys(userExpences).length > 0 ? (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginBottom: 20,
                alignSelf: 'center',
                marginRight: 30,
              }}>
              Spend Frequency ({day1} - {day7})
            </Text>
            <LineChart
              data={userExpences}
              width={width + 20} // from react-native
              height={220}
              yAxisLabel="Rs"
              //yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                // backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                decimalPlaces: 0, // optional, defaults to 2dp
                // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(64, 65, 66, ${opacity})`,
                color: (opacity = 1) => `rgba(255, 3, 3, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '2',
                  strokeWidth: '1',
                  stroke: 'white',
                },

                propsForBackgroundLines: {opacity: 0.3},
              }}
              bezier
              style={{
                marginVertical: 10,
                borderRadius: 16,
                marginHorizontal: 10,
              }}
            />
            <Text style={{alignSelf: 'center', marginRight: 30}}>
              Last seven days spend Frequency
            </Text>
          </View>
        ) : loader ? (
          <ActivityIndicator
            size={'large'}
            color={'#5271fa'}
            style={{marginRight: 30, marginTop: 50}}
          />
        ) : (
          <Text style={{marginRight: 30, marginTop: 100}}>No transaction</Text>
        )}
      </View>

      <View style={{height: 100}}></View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  typepkr: {
    borderColor: 'black',
    borderWidth: 0,
  },
});
