// src/screens/KeyboardPage.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductGrid from '../product/ProductGrid';
import Navbar from '../components/Navbar';

const KeyboardPage = ({toggleSidebar, handleLogout}) => {
  return (
    <ScrollView style={styles.mainContainer}>
    <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
       <View style={styles.container}>
      <Text style={styles.title}>Keyboard</Text>
      <Text style={styles.description}>
        A keyboard is an input device for a computer, used to enter data and control computer functions. The keyboard includes a series of pressing keys, alphanumeric keys, special characters and function keys to perform tasks.
      </Text>
      <ProductGrid categoryName="keyboard" />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default KeyboardPage;
