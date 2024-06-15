import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import Footer from '../components/Footer';
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

import axios from 'axios';

const AppNavigator = () => {

    // const [backendData, setBackendData] = useState([{}]);
    const [visitCount, setVisitCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarActive, setIsSidebarActive] = useState(false);


    useEffect(() => {
        fetchVisitCount();
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

    const fetchVisitCount = async () => {
        try {
            const response = await fetch("http://10.136.8.29:8080/api/visit-count", { method: 'POST' });
            const data = await response.json();
            setVisitCount(data.visitCount);
        } catch (error) {
            console.error('Error fetching visit count:', error);
        }
    };

    // useEffect(() => {
    //     checkLoginStatus();
    // }, []);


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

    // const onLoginSuccess = async () => {
    //     try {
    //         await axios.post('http://10.136.8.29:8080/api/accounts/logout', {}, { withCredentials: true });
    //         setIsLoggedIn(true);
    //         // Cookies.remove('userID');
    //     } catch (error) {
    //         console.error('Logout error:', error);
    //     }
    // };

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Header/>  

                <View style={styles.main}>
                    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Login">
                            {props => (
                                <LoginScreen
                                    {...props}
                                    onLoginSuccess={() => setIsLoggedIn(true)}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="HomePage">
                            {props => (
                                <HomePage
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Contact">
                            {props => (
                                <Contact
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="MousePage">
                            {props => (
                                <MousePage
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="KeyboardPage">
                            {props => (
                                <KeyboardPage
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="ComputerPage">
                            {props => (
                                <ComputerPage
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="ProductGrid" component={ProductGrid} />
                        <Stack.Screen name="Cart">
                            {props => (
                                <Cart
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Checkout">
                            {props => (
                                <Checkout
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="ProfilePage">
                            {props => (
                                <ProfilePage
                                    {...props}
                                    toggleSidebar={toggleSidebar}
                                    isSidebarActive={isSidebarActive}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Register">
                            {props => (
                                <RegisterScreen
                                    {...props}
                                    isLoggedIn={isLoggedIn}
                                    handleLogout={handleLogout}
                                />
                            )}
                        </Stack.Screen>
                    </Stack.Navigator>
                    {isSidebarActive && <Sidebar />}
                </View>
                <Footer visitCount={visitCount} />
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        flexDirection: 'row',
    },
});

export default AppNavigator;
