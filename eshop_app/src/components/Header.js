import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faPhone, faMapMarker, faHeadset, faShoppingCart, faSignIn, faSignOut, faUserPlus, faPerson } from '@fortawesome/free-solid-svg-icons'; 
import logo from '../img/logo1.png';
import Navbar from '../components/Navbar';


const Header = () => {
  const navigation = useNavigation();
    return (
      <View>
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
                <Text style={styles.shopName}>H2T Computer Shop</Text>
            </View>

            {/* <View style={styles.searchBar}>
                <TextInput placeholder="Search for products..." style={styles.searchInput} />
            </View> */}
        </ScrollView>
      </View>
  )};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    color: '#4682A9',
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  authButtons: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F6F4EB',
    borderRadius: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: '#4682A9',
  },
});

export default Header;
