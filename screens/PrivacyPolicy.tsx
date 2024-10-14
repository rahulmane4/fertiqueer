import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our app, FertiQueer App, and other sites we own and operate.
      </Text>
      
      <Text style={styles.subtitle}>1. Information We Collect</Text>
      <Text style={styles.text}>
        We may collect personal information from you when you use our app. This may include, but is not limited to, your name, email address, and any other information you choose to provide.
      </Text>

      <Text style={styles.subtitle}>2. How We Use Your Information</Text>
      <Text style={styles.text}>
        We use the information we collect to provide and improve our services, communicate with you, and manage your account.
      </Text>

      <Text style={styles.subtitle}>3. Sharing Your Information</Text>
      <Text style={styles.text}>
        We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law.
      </Text>

      <Text style={styles.subtitle}>4. Security of Your Information</Text>
      <Text style={styles.text}>
        We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure.
      </Text>

      <Text style={styles.subtitle}>5. Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Text>

      <Text style={styles.subtitle}>6. Contact Us</Text>
      <Text style={styles.text}>
        If you have any questions about this Privacy Policy, please contact us at support@example.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,paddingBottom:30,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
  },
});

export default PrivacyPolicy;
