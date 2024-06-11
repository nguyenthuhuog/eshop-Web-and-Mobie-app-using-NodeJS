import React, { useEffect, useState } from 'react';
import qrcode from '../../../img/qrcode.png';
import '../../../css/homepage.css';

const Checkout = () => {
    return (
        <div className="qrcode">
            <img
              src={qrcode}
              alt={'Qr code'}
            />
            <div className="item">            
                Transfer money to this bank account!!!
            </div>
        </div>
      );
};
export default Checkout;
