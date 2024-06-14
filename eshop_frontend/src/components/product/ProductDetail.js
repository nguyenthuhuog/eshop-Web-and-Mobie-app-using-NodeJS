import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useParams } from 'react-router-dom';
import { ShopContext } from './ShopContextProvider'; // Import ShopContext
import LoginModal from '../LoginModal'; // Ensure this path is correct

import '../../css/productdetail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [totalRating, setTotalRating] = useState(5);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { addToCart } = useContext(ShopContext); // Use the ShopContext
    const api = `http://localhost:8080/api/products/${id}`;
    const commentApiBase = 'http://localhost:8080/api/comments';

    const fetchProduct = async () => {
        console.log("Call fetch product");
        try {
            const response = await axios.get(api);
            const fetchedProduct = response.data;

            setProduct(fetchedProduct);
            console.log('Product details with image:', fetchedProduct);
            return Promise.all([fetchProduct.productID]);
        } catch (error) {
            console.error('Error fetching product details or image:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${commentApiBase}/productID/${product.productID}`);
            console.log('Comments retrieved successfully:', response.data);
            setComments(response.data);

            //calculate rating
            var totalRate = 0;
            comments.map((comment) => (
                totalRate += parseFloat(comment.rate ? comment.rate : 5.0)
            ))
            setTotalRating(totalRate/comments.length);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product) { // Ensure product is fetched before fetching comments
            fetchComments();
        }
    }, [product]);


    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
            setQuantityError(false);
        } else if (newQuantity > product.stock) {
            setQuantityError(true);
        }
    };

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.productID);
        }
    };

    const handleCommentSubmit = async (e) => {
        console.log("Call add comment");
        e.preventDefault();
        if (!Cookies.get('userID')) {
            setIsLoginModalOpen(true); // Show login modal if not logged in
            return;
        }
        const newCommentData = {
            content: newComment,
            productID: product.productID,
            rate: newRating,
            userID : Cookies.get('userID'),
        };

        setNewComment('');
        setNewRating(5);

        try {
            const response = await axios.post(commentApiBase, newCommentData);

            if (response.status === 201) {
                console.log('Comment saved successfully:', response.data);
            }
        } catch (error) {
            console.error('Error saving comment:', error);
        }
        fetchComments();
    };

    if (!product) return <div>Loading...</div>;

    const productDetailsTitle = "Thông số sản phẩm";
    const productDetails = product.description.split(';').map((detail, index) => (
        <p key={index} className="product-details">{detail.trim()}</p>
    ));

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-image">
                    <img src={product.image_url} alt={product.productName} />
                </div>
                <div className="product-info">
                    <h2 className="product-name">{product.productName}</h2>
                    <p className="product-price">Price: ${parseFloat(product.price).toFixed(2)}</p>
                    <div>
                        <p className="product-details-title">{productDetailsTitle}</p>
                        {productDetails}
                    </div>
                    <p className="product-stock">Stock: {product.stock}</p>
                    <div className="cart-section">
                        <div className="quantity-selector">
                            <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}>+</button>
                        </div>
                        <i className="fas fa-shopping-cart cart-icon" onClick={handleAddToCart}></i>
                    </div>
                    {quantityError && <p className="quantity-error">Cannot exceed available stock.</p>}
                </div>
            </div>
            <div className="comments-section">
                <h3>Overal rating: {totalRating.toFixed(1)}/5.0</h3>
                <h3>Comments</h3>
                <ul>
                    {comments.length > 0 ? comments.map((comment) => (
                        <li key={comment.id}>
                            User #{comment.userID} : {comment.content} (Rating: {parseFloat(comment.rate ? comment.rate : 5.0).toFixed(1)}/5.0)
                        </li>
                    )) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    ></textarea>
                    <label>
                        Rating:
                        <input
                            type="number"
                            value={newRating}
                            onChange={(e) => setNewRating(e.target.value)}
                            min="0.5" max="5" step="0.5"
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <LoginModal show={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} setIsLoggedIn={() => { /* handle setting logged-in state if needed */ }} />
        </div>
    );
};

export default ProductDetail;
