import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MarqueeText from 'react-native-marquee';
import Sidebar from './Sidebar';
import styles from '../../css/homepage';

const Navbar = ({ toggleSidebar }) => {
  return (
    <View style={styles.topNavbar}>
      <TouchableOpacity style={styles.hamburger} onPress={toggleSidebar}>
        <Text style={styles.hamburgerInner}>☰</Text>
      </TouchableOpacity>
      <View style={styles.menu}>
        <Text style={styles.logo}>Categories</Text>
        <MarqueeText
          style={styles.marquee}
          speed={1}
          marqueeOnStart
          loop
          delay={1000}
        >
          Sale news: Up to 50% off on selected items! ----
        </MarqueeText>
      </View>
      {/* Assuming Sidebar is a React Native component */}
      <Sidebar />
      <View style={styles.mainContainer} />
    </View>
  );
};


export default Navbar;
