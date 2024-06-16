// src/screens/ComputerPage.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductGrid from '../product/ProductGrid';
import Navbar from '../components/Navbar';

const ComputerPage = ({toggleSidebar, handleLogout}) => {
  return (
    <ScrollView style={styles.mainContainer}>
         <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <View style={styles.container}>
        <Text style={styles.title}>Laptop</Text>
        <Text style={styles.description}>
          A laptop is a compact and portable computer device. It is designed for use in work, entertainment or study activities on the go without having to use a bulky desktop computer.
        </Text>
        <ProductGrid categoryName="laptop" />
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

export default ComputerPage;
