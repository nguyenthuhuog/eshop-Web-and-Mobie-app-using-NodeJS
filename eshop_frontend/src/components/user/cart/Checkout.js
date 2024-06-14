import React from 'react';
import qrcode from '../../../img/qrcode.png';
import '../../../css/homepage.css';
import { useNavigate } from 'react-router-dom';
import '../../../css/cart.css';


const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="qrcode">
      <img src={qrcode} alt="Qr code" />
      <div className="item">
        Transfer money to this bank account!!!
      </div>
      <div className="checkout">
        <div className="totalAmount">
        <button style = {{marginLeft: 60}} onClick={() => navigate('/Homepage')}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
