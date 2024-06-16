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
import { useNavigate } from 'react-router-dom';
import AdModal from './AdModal';

import '../css/homepage.css';
import '../css/App.css';

function App() {
    const [backendData, setBackendData] = useState([{}]);
    const [visitCount, setVisitCount] = useState(0);
    const [isAdModalOpen, setIsAdModalOpen] = useState(false);
    const [responseText, setresponseText] = useState('Please login to continue');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch and increment visit count for any page visit
        fetch("http://localhost:8080/api/visit-count", { method: 'POST' }).then(
            response => response.json()
        ).then(
            data => {
                setVisitCount(data.visitCount);
            }
        );
    }, [location.pathname]);

    useEffect(() => {
        console.log("Current cookies: ", Cookies.get());
        const adModalShown = Cookies.get('adModalShown');
        if (!adModalShown) {
            // Nếu chưa hiển thị, đặt timeout 1 phút để hiển thị quảng cáo
            const timer = setTimeout(() => {
                setIsAdModalOpen(true);
                
                const expireTime = new Date(new Date().getTime() + 5 * 60 * 1000); // 5'
                Cookies.set('adModalShown', 'true', { expires: expireTime }); 
            }, 10 * 1000); //10s

            return () => clearTimeout(timer);
        }
    }, [location]);

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);

    const [isSidebarActive, setIsSidebarActive] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarActive(!isSidebarActive);
    };
    const handleCloseModal = () => {
        setIsAdModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/accounts/logout', {}, { withCredentials: true });
            Cookies.remove('userID'); // Remove the userID cookie
            Cookies.remove('isAdmin');
            Cookies.remove('adModalShown');
            setresponseText('Please login to continue');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <ShopContextProvider>
            <div className="App">
                <AdModal isOpen={isAdModalOpen} onClose={handleCloseModal} />
                <Header
                    openLoginModal={openLoginModal}
                    openRegisterModal={openRegisterModal}
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
                                <Route path="/admin/homepage" element={<AdminHomepage />} />
                                {Cookies.get('isAdmin') && 
                                <Route path="/admincomputer" element={<AdminComputerPage />} />
                                }
                                <Route path="/products" element={<ProductGrid />} />
                                <Route path="/cart" element={<Cart setIsLoginModalOpen={setIsLoginModalOpen}/>} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/product/:id" element={<ProductDetail setIsLoginModalOpen={setIsLoginModalOpen}/>} />
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
                <LoginModal show={isLoginModalOpen} onClose={closeLoginModal} responseText={responseText} setresponseText={setresponseText}/>
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
