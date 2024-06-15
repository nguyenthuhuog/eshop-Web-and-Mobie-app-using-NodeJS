import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Navbar = ({ toggleSidebar }) => {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity onPress={toggleSidebar}>
                <Text style={styles.hamburger}>☰</Text>
            </TouchableOpacity>
            <View style={styles.menu}>
                <Text style={styles.logo}>Categories</Text>
                <Text style={styles.marquee}>Sale news: Up to 50% off on selected items! ---- </Text>
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
});

export default Navbar;
