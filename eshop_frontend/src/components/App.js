import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

import ProductDetail from './product/ProductDetail';
import ProductGrid from './product/ProductGrid'; 
import {ShopContextProvider} from './product/ShopContextProvider';
// import Shop from './Shop';
import Cart from './user/cart/Cart'; 
import Checkout from './user/cart/Checkout';


import '../css/homepage.css';
import '../css/App.css';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ). then(
      data => {
        setBackendData(data)
      }
    )
}, [])

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

  return (
    <ShopContextProvider>
      <Router>
        <div className="App">
          <Header openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
          <div className={`wrapper ${isSidebarActive ? 'active' : ''}`}>
            <Navbar toggleSidebar={toggleSidebar}/>
            <div className="main_container">
              <Sidebar />
              <div className="content">
                <Routes>
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/mouse" element={<MousePage />} />
                  <Route path="/computer" element={<ComputerPage />} />
                  <Route path="/keyboard" element={<KeyboardPage />} />
                  <Route path="/homepage" element={<HomePage isSidebarActive={isSidebarActive}/>} />
                  <Route path="/products" element={<ProductGrid />} /> 
                  <Route path="/cart" element={<Cart />} />  
                  <Route path="/checkout" element={<Checkout/>} />                           
                  <Route path="/product/:id" element={<ProductDetail />} /> 
                </Routes>
              </div>
              <div> 
                {(typeof backendData.users === 'undefined') ? (
                  <p>Loading...</p>
                ) :(
                  backendData.users.map((user, i) => (
                    <p key={i}>{user}</p>
                  ))
                )}
              </div>
              <Footer />
            </div>
          </div>
          <LoginModal show={isLoginModalOpen} onClose={closeLoginModal} />
          <RegisterModal show={isRegisterModalOpen} onClose={closeRegisterModal} />
        </div>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
