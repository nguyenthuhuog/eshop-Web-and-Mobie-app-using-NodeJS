// src/navigation/AppNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// import LoginModal from './LoginModal';
// import RegisterModal from './RegisterModal';

// import AdminHomepage from './admin/homepage/AdminHomepage';
// import AdminComputerPage from './admin/AdminComputerPage';

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
    // State and effect hooks similar to React
    const [backendData, setBackendData] = useState([{}]);
    const [visitCount, setVisitCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Fetch visit count
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
        // Check login status
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/accounts/login-status', { withCredentials: true });
            setIsLoggedIn(response.data.loggedIn);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    // Modal state management
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    // Sidebar state
    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    // Logout functionality
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/accounts/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            // Additional logic to clear cookies or tokens
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // React Navigation stack setup
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            {/* <Header
                openLoginModal={openLoginModal}
                openRegisterModal={openRegisterModal}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
            />
            <Navbar toggleSidebar={toggleSidebar} />
            <Sidebar /> */}
            <Header                            
            isSidebarActive={isSidebarActive}/>  

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home">
                    {props => (
                        <HomePage
                            {...props}
                            openLoginModal={openLoginModal}
                            openRegisterModal={openRegisterModal}
                            isLoggedIn={isLoggedIn}
                            handleLogout={handleLogout}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="MousePage" component={MousePage} />
                <Stack.Screen name="KeyboardPage" component={KeyboardPage} />
                <Stack.Screen name="ComputerPage" component={ComputerPage} />
                {/* <Stack.Screen name="AdminHomepage" component={AdminHomepage} />
                <Stack.Screen name="AdminComputerPage" component={AdminComputerPage} /> */}
                <Stack.Screen name="ProductGrid" component={ProductGrid} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
            </Stack.Navigator>

            <Footer visitCount={visitCount} />
            {/* Modals */}
            {/* <LoginModal show={isLoginModalOpen} onClose={closeLoginModal} setIsLoggedIn={setIsLoggedIn} />
            <RegisterModal show={isRegisterModalOpen} onClose={closeRegisterModal} /> */}
        </NavigationContainer>
    );
};

export default AppNavigator;
