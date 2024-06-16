import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContextProvider';
import { BASE_URL } from '../log/config';
import Navbar from '../components/Navbar'; // Ensure the Navbar component is imported correctly
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';

const ProductDetail = ({ toggleSidebar, handleLogout }) => {
  const route = useRoute();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [totalRating, setTotalRating] = useState(5);
  const { addToCart } = useContext(ShopContext);

  const api = `${BASE_URL}/products/${id}`;
  const commentApiBase = `${BASE_URL}/comments`;

  const fetchProduct = async () => {
    try {
      const response = await axios.get(api);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const fetchComments = async () => {
    try {
      if (!product) return; // Check if product is null before fetching comments

      const response = await axios.get(`${commentApiBase}/productID/${product.productID}`);
      setComments(response.data);

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
    if (product) {
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

  const handleCommentSubmit = async () => {
    try {
      const userID = await AsyncStorage.getItem('userID');
      if (!userID) {
        console.error('User ID not found');
        return;
      }
  
      const newCommentData = {
        content: newComment,
        productID: product.productID,
        rate: newRating,
        userID: parseInt(userID), // Ensure userID is an integer
      };
  
      setNewComment('');
      setNewRating(5);
  
      const response = await axios.post(commentApiBase, newCommentData);
      if (response.status === 201) {
        console.log('Comment saved successfully:', response.data);
        fetchComments(); // Fetch comments again after successful submission
      }
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  if (!product) return <Text>Loading...</Text>;

  const productDetailsTitle = "Product Specifications";
  const productDetails = product.description.split(';').map((detail, index) => (
    <Text key={index} style={styles.productDetails}>{detail.trim()}</Text>
  ));

  return (
    <ScrollView style={styles.mainContainer}>
      <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <View style={styles.container}>
        <View style={styles.productDetailContainer}>
          <Image source={{ uri: product.image_url }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.productPrice}>Price: ${parseFloat(product.price).toFixed(2)}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
            <View>
              <Text style={styles.productDetailsTitle}>{productDetailsTitle}</Text>
              {productDetails}
            </View>
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
                <FontAwesomeIcon icon={faShoppingCart} size={20} color="#fff" />
                <Text style={styles.cartButtonText}> Add to Cart</Text>
              </TouchableOpacity>
            </View>
            {quantityError && <Text style={styles.quantityError}>Cannot exceed available stock.</Text>}
          </View>
        </View>
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Overall rating: {totalRating.toFixed(1)}/5.0</Text>
          <Text style={styles.commentsTitle}>Comments</Text>
          {comments.length > 0 ? comments.map((comment) => (
            <View key={comment.id} style={styles.comment}>
              <Text>User {comment.username} #{comment.userID}: {comment.content} (Rating: {parseFloat(comment.rate ? comment.rate : 5.0).toFixed(1)}/5.0)</Text>
              <Text>Email: {comment.email}</Text>
            </View>
          )) : (
            <Text>No comments yet. Be the first to comment!</Text>
          )}
          <TextInput
            style={styles.commentInput}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Write a comment..."
          />
          <Text>Rating: {newRating}</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            value={newRating}
            onValueChange={setNewRating}
            minimumTrackTintColor="#0000FF"
            maximumTrackTintColor="#000000"
          />
          <TouchableOpacity onPress={handleCommentSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  productDetailContainer: {
    flexDirection: 'column', // Change to column to place image on top and text below
    marginBottom: 20,
    alignItems: 'center', // Center align items
  },
  productImage: {
    width: '100%', // Set width to 100% for larger image
    height: 300, // Increase height for larger image
    marginBottom: 20,
  },
  productInfo: {
    flex: 1,
    alignItems: 'center', // Center align items
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginVertical: 10,
    textAlign: 'center',
  },
  productDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productDetails: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
  productStock: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
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
    flexDirection: 'row', // To align icon and text in a row
    alignItems: 'center', // Center align items
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10, // Space between icon and text
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
    textAlign: 'center',
  },
  comment: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4682A9',
    flexDirection: 'row', // To align icon and text in a row
    alignItems: 'center', // Center align items
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    alignContent: 'center',
    marginLeft: 110, // Space between icon and text
  },
});

export default ProductDetail;