import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShopContext } from '../context/ShopContextProvider';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../log/config';
import Navbar from '../components/Navbar';

const Cart = ({ toggleSidebar }) => {
  const { cartItems, products, removeFromCart, updateCartItemCount, addToCart, getTotalCartAmount, setCartItems, getDefaultCart } = useContext(ShopContext);
  const [productImages, setProductImages] = useState({});

  const api = `${BASE_URL}/products`;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProductImages = async () => {
      const images = {};
      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          try {
            const imageResponse = await axios.get(`${api}/${productId}`, {withCredentials: true});
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
      const response = await axios.post(`${BASE_URL}/products/checkout`, { userID, products: productsToUpdate }, {withCredentials: true});
      console.log(response.data);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  const totalAmount = getTotalCartAmount();

  return (
    <View style={styles.mainContainer}>
      <Navbar toggleSidebar={toggleSidebar} />
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={products.filter(product => cartItems[product.productID] > 0)}
          keyExtractor={(item) => item.productID.toString()}
          renderItem={({ item: product }) => (
            <View key={product.productID} style={styles.cartItem}>
              {productImages[product.productID] ? (
                <Image source={{ uri: productImages[product.productID] }} style={styles.productImage} />
              ) : (
                <Image source={require('../img/background.jpg')} style={styles.productImage} />
              )}
              <View style={styles.description}>
                <Text style={styles.productName}>{product.productName}</Text>
                <Text>Price: ${parseFloat(product.price).toFixed(2)}</Text>
                <View style={styles.countHandler}>
                  <TouchableOpacity onPress={() => removeFromCart(product.productID)} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    value={cartItems[product.productID].toString()}
                    onChangeText={(value) => updateCartItemCount(Number(value), product.productID)}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity onPress={() => addToCart(product.productID)} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            totalAmount > 0 ? (
              <View style={styles.checkout}>
                <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>
                <TouchableOpacity style={styles.buttonCart} onPress={handleCheckout}>
                  <Text style={styles.buttonText}>Checkout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCart} onPress={() => navigation.navigate('HomePage')}>
                  <Text style={styles.buttonText}>Continue Shopping</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
            )
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
  buttonCart: {
    backgroundColor: '#4682A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4682A9',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Cart;
