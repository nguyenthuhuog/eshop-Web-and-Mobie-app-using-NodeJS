// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

import Contact from './user/page/Contact';
import MousePage from './user/page/MousePage';
import KeyboardPage from './user/page/KeyboardPage';
import ComputerPage from './user/page/ComputerPage';
import HomePage from './user/homepage/HomePage';

import AdminHomepage from './admin/homepage/AdminHomepage';
import AdminComputerPage from './admin/AdminComputerPage';

import ProductDetail from './product/ProductDetail';
import ProductGrid from './product/ProductGrid';
import { ShopContextProvider } from './product/ShopContextProvider';
import Cart from './user/cart/Cart';
import Checkout from './user/cart/Checkout';

import '../css/homepage.css';
import '../css/App.css';

function App() {
    const [backendData, setBackendData] = useState([{}]);
    const [visitCount, setVisitCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Fetch and increment visit count for any page visit
        fetch("/api/visit-count", { method: 'POST' }).then(
            response => response.json()
        ).then(
            data => {
                setVisitCount(data.visitCount);
            }
        );
    }, [location.pathname]);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/accounts/login-status', { withCredentials: true });
                setIsLoggedIn(response.data.loggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    const [isSidebarActive, setIsSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/accounts/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            Cookies.remove('userID'); // Remove the userID cookie
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ShopContextProvider>
            <div className="App">
                <Header
                    openLoginModal={openLoginModal}
                    openRegisterModal={openRegisterModal}
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                />
                <div className={`wrapper ${isSidebarActive ? 'active' : ''}`}>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <div className="main_container">
                        <Sidebar />
                        <div className="content">
                            <Routes>
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/mouse" element={<MousePage />} />
                                <Route path="/computer" element={<ComputerPage />} />
                                <Route path="/keyboard" element={<KeyboardPage />} />
                                <Route path="/homepage" element={<HomePage isSidebarActive={isSidebarActive} />} />
                                <Route path="/admin/homepage" element={<AdminHomepage />} />
                                <Route path="/admincomputer" element={<AdminComputerPage />} />
                                <Route path="/products" element={<ProductGrid />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/" element={<HomePage isSidebarActive={isSidebarActive} />} />
                            </Routes>
                        </div>
                        <div>
                            {(typeof backendData.users === 'undefined') ? (
                                <p>Loading...</p>
                            ) : (
                                backendData.users.map((user, i) => (
                                    <p key={i}>{user}</p>
                                ))
                            )}
                        </div>
                        <Footer visitCount={visitCount} />
                    </div>
                </div>
                <LoginModal show={isLoginModalOpen} onClose={closeLoginModal} setIsLoggedIn={setIsLoggedIn} />
                <RegisterModal show={isRegisterModalOpen} onClose={closeRegisterModal} />
            </div>
        </ShopContextProvider>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
