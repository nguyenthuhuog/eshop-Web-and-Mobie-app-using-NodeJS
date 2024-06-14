import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Banner from '../components/Banner';
import SaleNews from '../components/SaleNews';
import ProductGrid from '../components/ProductGrid';
import News from '../components/News';
import ChatComponent from '../components/ChatComponent';

const HomePage = ({ isSidebarActive }) => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Banner />
        <SaleNews />
        <ChatComponent />
        <ProductGrid />
        <News />
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

export default HomePage;
