import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Banner from '../components/Banner';
import ProductGrid from '../product/ProductGrid';
import News from '../components/News';


const HomePage = () => {
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Banner />
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
