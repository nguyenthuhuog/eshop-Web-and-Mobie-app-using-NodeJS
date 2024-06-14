import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLaptop, faKeyboard, faMouse } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ComputerPage')}>
        <FontAwesomeIcon icon={faLaptop} style={styles.icon} />
        <Text style={styles.sidebarItem}>Computer & Laptop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('KeyboardPage')}>
        <FontAwesomeIcon icon={faKeyboard} style={styles.icon} />
        <Text style={styles.sidebarItem}>Keyboards</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MousePage')}>
        <FontAwesomeIcon icon={faMouse} style={styles.icon} />
        <Text style={styles.sidebarItem}>Mouses</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#629ad3',
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
    zIndex: 1000,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    color: '#fff',
    marginRight: 10,
  },
  sidebarItem: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Sidebar;
