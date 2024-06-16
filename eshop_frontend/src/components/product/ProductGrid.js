// src/ProductGrid.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGridComponent from './ProductGridComponent';
import Cookies from 'js-cookie';
import '../../css/homepage.css';

const ProductGrid = ({ categoryName }) => {
    let api = 'http://localhost:8080/api/products';
    const [products, setProducts] = useState([]);
    const isAdmin = Cookies.get('isAdmin') === '1';

    const fetchProducts = async () => {
        try {
            if (categoryName != null) api = `${api}/byCategory/${categoryName}`;
            const response = await axios.get(api, {withCredentials: true});
            const fetchedProducts = response.data;
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryName]);

    return (
        <div className="main">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductGridComponent key={product.id} product={product} isAdmin={isAdmin} />
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
