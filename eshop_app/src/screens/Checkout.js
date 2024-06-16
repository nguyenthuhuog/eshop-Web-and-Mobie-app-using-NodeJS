import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import qrcode from '../img/qrcode.png'; // Assuming you have this image in your project

const Checkout = () => {
  return (
    <View style={styles.container}>
      <Image source={qrcode} style={styles.qrCode} />
      <Text style={styles.description}>Transfer money to this bank account!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center', // Center the content horizontally
  },
  qrCode: {
    width: 200, // Set the width for the QR code image
    height: 200, // Set the height for the QR code image
    marginBottom: 20, // Add some space below the image
  },
  description: {
    fontSize: 18, // Set the font size for the description text
    textAlign: 'center', // Center the text
  },
});

export default Checkout;
