// components/Banner.js
import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import banner1 from '../img/banner/1.png';
import banner2 from '../img/banner/2.jpg';
import banner3 from '../img/banner/3.jpg';
import banner4 from '../img/banner/4.jpg';
import banner5 from '../img/banner/5.png';

const Banner = () => {
  const banners = [banner1, banner2, banner3, banner4, banner5];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentBanner]);

  return (
    <View style={styles.banner}>
      {banners.map((banner, index) => (
        <Image
          source={banner}
          style={[styles.image, index === currentBanner ? styles.visible : styles.hidden]}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
});

export default Banner;
