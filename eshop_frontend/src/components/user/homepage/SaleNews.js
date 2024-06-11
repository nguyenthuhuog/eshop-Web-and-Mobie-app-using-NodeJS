import React from 'react';
import { FaFire, FaTruck, FaStar } from 'react-icons/fa';
import '../../../css/homepage.css';

const SaleNews = () => {
  return (
    <div className="item">
      <section className="sale-news">
        <h2>Sale News</h2>
        <ul>
          <li><FaFire /> Up to 50% off on selected items!</li>
          <li><FaTruck /> Free shipping on orders over $100!</li>
          <li><FaStar /> New arrivals are in stock now!</li>
        </ul>
      </section>
    </div>
  );
};

export default SaleNews;
