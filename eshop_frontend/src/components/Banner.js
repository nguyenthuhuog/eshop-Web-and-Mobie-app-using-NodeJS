import React, { useEffect, useState } from 'react';
import banner1 from '../img/banner/1.png';
import banner2 from '../img/banner/2.jpg';
import banner3 from '../img/banner/3.jpg';
import banner4 from '../img/banner/4.jpg';
import banner5 from '../img/banner/5.png';
import '../css/homepage.css';

const Banner = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentBanner, banners.length]);

  return (
    <div className="banner">
      {banners.map((banner, index) => (
        <img
          src={banner}
          alt={`Banner ${index + 1}`}
          className={index === currentBanner ? 'visible' : 'hidden'}
          key={index}
        />
      ))}
    </div>
  );
};

export default Banner;
