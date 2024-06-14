import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone, faMapMarker, faHeadset, faNewspaper, faShoppingCart, faSignIn, faSignOut, faUserPlus, faPerson } from '@fortawesome/free-solid-svg-icons'; 
import logo from '../img/logo1.png';
import Navbar from '../components/Navbar';


const Header = ({isLoggedIn, handleLogout, toggleSidebar }) => {
  const navigation = useNavigation();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

    return (
      <View>
        <ScrollView>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>
                <Text style={styles.shopName}>H2T Computer Shop</Text>
            </View>

            <View style={styles.searchBar}>
                <TextInput placeholder="Search for products..." style={styles.searchInput} />
            </View>

            <View style={styles.authButtons}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.contactButton} onPress={() => {}}>
                        <FontAwesomeIcon icon={faPhone} style={styles.icon} />
                        <Text style={styles.buttonText}>1900.1900</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactButton} onPress={toggleDropdown}>
                        <FontAwesomeIcon icon={faMapMarker} style={styles.icon} />
                        <Text style={styles.buttonText}>Our location</Text>
                    </TouchableOpacity>
                    {isDropdownVisible && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
                          <Text style={styles.buttonText}>Location 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => {}}>
                          <Text style={styles.buttonText}>Location 2</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('Contact')}>
                        <FontAwesomeIcon icon={faHeadset} style={styles.icon} />
                        <Text style={styles.buttonText}>Contact us</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('Cart')}>
                        <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} />
                        <Text style={styles.buttonText}>Cart</Text>
                    </TouchableOpacity>
                    {isLoggedIn ? (
                        <TouchableOpacity style={styles.contactButton} onPress={handleLogout}>
                            <FontAwesomeIcon icon={faSignOut} style={styles.icon} />
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ProfilePage')}>
                                <FontAwesomeIcon icon={faPerson} style={styles.icon} />
                                <Text style={styles.buttonText}>H2T</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
          </ScrollView>
          <Navbar toggleSidebar={toggleSidebar} />
        </View>
    );
};

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
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 10,
    backgroundColor: '#F6F4EB',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
  },
});

export default Header;
