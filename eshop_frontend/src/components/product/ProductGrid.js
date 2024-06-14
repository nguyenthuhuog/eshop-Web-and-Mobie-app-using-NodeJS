import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from './ShopContextProvider';
import { useNavigate } from 'react-router-dom';
import '../../css/homepage.css';

const ProductGrid = ({ categoryName }) => {
    let api = 'http://localhost:8080/api/products';
    const [products, setProducts] = useState([]);
    const { addToCart, cartItems } = useContext(ShopContext);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false); // State to store admin status

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

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Stop the event from propagating to parent elements
        addToCart(product.productID);
    };

    useEffect(() => {
        fetchProducts();

        // Check if user is admin
        const checkAdminStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/accounts/login-status', { withCredentials: true });
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error('Error checking admin status:', error);
            }
        };

        checkAdminStatus();
    }, [categoryName]);

    return (
        <div className="main">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div className="product" key={product.productID} onClick={() => handleProductClick(product.productID)}>
                            <h3>{product.productName}</h3>
                            <img src={product.image_url} alt={`Image of ${product.productName}`} />
                            <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                            <p>Stock: {product.stock}</p>
                            {!isAdmin && (
                                <button className="btn-addToCart" onClick={(e) => handleAddToCart(e, product)}>
                                    Add to cart {cartItems[product.productID] > 0 && <> ({cartItems[product.productID]})</>}
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;
