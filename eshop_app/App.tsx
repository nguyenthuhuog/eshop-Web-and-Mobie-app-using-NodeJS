// App.js
import React from 'react';
import { ShopContextProvider } from './src/context/ShopContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <ShopContextProvider>
      <AppNavigator />
    </ShopContextProvider>
  );
};

export default App;
