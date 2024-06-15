import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../product/ShopContextProvider';

export const CartItem = (props) => {
  const { id, productName, price, productImage, stock } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount, errorMessages } = useContext(ShopContext);

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <View style={styles.description}>
        <Text style={styles.productName}>
          <b>{productName}</b>
        </Text>
        <Text style={styles.productPrice}>Price: ${price.toFixed(2)}</Text>
        <View style={styles.countHandler}>
          <TouchableOpacity onPress={() => removeFromCart(id)} style={styles.button}>
            <FontAwesomeIcon icon={faMinus} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(cartItems[id])}
            onChangeText={(value) => updateCartItemCount(Number(value), id)}
          />
          <TouchableOpacity
            onPress={() => addToCart(id)}
            style={styles.button}
            disabled={stock === 0}
          >
            <FontAwesomeIcon icon={faPlus} />
          </TouchableOpacity>
        </View>
        {errorMessages[id] && <Text style={styles.errorMessage}>{errorMessages[id]}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  description: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginVertical: 10,
  },
  countHandler: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  input: {
    width: 50,
    height: 40,
    textAlign: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
});

export default CartItem;
