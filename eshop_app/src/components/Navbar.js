import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeadset, faShoppingCart, faSignOut } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = ({handleLogout, toggleSidebar, onLoginSuccess}) => {
    const navigation = useNavigation();
    const handleLogoutAndNavigate = async () => {
        await handleLogout();
        navigation.navigate('Login');
    };

    return (
        <View>
            <View style={styles.authButtons}>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('Contact')}>
                        <FontAwesomeIcon icon={faHeadset} style={styles.icon} />
                        <Text style={styles.buttonText}>Contact us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('Cart')}>
                        <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} />
                        <Text style={styles.buttonText}>Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactButton} onPress={handleLogoutAndNavigate}>
                            <FontAwesomeIcon icon={faSignOut} style={styles.icon} />
                            <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.navbar}>
                <TouchableOpacity onPress={toggleSidebar}>
                    <Text style={styles.hamburger}>☰</Text>
                </TouchableOpacity>
                <View style={styles.menu}>
                    <Text style={styles.logo}>Categories</Text>
                    <Text style={styles.marquee}>Sale news: Up to 50% off on selected items! ---- </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#91C8E4',
        padding: 10,
    },
    hamburger: {
        fontSize: 28,
        marginRight: 10,
    },
    menu: {
        flex: 1,
        justifyContent: 'space-between',
    },
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    marquee: {
        fontSize: 14,
        color: '#000',
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

export default Navbar;
