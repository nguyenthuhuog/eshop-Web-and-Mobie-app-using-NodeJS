import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ShopContext } from './ShopContextProvider'; // Import ShopContext
import UpdateModal from './UpdateModal'; // Import EditProductModal

import '../../css/productdetail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetail = ({setIsLoginModalOpen}) => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize useNavigate
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [totalRating, setTotalRating] = useState(5);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for EditProductModal
    const { addToCart } = useContext(ShopContext); // Use the ShopContext
    const isAdmin = Cookies.get('isAdmin') === '1';

    const api = `http://localhost:8080/api/products/${id}`;
    const commentApiBase = 'http://localhost:8080/api/comments';

    const fetchProduct = async () => {
        console.log("Call fetch product");
        try {
            const response = await axios.get(api, {withCredentials: true});
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
            const response = await axios.get(`${commentApiBase}/productID/${product.productID}`, {withCredentials: true});
            console.log('Comments retrieved successfully:', response.data);
            setComments(response.data);

            // Calculate rating
            let totalRate = 0;
            response.data.forEach((comment) => {
                totalRate += parseFloat(comment.rate ? comment.rate : 5.0);
            });
            setTotalRating(totalRate / response.data.length);
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
            userID: Cookies.get('userID'),
        };

        setNewComment('');
        setNewRating(5);

        try {
            const response = await axios.post(commentApiBase, newCommentData, {withCredentials: true});

            if (response.status === 201) {
                console.log('Comment saved successfully:', response.data);
            }
        } catch (error) {
            console.error('Error saving comment:', error);
        }
        fetchComments();
    };

    const handleEditClick = () => {
        console.log('he');
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(api, {withCredentials: true});
            if (response.status === 200) {
                console.log('Product deleted successfully');
                navigate(-1); // Redirect to the products list page
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    const handleDeleteComment = async (id) => {
        try {
            const response = await axios.delete(`${commentApiBase}/${id}`, {withCredentials: true});
            if (response.status === 200) {
                console.log('Comment deleted successfully');
            }
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
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
                    <h2 className="product-name">{product.productName}
                    {isAdmin && (
                        <button className="fa-solid fa-trash" onClick={handleDelete}></button>
                    )}
                    </h2>
                    <p className="product-price">Price: ${parseFloat(product.price).toFixed(2)}</p>
                    <div>
                        <p className="product-details-title">{productDetailsTitle}</p>
                        {productDetails}
                    </div>
                    <div>
                        <p className="product-stock">Stock: {product.stock}</p>
                        <div className="cart-section">
                            <div className="quantity-selector">
                                {!isAdmin ? (
                                    <>
                                        <button onClick={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}>+</button>
                                        <i className="fas fa-shopping-cart cart-icon" onClick={handleAddToCart}></i>
                                    </>
                                ) : (
                                    <><p> Edit: </p>
                                    <button className="fas fa-pen-alt" onClick={handleEditClick}></button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {quantityError && <p className="quantity-error">Cannot exceed available stock.</p>}
                </div>
            </div>
            <div className="comments-section">
                <h3 style={{ fontSize: '30px', color: '#3498db' }}>Overall rating: {totalRating.toFixed(1)}/5.0</h3>
                <h3>Comments</h3>
                <ul>
                    {comments.length > 0 ? comments.map((comment) => (
                        <li key={comment.id}>
                            {/* User #{comment.userID} {comment.username} {comment.email}: {comment.content} (Rating: {parseFloat(comment.rate ? comment.rate : 5.0).toFixed(1)}/5.0) */}
                            <div>
                                <span style={{ color: '#3498db' }}>{comment.username}</span>
                                <span style={{ marginLeft: '10px', color: '#e74c3c' }}>{parseFloat(comment.rate ? comment.rate : 5.0).toFixed(1)}/5.0</span>
                            </div>
                            <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
                                User ID: {comment.userID} | Email: {comment.email}
                            </div>
                            <div style={{ fontSize: '16px', marginTop: '10px' }}>
                                {comment.content}
                            </div>
                            {isAdmin && (
                                    <button className="fa-solid fa-trash" onClick={() => handleDeleteComment(comment.commentID)}></button>
                            )}
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
                    <div style={{ color: '#3498db', fontWeight: 'bold', fontSize: '16px' }}>
                        <p>Rating:  {newRating}/5.0</p>
                        <input
                            type="range" step="0.5" min="0" max="5"
                            value={newRating} onChange={(e) => setNewRating(e.target.value)}
                            style={{ verticalAlign: 'middle' }}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <UpdateModal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} product={product} onUpdate={fetchProduct} />
        </div>
    );
};

export default ProductDetail;
