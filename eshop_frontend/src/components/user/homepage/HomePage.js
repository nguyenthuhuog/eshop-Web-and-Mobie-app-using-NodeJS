import React from 'react';
import Banner from '../../Banner';
import SaleNews from './SaleNews';
import ProductGrid from '../../product/ProductGrid';
import News from './News';
import '../../../css/homepage.css';


const HomePage = ({ isSidebarActive }) => {
  return (
    <div className="main_container">
      <div className="container">
        <Banner />
        <SaleNews /> 
        <ProductGrid />
        <News />
      </div>
    </div>
  );
};

export default HomePage;
