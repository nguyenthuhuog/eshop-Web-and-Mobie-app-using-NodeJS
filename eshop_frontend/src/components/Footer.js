import React from 'react';
import '../css/homepage.css';
import Cookies from 'js-cookie';


const Footer = ({ visitCount }) => {
    const isAdmin = Cookies.get('isAdmin') === '1';
    return (
        <div id="footer">
            <div className="contact-info-footer">
                <p>Contact Us: 1900. 2900</p>
                <p>Email: info@H2Tcomputershop.com</p>
                <p>Address: No.1, Dai Co Viet, Hai Ba Trung, Ha Noi</p>
                {isAdmin && (
                <p>Visit Count: {visitCount}</p>
            )}
            </div>
        </div>
    );
};

export default Footer;
