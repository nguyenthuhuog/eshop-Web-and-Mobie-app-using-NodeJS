// AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ addProduct }) => {
  const api = 'http://localhost:8080/api/products';
  const [post, setPost] = useState({
    productName: '',
    price: '',
    productImage:'',
    description:'',
    stock: ''
});

      const handleInput = (event) => {
        setPost({...post, [event.target.name]: event.target.value}) // đổi event thành value -> lưu đc giá trị input vào biến này (lỗi syntax)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(post);
            // Send a POST request with the form data
            const response = await axios.post(api, post); // ban đầu là {post}, t bỏ cái ngoặc thôi :v, input là 1 phần tử chứ k phải 1 list ý
            // .then(response => console.log(response));
    
            console.log('Message sent successfully:', response.data); // chỗ này lỗi đọc data, bỏ dòng then bên trên là hết, chắc kiểu nếu then rồi thì sau đó response bị giải phóng luôn idk
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
    <div className="form-row">
        <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" id="product-name" name="productName" value={post.productName} onChange={handleInput} required />
        </div>
        <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={post.price} onChange={handleInput} required />
        </div>
        <div className="form-group">
            <label htmlFor="image">Product Image URL </label>
            <input type="text" id="image" name="productImage" value={post.productImage} onChange={handleInput} required />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={post.description} onChange={handleInput} required />
        </div>
        <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input type="text" id="stock" name="stock" value={post.stock} onChange={handleInput} required />
        </div>
    </div>
    <button type="submit">Add Product</button>
</form>
  );
};

export default AddProductForm;