// AddProductForm.js
import React, { useState } from 'react';
import '../css/addProductForm.css';

const AddProductForm = ({ addProduct }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(), // Simple unique ID generation
      productName,
      price: parseFloat(price),
      productImage,
      description,
      stock: parseInt(stock, 10)
    };
    addProduct(newProduct);
    // Reset form fields
    setProductName('');
    setPrice('');
    setProductImage('');
    setDescription('');
    setStock('');
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <div>
        <label>Product Name:</label>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Price:</label>
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Product Image URL:</label>
        <input 
          type="text" 
          value={productImage} 
          onChange={(e) => setProductImage(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        ></textarea>
      </div>
      <div>
        <label>Stock:</label>
        <input 
          type="number" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;