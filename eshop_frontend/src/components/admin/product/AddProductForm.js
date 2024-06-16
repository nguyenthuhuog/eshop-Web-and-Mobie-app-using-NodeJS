import React, { useState } from 'react';
import axios from 'axios';
import ProductGridComponent from '../../product/ProductGridComponent';
import '../../../css/AddProductForm.css';

const AddProductForm = () => {
  const api = 'http://localhost:8080/api/products';
  const [message, setMessage] = useState('');
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
      const response = await axios.post(api, post, {withCredentials: true});
      console.log('Product added successfully:', response.data);
      setMessage('Product successfully added to the database!');
      // Reset form
      setPost({
        productName: '', categoryID: '', price: '', image_url: '',
        description: '', stock: ''
      });
    } catch (error) {
      setMessage('Something went wrong, please try again');
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add a new product to the database</h1>
      <div className="main2">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="product-form">
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
            <button type="submit" className="submit-button">Add Product</button>
          </form>
          {message && <div className="success-message">{message}</div>}
        </div>
        <div className="product-preview">
          <h2>Preview</h2>
          <ProductGridComponent product={post} isAdmin={true}/>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
