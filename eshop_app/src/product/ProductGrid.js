import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContextProvider';
import { BASE_URL } from '../log/config';

const ProductGrid = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigation = useNavigation();
  const api = `${BASE_URL}/products`; // Define your API base URL here

  const fetchProducts = async () => {
    try {
      let apiEndpoint = api;
      if (categoryName != null) apiEndpoint = `${api}/byCategory/${categoryName}`;
      const response = await axios.get(apiEndpoint);
      const fetchedProducts = response.data;
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]); // Call fetchProducts inside useEffect

  return (
    <View style={styles.productGrid}>
      {products.length > 0 ? (
        products.map((product) => (
          <TouchableOpacity
            key={product.productID}
            style={styles.product}
            onPress={() => navigation.navigate('ProductDetail', { id: product.productID })}
          >
            <Text style={styles.productName}>{product.productName}</Text>
            <Image 
              source={{ uri: product.image_url }} alt={`Image of ${product.productName}`} 
              style={styles.productImage}
            />
            <Text style={styles.productPrice}>Price: ${parseFloat(product.price).toFixed(2)}</Text>
            <Text style={styles.productStock}>Stock: {product.stock}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(product.productID)}
            >
              <Text style={styles.addToCartButtonText}>
                Add to cart {cartItems[product.productID] > 0 && `(${cartItems[product.productID]})`}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))
      ) : (
        <Text>Loading products...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    backgroundColor: '#91C8E4',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  productPrice: {
    fontSize: 14,
  },
  productStock: {
    fontSize: 14,
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#4682A9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
  },
});

export default ProductGrid;
