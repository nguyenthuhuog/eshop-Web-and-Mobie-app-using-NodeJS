// ComputerPage.js
import React, { useState } from 'react';
import { PRODUCTS } from '../products'; // Import the PRODUCTS array
import { Product } from '../Product';
import AddProductForm from './AddProductForm'; // Import the AddProductForm component
import '../css/homepage.css';
import '../css/product.css';

const ComputerPageAdmin = () => {
  const [products, setProducts] = useState(PRODUCTS);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

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

        <div className="product-grid">
          {products.map((product) => (
            <Product key={product.id} data={product} deleteProduct={deleteProduct} />
          ))}
        </div>

        <AddProductForm addProduct={addProduct} />
      </div>
    </div>
  );
};

export default ComputerPageAdmin;