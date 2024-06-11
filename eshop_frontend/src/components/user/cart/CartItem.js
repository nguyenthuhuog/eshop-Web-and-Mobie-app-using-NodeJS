import React, { useContext } from 'react';
import { ShopContext } from '../product/ShopContextProvider';
import '../css/cart.css';

export const CartItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  
    return (
      <div className="cartItem">
        <img src={productImage} alt={productName} />
        <div className="description">
          <p>
            <b>{productName}</b>
          </p>
          <p>Price: ${price.toFixed(2)}</p>
          <div className="countHandler">
            <button onClick={() => removeFromCart(id)}> <i className="fa-solid fa-minus"></i> </button>
            <input
              type="number"
              value={cartItems[id]}
              onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
            />
            <button onClick={() => addToCart(id)}> <i className="fa-solid fa-plus"></i> </button>
          </div>
        </div>
      </div>
    );
};
