import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ShopContext } from './ShopContextProvider'; // Import ShopContext
import '../../css/productdetail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { addToCart } = useContext(ShopContext); // Use the ShopContext
    const api = `http://localhost:8080/api/products/${id}`;
    const imageApiBase = 'http://localhost:8080/api/images';
    const commentApiBase = 'http://localhost:8080/api/comments';

    const fetchProduct = async () => {
        try {
            const response = await axios.get(api);
            const fetchedProduct = response.data;

            const imageResponse = await axios.get(`${imageApiBase}/productID/${fetchedProduct.productID}`);
            const productWithImage = { ...fetchedProduct, imageUrl: imageResponse.data[0].image_url };

            setProduct(productWithImage);
            console.log('Product details with image:', productWithImage);
        } catch (error) {
            console.error('Error fetching product details or image:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get(`${commentApiBase}/productID`);
            console.log('Comments retrieved successfully:', response.data);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchComments();
    }, [id]);

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
        e.preventDefault();
        const newCommentData = {
            content: newComment,
            productID: product.productID,
            userID : 10000001, // tạm
        };

        setNewComment('');

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
                    <img src={product.imageUrl} alt={product.productName} />
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
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            User #{comment.userID}: {comment.content}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                    ></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetail;
