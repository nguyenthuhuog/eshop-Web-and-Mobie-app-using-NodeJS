import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo1.png';
import '../css/homepage.css';


const Header = ({ openLoginModal, openRegisterModal }) => {
    return (
        <div id="header">
            <div className="logo">
                <Link to="/homepage"> <img src={logo} alt="Logo" /></Link>
            </div>

            <div className="shop-name">H2T Computer Shop</div>

            <div className="search-bar">
                <input type="text" placeholder="Search for products..." />
                <i className="fas fa-search"></i>
            </div>

            <div className="auth-buttons">
                <div className="contact-info">

                    <button onClick={() => window.location.href = 'tel:19001900'}>
                        <i className="fas fa-phone-alt"></i>
                        <span>1900.1900</span>
                    </button>

                    <div className="dropdown">
                        <button className="btn-location" onClick={() => window.location.href = '#location'}>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Our location</span>
                        </button>
                        <div className="dropdown-content">
                            <p><i className="fas fa-thumbtack"></i> No.1, Dai Co Viet, Hai Ba Trung, Ha Noi</p>
                            <p><i className="fas fa-thumbtack"></i>No.2, District seven, Ho Chi Minh</p>
                        </div>
                    </div>

                    <Link to="/contact">
                        <button>
                            <i className="fas fa-headset"></i>
                            <span>Contact us</span>
                        </button>
                    </Link>

                    <button onClick={() => window.location.href = '#news'}>
                        <i className="fas fa-newspaper"></i>
                        <span>Tech news</span>
                    </button>

                    <Link to ="/cart">
                        <button className="btn-cart">
                            <i className="fas fa-shopping-cart"></i>
                        </button>
                    </Link>
                    
                    <button className="btn btn-login" onClick={openLoginModal}>Login</button>
                    <button className="btn btn-register" onClick={openRegisterModal}>Register</button>
                </div>
            </div>
        </div>
    );
};

export default Header;
