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
            const response = await axios.get(`${api}`, {withCredentials: true});
            const uniqueIds = getRandomIds(0, response.data.length - 1, 3)
            for (var i=0; i<uniqueIds.length; i++)
                setProducts((prevProducts) => [...prevProducts, response.data[uniqueIds[i]]]);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    
    function getRandomIds(min, max, count) {
        const uniqueIds = new Set();
    
        while (uniqueIds.size < count) {
            const randId = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueIds.add(randId);
        }
    
        return Array.from(uniqueIds);
    }

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
                    <h1>Maybe you are interested in</h1>
                    <div className="ad-model-products">
                        {products.length > 0 ? (
                            products.map((product) => (
                            <ProductGridComponent key={product.id} product={product} />
                        ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdModal;
