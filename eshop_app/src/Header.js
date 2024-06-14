// components/Header.js
import React, { useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ShopContext } from './context/ShopContext';
import { useNavigation } from '@react-navigation/native';

const Header = ({ openLoginModal, openRegisterModal }) => {
  const { getTotalCartCount } = useContext(ShopContext);
  const totalCartCount = getTotalCartCount();
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <Text style={styles.shopName}>H2T Computer Shop</Text>
      <View style={styles.searchBar}>
        <TextInput placeholder="Search for products..." style={styles.searchInput} />
      </View>
      <View style={styles.authButtons}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.buttonText}>Tech News</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.buttonText}>
            Cart {totalCartCount > 0 && `(${totalCartCount})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openLoginModal}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openRegisterModal}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F6F4EB',
  },
  logo: {
    width: 50,
    height: 50,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#91C8E4',
    borderRadius: 20,
    padding: 5,
  },
  searchInput: {
    height: 40,
    paddingLeft: 10,
  },
  authButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginHorizontal: 5,
    color: '#4682A9',
  },
});

export default Header;
