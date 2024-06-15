import React from 'react';
import ProductGrid from '../../product/ProductGrid';
import '../../../css/homepage.css';
import '../../../css/product.css';

const MousePage = () => {
    return (
    <div className="container">
        <div className="main">

            <div className ="item">
                <h2>Mouse</h2>
                <p>Computer mouse is a peripheral device used to control a cursor on a computer screen and perform operations on a graphical interface. 
                    Regular mice are compactly designed, have two, three or more buttons with a scroll wheel placed between the two buttons.
                </p>
            </div>
            <ProductGrid categoryName = "mouse"/>

        </div>
    </div>    
)};

export default MousePage;