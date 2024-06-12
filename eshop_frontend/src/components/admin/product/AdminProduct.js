// Product.js
import React from 'react';
import '../css/product.css';

export const Product = ({ data, deleteProduct }) => {
    return (
        <div className="product">
            <img src={data.productImage} alt={data.productName} />
            <h3>{data.productName}</h3>
            <p>{data.description}</p>
            <p>${data.price}</p>
            <button onClick={() => deleteProduct(data.id)}>Delete</button>
        </div>
    );
};
