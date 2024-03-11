import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LineChart, PieChart} from 'react-native-chart-kit';
import Logo from '../components/logo/logo';
const Home = ({navigation}) => {
  const [userIncome, setUserIncomes] = useState([]);
  const [userExpences, setUserExpences] = useState([]);
  const [categoryExpences, setCategoryExpences] = useState([]);
  let Food = 0;
  let Movie = 0;
  let Fuel = 0;
  let Shopping = 0;
  let Travel = 0;
  let Education = 0;
  let Sport = 0;
  let Tickets = 0;
  let General = 0;
  let Rent = 0;
  let other = 0;

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    GoogleSignin.configure();
  });

  const getData = async () => {
    const loginData = JSON.parse(await AsyncStorage.getItem('Login'));
    const userData = await firestore()
      .collection('user')
      .doc(loginData.user.email)
      .get();

    if (userData._data != undefined) {
      let income = [];
      let expence = [];
      userData._data.value.forEach(element => {
        element.Type == 'Income'
          ? (income = [...income, element])
          : (expence = [...expence, element]);
      });
      let totalIncome = 0;
      let totalExpence = 0;

      income.forEach(income => {
        totalIncome = totalIncome + parseFloat(income.amount);
      });
      expence.forEach(expence => {
        totalExpence = totalExpence + parseFloat(expence.amount);
        expence.category == 'Movie'
          ? (Movie = Movie + parseFloat(expence.amount))
          : expence.category == 'Fuel'
          ? (Fuel = Fuel + parseFloat(expence.amount))
          : expence.category == 'Shopping'
          ? (Shopping = Shopping + parseFloat(expence.amount))
          : expence.category == 'Travel'
          ? (Travel = Travel + parseFloat(expence.amount))
          : expence.category == 'Education'
          ? (Education = Education + parseFloat(expence.amount))
          : expence.category == 'Sport'
          ? (Sport = Sport + parseFloat(expence.amount))
          : expence.category == 'Tickets'
          ? (Tickets = Tickets + parseFloat(expence.amount))
          : expence.category == 'Food'
          ? (Food = Food + parseFloat(expence.amount))
          : expence.category == 'General'
          ? (General = General + parseFloat(expence.amount))
          : expence.category == 'Rent'
          ? (Rent = Rent + parseFloat(expence.amount))
          : expence.category == 'Other'
          ? (other = other + parseFloat(expence.amount))
          : null;
      });
      setUserIncomes(totalIncome);
      setUserExpences(totalExpence);

      const data = [
        {
          name: 'Movie',
          amount: Movie,
          color: '#BCD2E8',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Food',
          amount: Food,
          color: '#0000FF',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Fuel',
          amount: Fuel,
          color: '#fa736e',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'General',
          amount: General,
          color: '#d18efa',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Travel',
          amount: Travel,
          color: '#fa978e',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Education',
          amount: Education,
          color: '#00A36C',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Sport',
          amount: Sport,
          color: '#faf88e',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Tickets',
          amount: Tickets,
          color: '#f70751',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Rent',
          amount: Rent,
          color: '#d4ed9a',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Shoping',
          amount: Shopping,
          color: '#8f3f85',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Other',
          amount: other,
          color: '#7a8efa',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
      setCategoryExpences(data);
    } else {
      const data = [
        {
          name: 'Movie',
          amount: Movie,
          color: 'rgba(131, 167, 234, 1)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Food',
          amount: Food,
          color: '#F00',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Fuel',
          amount: Fuel,
          color: 'green',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'General',
          amount: General,
          color: 'yellow',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Travel',
          amount: Travel,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Education',
          amount: Education,
          color: '#ff7403',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Sport',
          amount: Sport,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Tickets',
          amount: Tickets,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Rent',
          amount: Rent,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Shoping',
          amount: Shopping,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Other',
          amount: other,
          color: 'rgb(0, 0, 255)',
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
      setCategoryExpences(data);
    }
  };

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={styles.userAvatar}>
            <Icon name="user" color="gray" size={30} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtdashBoard}>Dashboard</Text>
        <View style={{marginRight: 5}}>
          <Logo color={'#5271fa'} marginVertical={15} size={10} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Transaction', {mode: 'ALL'});
        }}>
        <View style={styles.balanceContainer}>
          <Text style={styles.txtBalance}>Total Balance</Text>
          <Text style={styles.balance}>Rs {userIncome - userExpences}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Transaction', {mode: 'Income'});
          }}>
          <View style={[styles.income, {backgroundColor: '#00a86b'}]}>
            <Icon
              name="arrow-circle-o-down"
              color="white"
              size={40}
              marginHorizontal={10}
            />
            <View style={styles.IncomeContainer}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                Income
              </Text>
              <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                Rs {userIncome}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Transaction', {mode: 'Expence'});
          }}>
          <View style={[styles.income, {backgroundColor: '#fd3c4a'}]}>
            <Icon
              name="arrow-circle-o-up"
              color="white"
              size={40}
              marginHorizontal={10}
            />
            <View style={styles.IncomeContainer}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
                Expences
              </Text>
              <Text style={{color: 'white', fontSize: 17, fontWeight: '600'}}>
                Rs {userExpences}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Text
        style={{color: 'black', fontSize: 17, fontWeight: '600', margin: 20}}>
        Category:
      </Text>
      <View style={{marginTop: 20}}>
        <PieChart
          data={categoryExpences}
          width={Dimensions.get('screen').width}
          height={250}
          chartConfig={chartConfig}
          accessor={'amount'}
          backgroundColor={'white'}
          paddingLeft={'15'}
          center={[0, 0]}
        />
        <View
          style={{
            backgroundColor: 'white',
            height: 150,
            width: 150,
            borderRadius: 100,
            position: 'absolute',
            marginTop: 50,
            marginLeft: 38,
            opacity: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              getData();
            }}>
            <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>
              Expences
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Transaction', {mode: 'ALL'});
        }}>
        <Text style={styles.sTransaction}>Show all transactions</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  userAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#5271fa',
    borderWidth: 1,
    marginLeft: 5,
    marginTop: 20,
  },
  balanceContainer: {
    height: 120,
    width: 260,
    backgroundColor: '#5271fa',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBalance: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    opacity: 0.8,
  },
  balance: {
    fontSize: 25,
    color: 'white',
    fontWeight: '700',
    opacity: 0.9,
  },
  subContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  income: {
    height: 85,
    width: 150,
    marginTop: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
  },
  IncomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtdashBoard: {
    fontSize: 20,
    marginTop: 20,
    color: 'black',
    fontWeight: '500',
  },
  sTransaction: {
    textAlign: 'center',
    color: 'black',
    margin: 20,
  },
});
