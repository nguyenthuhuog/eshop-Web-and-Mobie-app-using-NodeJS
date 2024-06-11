import React, { useContext } from "react";
import { ShopContext } from "./ShopContextProvider";
import '../../css/homepage.css';

export const Product = (props) => {
  const { id, productName, price, productImage, description, stock } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product" key={id}>
        <h3>{productName}</h3>
        <img src={productImage} />
        <div className="description">      
            <p>Description: {description}</p>
            <p> Price: ${price}</p>
            <p>Stock: {stock}</p>
            </div>
      <button className="btn-addToCart" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};