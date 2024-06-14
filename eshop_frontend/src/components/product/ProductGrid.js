import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGridComponent from './ProductGridComponent.js';
import '../../css/homepage.css';

const ProductGrid = ({ categoryName }) => {
    let api = 'http://localhost:8080/api/products';
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            if (categoryName != null) api = `${api}/byCategory/${categoryName}`;
            const response = await axios.get(api);
            const fetchedProducts = response.data;
            setProducts(fetchedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    useEffect(() => {
        fetchProducts();

        // // Check if user is admin
        // const checkAdminStatus = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:8080/api/accounts/login-status', { withCredentials: true });
        //         setIsAdmin(response.data.isAdmin);
        //     } catch (error) {
        //         console.error('Error checking admin status:', error);
        //     }
        // };

        // checkAdminStatus();
    }, [categoryName]);

    return (
        <div className="main">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductGridComponent product = {product}/>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
