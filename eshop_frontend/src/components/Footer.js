import React from 'react';
import '../css/homepage.css';

const Footer = ({ visitCount }) => {
    return (
        <div id="footer">
            <div className="contact-info-footer">
                <p>Contact Us: 1900. 2900</p>
                <p>Email: info@H2Tcomputershop.com</p>
                <p>Address: No.1, Dai Co Viet, Hai Ba Trung, Ha Noi</p>
                <p>Visit Count: {visitCount}</p> {/* Display visit count here */}
            </div>
        </div>
    );
};

export default Footer;
