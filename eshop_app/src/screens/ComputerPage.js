// src/screens/ComputerPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductGrid from '../product/ProductGrid';

const ComputerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Laptop</Text>
      <Text style={styles.description}>
        A laptop is a compact and portable computer device. It is designed for use in work, entertainment or study activities on the go without having to use a bulky desktop computer.
      </Text>
      <ProductGrid categoryName="laptop" />
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

export default ComputerPage;
