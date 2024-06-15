import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = ({visitCount}) => {
    return (
        <View style={styles.footer}>
            <Text>Contact Us: 1900. 2900</Text>
            <Text>Email: info@H2Tcomputershop.com</Text>
            <Text>Address: No.1, Dai Co Viet, Hai Ba Trung, Ha Noi</Text>
            <Text>Visit Count: {visitCount}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        backgroundColor: '#91C8E4',
        alignItems: 'center',
    },
});

export default Footer;
