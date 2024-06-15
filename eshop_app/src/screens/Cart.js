// src/screens/Cart.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Image, Button, FlatList, StyleSheet} from 'react-native';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import { ScrollView } from 'react-native-gesture-handler';

const Cart = ({toggleSidebar}) => {
  const { cartItems, products, removeFromCart, updateCartItemCount, addToCart, getTotalCartAmount, setCartItems, getDefaultCart } = useContext(ShopContext);
  const [productImages, setProductImages] = useState({});
  const imageApiBase = 'http://10.136.8.29:8080/api/images';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = {};
      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          try {
            const imageResponse = await axios.get(`${imageApiBase}/productID/${productId}`);
            images[productId] = imageResponse.data[0].image_url;
          } catch (error) {
            console.error(`Error fetching image for productID ${productId}:`, error);
          }
        }
      }
      setProductImages(images);
    };
    fetchProductImages();
  }, [cartItems]);

  const handleCheckout = async () => {
    const productsToUpdate = Object.keys(cartItems).map(key => ({
      productID: Number(key),
      quantity: cartItems[key]
    }));
    try {
      await axios.post('http://10.136.8.29:8080/api/products/checkout', { userID: 10000002, products: productsToUpdate });
      setCartItems(getDefaultCart(products));
      navigation.navigate('Checkout');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const totalAmount = getTotalCartAmount();

  return (
  <ScrollView style={styles.mainContainer}>
    <Navbar toggleSidebar={toggleSidebar} /> 
    <View style={styles.container}>   
    <View style={styles.cart}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={products.filter(product => cartItems[product.productID] > 0)}
        keyExtractor={(item) => item.productID.toString()}
        renderItem={({ item: product }) => (
          <View key={product.productID} style={styles.cartItem}>
            <Image source={{ uri: productImages[product.productID] }} style={styles.productImage} />
            <View style={styles.description}>
              <Text style={styles.productName}>{product.productName}</Text>
              <Text>Price: ${parseFloat(product.price).toFixed(2)}</Text>
              <View style={styles.countHandler}>
                <Button title="-" onPress={() => removeFromCart(product.productID)} />
                <TextInput
                  style={styles.input}
                  value={cartItems[product.productID].toString()}
                  onChangeText={(value) => updateCartItemCount(Number(value), product.productID)}
                  keyboardType="numeric"
                />
                <Button title="+" onPress={() => addToCart(product.productID)} />
              </View>
            </View>
          </View>
        )}
      />
      {totalAmount > 0 ? (
        <View style={styles.checkout}>
          <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>
          <Button title="Checkout" onPress={handleCheckout} />
          <Button title="Continue Shopping" onPress={() => navigation.navigate('HomePage')} />
        </View>
      ) : (
        <Text>Your cart is empty</Text>
      )}
    </View>
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  cart: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  description: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  countHandler: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  checkout: {
    marginTop: 20,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Cart;
