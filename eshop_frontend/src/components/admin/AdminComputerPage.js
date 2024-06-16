// ComputerPage.js
import React, { useState } from 'react';
import AddProductForm from './product/AddProductForm'; // Import the AddProductForm component
import '../../css/homepage.css';
import '../../css/product.css';

const ComputerPageAdmin = () => {
  return (
    <div className="container">
      <div className="main">
        <AddProductForm />
      </div>
    </div>
  );
};

export default ComputerPageAdmin;