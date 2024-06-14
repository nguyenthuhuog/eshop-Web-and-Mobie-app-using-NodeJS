import React, { useState, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { Icon } from 'react-native-elements';
import logo from '../img/logo1.png';

const Header = ({ openLoginModal, openRegisterModal, isLoggedIn, handleLogout }) => {
    // const { getTotalCartCount } = useContext(ShopContext);
    // const totalCartCount = getTotalCartCount();
    const navigation = useNavigation();
    // Sidebar state
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    return (
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
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.buttonText}>1900.1900</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.buttonText}>Our location</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                    <Text style={styles.buttonText}>Contact us</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.buttonText}>Tech news</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    {/* <Text style={styles.buttonText}>
                        Cart {totalCartCount > 0 && `(${totalCartCount})`}
                    </Text> */}
                </TouchableOpacity>

                {isLoggedIn ? (
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity onPress={openLoginModal}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openRegisterModal}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </>
                )}

<Navbar toggleSidebar={toggleSidebar} />
<Sidebar />    
            </View>
   
          </ScrollView>
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
    },
    searchInput: {
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
