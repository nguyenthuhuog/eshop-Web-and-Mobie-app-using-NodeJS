import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import LoginScreen from '../log/LoginScreen';
import RegisterScreen from '../log/RegisterScreen';
import ProfilePage from '../log/ProfilePage';

import HomePage from '../screens/HomePage';
import Contact from '../screens/Contact';
import ComputerPage from '../screens/ComputerPage';
import KeyboardPage from '../screens/KeyboardPage';
import MousePage from '../screens/MousePage';

import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import ProductDetail from '../product/ProductDetail';
import ProductGrid from '../product/ProductGrid';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';

const AppNavigator = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [visitCount, setVisitCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetchVisitCount();
    }, []);

    const fetchVisitCount = async () => {
        try {
            const response = await fetch("/api/visit-count", { method: 'POST' });
            const data = await response.json();
            setVisitCount(data.visitCount);
        } catch (error) {
            console.error('Error fetching visit count:', error);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://10.136.8.29:8080/api/accounts/login-status', { withCredentials: true });
            setIsLoggedIn(response.data.loggedIn);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://10.136.8.29:8080/api/accounts/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            // Cookies.remove('userID');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <View style={styles.container}>
                    <Header 
                        toggleSidebar={toggleSidebar} 
                        isSidebarActive={isSidebarActive}
                        isLoggedIn={isLoggedIn} 
                        handleLogout={handleLogout}
                    />  
                    {isSidebarActive && <Sidebar />}
                    <Stack.Navigator initialRouteName="HomePage">
                        <Stack.Screen name="HomePage" component={HomePage} />
                        <Stack.Screen name="Contact" component={Contact} />
                        <Stack.Screen name="MousePage" component={MousePage} />
                        <Stack.Screen name="KeyboardPage" component={KeyboardPage} />
                        <Stack.Screen name="ComputerPage" component={ComputerPage} />
                        <Stack.Screen name="ProductGrid" component={ProductGrid} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="Checkout" component={Checkout} />
                        <Stack.Screen name="ProfilePage" component={ProfilePage} />
                    </Stack.Navigator>
                    <Footer visitCount={visitCount} />
                </View>
            ) : (
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login">
                        {props => (
                            <LoginScreen
                                {...props}
                                onLoginSuccess={() => setIsLoggedIn(true)}
                            />
                        )}
                    </Stack.Screen>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppNavigator;
