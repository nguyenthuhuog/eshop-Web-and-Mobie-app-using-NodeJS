import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import qrcode from '../img/qrcode.png';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import Navbar from '../components/Navbar';

const Checkout = ({toggleSidebar}) => {
  return (
    <ScrollView style={styles.mainContainer}>
    
    <Navbar toggleSidebar={toggleSidebar} />    
    <View style ={style.container}>
      <Navbar toggleSidebar={toggleSidebar} />
      <Image src={qrcode} alt="Qr code" />
        <Text style={styles.description}> Transfer money to this bank account!!!
        </Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
});

export default Checkout;