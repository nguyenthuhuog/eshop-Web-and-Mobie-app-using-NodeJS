import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from './ShopContextProvider';


const ProductGridComponent = ({product}) => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useContext(ShopContext);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };
    
    const handleAddToCart = (e, product) => {
        e.stopPropagation(); // Stop the event from propagating to parent elements
        addToCart(product.productID);
    };

    return (
        <div className="product" key={product.productID} onClick={() => handleProductClick(product.productID)}>
            <h3>{product.productName}</h3>
            <img src={product.image_url} alt={`Image of ${product.productName}`} />
            <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button className="btn-addToCart" onClick={(e) => handleAddToCart(e, product)}>
                Add to cart {cartItems[product.productID] > 0 && <> ({cartItems[product.productID]})</>}
            </button>
        </div>
    )
}
export default ProductGridComponent;
