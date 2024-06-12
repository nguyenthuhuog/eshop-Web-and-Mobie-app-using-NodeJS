import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ShopContext } from './ShopContextProvider';

export const Product = (props) => {
  const { id, productName, price, productImage, description, stock } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <View style={styles.product} key={id}>
      <Text style={styles.productName}>{productName}</Text>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <View style={styles.description}>
        <Text>Description: {description}</Text>
        <Text>Price: ${price}</Text>
        <Text>Stock: {stock}</Text>
      </View>
      <TouchableOpacity style={styles.btnAddToCart} onPress={() => addToCart(id)}>
        <Text style={styles.btnText}>
          Add To Cart {cartItemCount > 0 && `(${cartItemCount})`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
