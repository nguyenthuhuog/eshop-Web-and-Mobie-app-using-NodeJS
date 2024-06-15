// src/screens/ProductDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext'; // Import ShopContext
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 

const ProductDetail = () => {
    const route = useRoute();
    const { id } = route.params; // Get the id from the route params
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { addToCart } = useContext(ShopContext); // Use the ShopContext
    const api = `http://10.136.8.29:8080/api/products/${id}`;
    const commentApiBase = 'http://10.136.8.29:8080/api/comments';

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

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product.productID);
        }
    };

    const handleCommentSubmit = async () => {
        const newCommentData = {
            content: newComment,
            productID: product.productID,
            userID: 10000001, // temporary userID
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

    const productDetailsTitle = "Product Specifications";
    const productDetails = product.description.split(';').map((detail, index) => (
        <Text key={index} style={styles.productDetails}>{detail.trim()}</Text>
    ));

    return (
        <ScrollView style={styles.productDetailPage}>
            <View style={styles.productDetailContainer}>
                <Image source={{ uri: product.image_url }} style={styles.productImage} />
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
                            <Text style={styles.quantity}>{quantity}</Text>
                            <TouchableOpacity onPress={() => handleQuantityChange(quantity + 1)} disabled={quantity >= product.stock}>
                                <Text style={styles.quantityButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleAddToCart} style={styles.cartButton}>
                            <FontAwesomeIcon icon={faShoppingCart} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {quantityError && <Text style={styles.quantityError}>Cannot exceed available stock.</Text>}
                </View>
            </View>
            <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>Comments</Text>
                {comments.map((comment) => (
                    <Text key={comment.id} style={styles.comment}>
                        User #{comment.userID}: {comment.content}
                    </Text>
                ))}
                <TextInput
                    style={styles.commentInput}
                    value={newComment}
                    onChangeText={setNewComment}
                    placeholder="Write a comment..."
                />
                <Button title="Submit" onPress={handleCommentSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    productDetailPage: {
        flex: 1,
    },
    productDetailContainer: {
        padding: 20,
    },
    productImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 20,
        color: 'green',
        marginVertical: 10,
    },
    productDetailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productDetails: {
        fontSize: 16,
        marginVertical: 5,
    },
    productStock: {
        fontSize: 16,
        marginVertical: 10,
    },
    cartSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    quantityButton: {
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'gray',
        textAlign: 'center',
    },
    quantity: {
        fontSize: 20,
        paddingHorizontal: 20,
    },
    cartButton: {
        backgroundColor: '#4682A9',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 13,
    },
    quantityError: {
        color: 'red',
        marginTop: 10,
    },
    commentsSection: {
        padding: 20,
    },
    commentsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    comment: {
        fontSize: 16,
        marginBottom: 10,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ProductDetail;
