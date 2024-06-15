import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const api = 'http://localhost:8080/api/products';
  const [post, setPost] = useState({
    productName: '',
    categoryID: '', // Added categoryID here
    price: '',
    image_url: '',
    description: '',
    stock: ''
  });

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(post);
      // Send a POST request with the form data
      const response = await axios.post(api, post);
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            type="text"
            id="product-name"
            name="productName"
            value={post.productName}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category-id">Category</label>
          <select id="category-id" name="categoryID"
            value={post.categoryID} onChange={handleInput} required >
            <option value="">Select a category</option>
            <option value="40000001">Laptop</option>
            <option value="40000002">Mouse</option>
            <option value="40000003">Keyboard</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={post.price}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Product Image URL</label>
          <input
            type="url"
            id="image"
            name="image_url"
            placeholder="https://example.com" 
            pattern="https://.*"
            value={post.image_url}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={post.description}
            onChange={handleInput}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={post.stock}
            onChange={handleInput}
            required
          />
        </div>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
