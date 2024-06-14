import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import qrcode from '../img/qrcode.png';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const Checkout = () => {
  return (
    <View style ={style.container}>
      <Image src={qrcode} alt="Qr code" />
        <Text style={styles.description}> Transfer money to this bank account!!!
        </Text>
    </View>
  );
};

export default Checkout;