import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const ProductDetail = () => {
    const route = useRoute();
    const { id } = route.params;
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
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
            const response = await axios.get(commentApiBase);
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

    const handleCommentSubmit = async () => {
        const newCommentData = {
            content: newComment,
            productID: product.productID,
            userID: 10000001,
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

    if (!product) return <Text>Loading...</Text>;

    const productDetailsTitle = "Thông số sản phẩm";
    const productDetails = product.description.split(';').map((detail, index) => (
        <Text key={index} style={styles.productDetails}>{detail.trim()}</Text>
    ));

    return (
        <ScrollView style={styles.productDetailPage}>
            <View style={styles.productDetailContainer}>
                <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.productName}</Text>
                    <Text style={styles.productPrice}>Price: ${parseFloat(product.price).toFixed(2)}</Text>
                    <View>
                        <Text style={styles.productDetailsTitle}>{productDetailsTitle}</Text>
                        {productDetails}
                    </View>
                    <Text style={styles.productStock}>Stock: {product.stock}</Text>
                    <View style={styles.cartSection}>
                        <View style={styles.quantitySelector}>
                            <TouchableOpacity onPress={() => handleQuantityChange(quantity - 1)} disabled={quantity <= 1}>
                                <Text style={styles.quantityButton}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.cartIcon}>🛒</Text>
                        </TouchableOpacity>
                    </View>
                    {quantityError && <Text style={styles.quantityError}>Cannot exceed available stock.</Text>}
                </View>
            </View>
            <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comments</Text>
                {comments.map((comment) => (
                    <Text key={comment.id}>
                        User #{comment.userID}: {comment.content}
                    </Text>
                ))}
                <View>
                    <TextInput
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Write a comment..."
                        style={styles.commentInput}
                    />
                    <Button title="Submit" onPress={handleCommentSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ProductDetail;
