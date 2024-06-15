import React from 'react';
import ProductGrid from '../../product/ProductGrid';

import '../../../css/homepage.css';
import '../../../css/product.css';

const KeyboardPage = () => {
    return (
    <div className="container">
        <div className="main">

            <div className ="item">
                <h2>Keyboard</h2>
                <p>A keyboard is an input device for a computer, used to enter data and control computer functions. 
                    The keyboard includes a series of pressing keys, alphanumeric keys, special characters and function keys to perform tasks.
                </p>
            </div>
            <ProductGrid categoryName = "keyboard"/>
        </div>
    </div>    
)};

export default KeyboardPage;