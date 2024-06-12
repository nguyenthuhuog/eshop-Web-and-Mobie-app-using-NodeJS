import React, { useContext } from 'react';
import { HomepageContext } from './HomepageContext';
import AddProductForm from './AddProductForm';

const ProductGrid = () => {
  const { productGridData, setProductGridData, isAdmin } = useContext(HomepageContext);

  const addProduct = (newProduct) => {
    setProductGridData([...productGridData, newProduct]);
  };

  return (
    <div className="product-grid">
      {isAdmin ? (
        <div>
          <AddProductForm addProduct={addProduct} />
          <ul>
            {productGridData.map((product) => (
              <li key={product.id}>
                <h3>{product.productName}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
                <img src={product.productImage} alt={product.productName} />
                <p>{product.description}</p>
                <p>Stock: {product.stock}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul>
          {productGridData.map((product) => (
            <li key={product.id}>
              <h3>{product.productName}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <img src={product.productImage} alt={product.productName} />
              <p>{product.description}</p>
              <p>Stock: {product.stock}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductGrid;
