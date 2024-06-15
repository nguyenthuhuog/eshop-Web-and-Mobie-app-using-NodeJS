// src/screens/MousePage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductGrid from '../product/ProductGrid';

const MousePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mouse</Text>
      <Text style={styles.description}>
        Computer mouse is a peripheral device used to control a cursor on a computer screen and perform operations on a graphical interface. Regular mice are compactly designed, have two, three or more buttons with a scroll wheel placed between the two buttons.
      </Text>
      <ProductGrid categoryName="mouse" />
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

export default MousePage;
