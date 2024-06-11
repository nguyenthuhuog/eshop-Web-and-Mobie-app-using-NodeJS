import React from 'react';
import '../../../css/homepage.css';

const News = () => {
  return (
    <div className="item" id="news">
      <h2>Dont Forget!!!</h2>
      <ul>
        <li><i className="fas fa-envelope"></i> Sign up for our newsletter and get 10% off your first order!</li>
        <li><i className="fas fa-blog"></i> Check out our new blog post on the latest tech trends!</li>
        <li><i className="fas fa-share-alt"></i> Follow us on social media for exclusive deals and updates!</li>
      </ul>
    </div>
  );
};

export default News;
