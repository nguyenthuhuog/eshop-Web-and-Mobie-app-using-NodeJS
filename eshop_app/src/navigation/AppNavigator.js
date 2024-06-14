// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/HomePage';
import Contact from '../screens/Contact';
import ComputerPage from '../screens/ComputerPage';
import KeyboardPage from '../screens/KeyboardPage';
import MousePage from '../screens/MousePage';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import ProductDetail from '../product/ProductDetail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ComputerPage" component={ComputerPage} />
        <Stack.Screen name="KeyboardPage" component={KeyboardPage} />
        <Stack.Screen name="MousePage" component={MousePage} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
