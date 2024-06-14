import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const News = () => {
    return (
        <View style={styles.item} id="news">
            <Text style={styles.heading}>Dont Forget!!!</Text>
            <View style={styles.list}>
                <Text><Text style={styles.icon}>📧</Text> Sign up for our newsletter and get 10% off your first order!</Text>
                <Text><Text style={styles.icon}>📝</Text> Check out our new blog post on the latest tech trends!</Text>
                <Text><Text style={styles.icon}>🔗</Text> Follow us on social media for exclusive deals and updates!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 2,
        elevation: 2,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    list: {
        marginLeft: 20,
    },
    icon: {
        fontSize: 18,
        marginRight: 10,
    },
});

export default News;
