import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React from 'react';

const TermsAndCondition = () => {
  const {height, width} = Dimensions.get('screen');
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.txtTC}>Terms & Conditions</Text>
      <View
        style={[styles.container, {width: width - 30, height: height - 80}]}>
        <ScrollView>
          <Text style={styles.txtHeading}>1. App Usage</Text>
          <Text style={styles.txtContent}>
            1.1 The App is designed for personal financial management purposes
            only. You agree to use the App solely for tracking and managing your
            expenses and related financial activities.
          </Text>
          <Text style={styles.txtContent}>
            1.2 You are responsible for maintaining the confidentiality of your
            account credentials and ensuring the security of your account. Any
            activities occurring under your account are your responsibility.
          </Text>
          <Text style={styles.txtHeading}>2. User Accounts</Text>
          <Text style={styles.txtContent}>
            2.1 To use certain features of the App, you may be required to
            create an account. You must provide accurate, up-to-date, and
            complete information during the registration process.
          </Text>
          <Text style={styles.txtContent}>
            2.2 You are solely responsible for the content you upload or input
            into the App, including expense data, notes, and any other
            information. The Company shall not be liable for any loss or damage
            resulting from inaccurate or incomplete information.
          </Text>
          <Text style={styles.txtHeading}>3. Data Privacy</Text>
          <Text style={styles.txtContent}>
            3.1 We are committed to safeguarding your personal information. Your
            use of the App is governed by our Privacy Policy
          </Text>
          <Text style={styles.txtContent}>
            3.2 By using the App, you consent to the collection, processing, and
            storage of your personal information as outlined in our Privacy
            Policy.
          </Text>
          <Text style={styles.txtHeading}>4. Prohibited Activities</Text>

          <Text style={styles.txtContent}>
            4.1 You agree not to engage in any activities that could harm,
            disrupt, or interfere with the functioning of the App or its
            associated services.
          </Text>
          <Text style={styles.txtContent}>
            4.2 You shall not use the App for any illegal, unauthorized, or
            unethical purposes.
          </Text>
          <Text style={styles.txtContent}>
            4.3 You shall not attempt to gain unauthorized access to the App,
            its servers, or any associated systems.
          </Text>
          <Text style={styles.txtHeading}>5. Intellectual Property</Text>

          <Text style={styles.txtContent}>
            5.1 The App, its design, features, and content are protected by
            intellectual property rights owned or licensed by the Company. You
            agree not to copy, modify, distribute, or reproduce any part of the
            App without our prior written consent.
          </Text>
          <Text style={styles.txtHeading}>6. Updates and Changes</Text>
          <Text style={styles.txtContent}>
            6.1 We may update or modify the App from time to time, including
            adding or removing features, without prior notice.
          </Text>
          <Text style={styles.txtHeading}>7. Disclaimer of Warranty</Text>
          <Text style={styles.txtContent}>
            7.1 The App is provided on an "as-is" and "as available" basis. We
            do not guarantee that the App will be error-free, uninterrupted, or
            free from viruses or other harmful components.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsAndCondition;

const styles = StyleSheet.create({
  txtTC: {fontSize: 17, color: 'black', fontWeight: 'bold'},
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {
    borderWidth: 1,
    borderRadius: 10,
  },
  txtHeading: {color: 'black', fontSize: 16, margin: 10, fontWeight: 'bold'},
  txtContent: {color: 'black', marginLeft: 10, margin: 5},
});
