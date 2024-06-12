import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const banner1 = require('../img/banner/1.png');
const banner2 = require('../img/banner/2.jpg');
const banner3 = require('../img/banner/3.jpg');
const banner4 = require('../img/banner/4.jpg');
const banner5 = require('../img/banner/5.png');

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
    <View style={styles.bannerContainer}>
      {banners.map((banner, index) => (
        <FastImage
          source={banner}
          style={[
            styles.bannerImage,
            index === currentBanner ? styles.visible : styles.hidden
          ]}
          key={index}
          resizeMode={FastImage.resizeMode.cover}
        />
      ))}
    </View>
  );
};


export default Banner;
