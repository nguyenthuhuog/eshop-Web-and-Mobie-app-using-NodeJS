import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShopContext } from '../context/ShopContext';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const { cartItems, products, removeFromCart, updateCartItemCount, 
    addToCart, getTotalCartAmount, setCartItems, getDefaultCart } = useContext(ShopContext);
  const [productImages, setProductImages] = useState({});

  const api = 'http://10.136.8.29:8080/api/products';
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = {};
      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          try {
            const imageResponse = await axios.get(`${api}/${productId}`);
            images[productId] = imageResponse.data.image_url;
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
    const userID = await AsyncStorage.getItem('userID');
    // if (!userID) {
    //     setIsLoginModalOpen(true); // Show login modal if not logged in
    //     return;
    // }

    const productsToUpdate = Object.keys(cartItems).map(key => {
        const product = products.find(p => p.productID === Number(key));
        return {
            productID: Number(key),
            quantity: cartItems[key],
            price: product.price
        };
    });

    try {
        setCartItems(getDefaultCart(products));
        navigation.navigate('Checkout');
        const response = await axios.post('http://10.136.8.29:8080/api/products/checkout', { userID, products: productsToUpdate });
        console.log(response.data);
    } catch (error) {
        console.error('Error during checkout:', error);
        alert('Checkout failed. Please try again.');
    }
  };

  const totalAmount = getTotalCartAmount();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.productID.toString()}
        renderItem={({ item: product }) => {
          if (cartItems[product.productID] > 0) {
            return (
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
            );
          }
          return null;
        }}
      />
      {totalAmount > 0 ? (
        <View style={styles.checkout}>
          <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>
          <Button title="Checkout" onPress={handleCheckout} />
          <Button title="Continue Shopping" onPress={() => navigation.navigate('Homepage')} />
        </View>
      ) : (
        <Text>Your cart is empty</Text>
      )}
      {/* <LoginModal visible={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  description: {
    flex: 1,
    marginLeft: 20,
  },
  productName: {
    fontSize: 18,
    marginBottom: 5,
  },
  countHandler: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 40,
    textAlign: 'center',
  },
  checkout: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Cart;
