// src/screens/KeyboardPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductGrid from '../product/ProductGrid';

const KeyboardPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keyboard</Text>
      <Text style={styles.description}>
        A keyboard is an input device for a computer, used to enter data and control computer functions. The keyboard includes a series of pressing keys, alphanumeric keys, special characters and function keys to perform tasks.
      </Text>
      <ProductGrid categoryName="keyboard" />
    </View>
  );
};

const styles = StyleSheet.create({
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
