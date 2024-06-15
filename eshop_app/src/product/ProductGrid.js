import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ShopContext } from '../context/ShopContext';

const ProductGrid = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigation = useNavigation();
  const api = 'http://10.136.8.29:8080/api/products'; // Define your API base URL here

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let apiUrl = api; // Assign the base API URL to a variable
        if (categoryName != null) {
          apiUrl = `${api}/byCategory/${categoryName}`; // Append category name if provided
        }
        const response = await axios.get(apiUrl); // Use apiUrl instead of api
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call fetchProducts inside useEffect

    // This block is commented out as it's not currently used
    /*
    useEffect(() => {
      const checkAdminStatus = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/accounts/login-status', { withCredentials: true });
          setIsAdmin(response.data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      };

      checkAdminStatus();
    }, []);
    */
  }, [categoryName]); // useEffect dependency on categoryName

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
            <Image source={{ uri: product.image_url }} alt={`Image of ${product.productName}`} />
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
