import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/homepage.css';

const UpdateModal = ({ show, onClose, product, onUpdate }) => {
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        description: '',
        stock: '',
        image_url: '',
    });
    

    useEffect(() => {
        if (product) {
            setFormData({
                productName: product.productName,
                price: product.price,
                description: product.description,
                stock: product.stock,
                image_url: product.image_url,
            });
        }
    }, [product]);

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/products/${product.productID}`, formData);
            if (response.status === 200) {
                onUpdate();
                onClose();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" style={{ width: '420%' }} value={formData.description} onChange={handleChange} />
                    </label>
                    <label>
                        Stock:
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange} />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;
