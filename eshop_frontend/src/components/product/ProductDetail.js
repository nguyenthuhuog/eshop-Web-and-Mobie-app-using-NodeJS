import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../css/productdetail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const api = `http://localhost:8080/api/products/${id}`;
    const imageApiBase = 'http://localhost:8080/api/images';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(api);
                const fetchedProduct = response.data;

                const imageResponse = await axios.get(`${imageApiBase}/productID/${fetchedProduct.productID}`);
                const productWithImage = { ...fetchedProduct, imageUrl: imageResponse.data.image_url };

                setProduct(productWithImage);
                console.log('Product details with image:', productWithImage);
            } catch (error) {
                console.error('Error fetching product details or image:', error);
            }
        };

        const fetchComments = async () => {
            // Lấy comment từ Local Storage
            const storedComments = JSON.parse(localStorage.getItem(`comments-${id}`)) || [];
            setComments(storedComments);
        };

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

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newCommentData = {
            id: Date.now(),
            content: newComment,
        };
        const updatedComments = [...comments, newCommentData];
        setComments(updatedComments);
        setNewComment('');

        // Lưu comment vào Local Storage
        localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
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
                    <p className="product-price">Price: ${product.price.toFixed(2)}</p>
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
                        <i className="fas fa-shopping-cart cart-icon"></i>
                    </div>
                    {quantityError && <p className="quantity-error">Cannot exceed available stock.</p>}
                </div>
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>{comment.content}</li>
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
