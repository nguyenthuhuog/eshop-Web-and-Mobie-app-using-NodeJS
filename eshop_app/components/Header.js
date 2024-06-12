import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from '../img/logo1.png';
import styles from '../css/homepage';

const Header = ({ openLoginModal, openRegisterModal }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.logo} onPress={() => navigation.navigate('HomePage')}>
        <Image source={logo} style={styles.logoImage} />
      </TouchableOpacity>

      <Text style={styles.shopName}>H2T Computer Shop</Text>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search for products..." />
        <Icon name="search" size={20} color="#000" />
      </View>

      <View style={styles.authButtons}>
        <View style={styles.contactInfo}>
          <TouchableOpacity style={styles.button} onPress={() => { /* handle phone call */ }}>
            <Icon name="phone" size={20} color="#000" />
            <Text style={styles.buttonText}>1900.1900</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { /* handle location navigation */ }}>
            <Icon name="map-marker" size={20} color="#000" />
            <Text style={styles.buttonText}>Our location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Contact')}>
            <Icon name="headset" size={20} color="#000" />
            <Text style={styles.buttonText}>Contact us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => { /* handle tech news navigation */ }}>
            <Icon name="newspaper-o" size={20} color="#000" />
            <Text style={styles.buttonText}>Tech news</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
            <Icon name="shopping-cart" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={openLoginModal}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={openRegisterModal}>
            <Text style={styles.registerButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;
