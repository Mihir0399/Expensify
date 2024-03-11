import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const ContectUs = () => {
  const {height, width} = Dimensions.get('screen');
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.txtCS}> Contect Us</Text>
      <View
        style={[styles.container, {width: width - 30, height: height - 100}]}>
        <Text style={styles.txtCS}>Customer Support</Text>
        <Text style={styles.txtContent}>
          For any technical issues, inquiries, or assistance with using the
          App,please contact our customer support team:
        </Text>
        <Text style={[styles.txtContent, {fontSize: 18}]}>
          Email: expensify000@gmail.com
        </Text>
        <Text style={styles.txtContent}>
          Our dedicated customer support representatives are available 24X7 to
          provide prompt and helpful assistance
        </Text>
        <Text style={styles.txtCS}>Feedback and Suggestions</Text>
        <Text style={styles.txtContent}>
          We greatly appreciate your feedback and suggestions for improving the
          App. If you have ideas for new features, enhancements, or any general
          comments, please share them with us:
        </Text>
        <Text style={[styles.txtContent, {fontSize: 18}]}>
          {' '}
          Email: expensify000@gmail.com
        </Text>
      </View>
    </View>
  );
};

export default ContectUs;

const styles = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center'},
  txtCS: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    margin: 10,
    fontWeight: 'bold',
  },
  container: {
    borderWidth: 1,
    borderRadius: 10,
  },
  txtContent: {color: 'black', fontSize: 17, marginLeft: 10, margin: 5},
});
