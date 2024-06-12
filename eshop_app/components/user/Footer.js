import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../css/homepage';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.contactInfo}>
        <Text style={styles.text}>Contact Us: 1900. 2900</Text>
        <Text style={styles.text}>Email: info@H2Tcomputershop.com</Text>
        <Text style={styles.text}>Address: No.1, Dai Co Viet, Hai Ba Trung, Ha Noi</Text>
      </View>
    </View>
  );
};

export default Footer;
