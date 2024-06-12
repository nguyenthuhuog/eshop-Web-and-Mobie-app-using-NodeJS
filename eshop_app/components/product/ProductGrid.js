import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from './ShopContextProvider';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ProductGrid = ({ categoryName }) => {
  let api = 'http://localhost:8080/api/products';
  const imageApiBase = 'http://localhost:8080/api/images';
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigation = useNavigation();

  const fetchProducts = async () => {
    try {
      if (categoryName != null) api = `${api}/byCategory/${categoryName}`;
      const response = await axios.get(api);
      const fetchedProducts = response.data;

      const productsWithImages = await Promise.all(
        fetchedProducts.map(async (product) => {
          try {
            const imageResponse = await axios.get(`${imageApiBase}/productID/${product.productID}`);
            // imageResponse contain multiple images of one product
            return { ...product, imageUrl: imageResponse.data[0].image_url };
          } catch (error) {
            console.error(`Error fetching image for productID ${product.productID}:`, error);
            return product;
          }
        })
      );
      setProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (productId) => {
    navigation.navigate('ProductDetail', { id: productId });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Stop the event from propagating to parent elements
    addToCart(product.productID);
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  return (
    <ScrollView style={styles.main}>
      <View style={styles.productGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <TouchableOpacity
              key={product.productID}
              style={styles.product}
              onPress={() => handleProductClick(product.productID)}
            >
              <Text style={styles.productName}>{product.productName}</Text>
              <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
              <Text style={styles.productPrice}>Price: ${parseFloat(product.price).toFixed(2)}</Text>
              <Text style={styles.productStock}>Stock: {product.stock}</Text>
              <TouchableOpacity
                style={styles.btnAddToCart}
                onPress={(e) => handleAddToCart(e, product)}
              >
                <Text style={styles.btnText}>
                  Add to cart {cartItems[product.productID] > 0 && `(${cartItems[product.productID]})`}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Loading products...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductGrid;
