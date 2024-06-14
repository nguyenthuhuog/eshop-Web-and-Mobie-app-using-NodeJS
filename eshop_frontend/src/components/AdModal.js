import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/AdModal.css';
import ProductGridComponent from './product/ProductGridComponent.js';

// pop up advertise
const AdModal = ({ isOpen, onClose }) => {

    let api = 'http://localhost:8080/api/products';
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${api}`);

            const min = 0;
            const max = response.data.length;
            // Generate a random integer within the range [min, max]
            const randId = Math.floor(Math.random() * (max - min + 1)) + min;
            const fetchedProducts = response.data[randId];
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [])
    if (!isOpen) return null;

    return (
        <div className="ad-modal-overlay">
            <div className="ad-modal">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="ad-modal-content">
                    <ProductGridComponent product = {products}/>
                </div>
            </div>
        </div>
    );
};

export default AdModal;
