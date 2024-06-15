// ComputerPage.js
import React, { useState } from 'react';
// import { PRODUCTS } from '../products'; // Import the PRODUCTS array
import { Product } from '../product/Product';
import AddProductForm from './product/AddProductForm'; // Import the AddProductForm component
import '../../css/homepage.css';
import '../../css/product.css';
// import ProductGrid from './product/AdminProductGrid';

const ComputerPageAdmin = () => {
  return (
    <div className="container">
      <div className="main">
        <div className="item">
          <h2>Laptop</h2>
          <p>
            A laptop is a compact and portable computer device.
            It is designed for use in work, entertainment or study activities on the go without having to use a bulky desktop computer.
          </p>
        </div>

      {/* <ProductGrid></ProductGrid> */}

        <AddProductForm />
      </div>
    </div>
  );
};

export default ComputerPageAdmin;