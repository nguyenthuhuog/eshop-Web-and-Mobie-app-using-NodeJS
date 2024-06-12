import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

// Import components
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

import Contact from './user/page/Contact';
import MousePage from './user/page/MousePage';
import KeyboardPage from './user/page/KeyboardPage';
import ComputerPage from './user/page/ComputerPage';
import HomePage from './user/homepage/HomePage';

import ProductDetail from '../product/ProductDetail';
import ProductGrid from '../product/ProductGrid'; 
import { ShopContextProvider } from '../product/ShopContextProvider';
// import Shop from './Shop';
import Cart from './user/cart/Cart'; 
import Checkout from './user/cart/Checkout';

const Stack = createStackNavigator();

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("http://your-api-url/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  return (
    <ShopContextProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Header openLoginModal={openLoginModal} openRegisterModal={openRegisterModal} />
          <View style={[styles.wrapper, isSidebarActive && styles.active]}>
            <Navbar toggleSidebar={toggleSidebar} />
            <View style={styles.main_container}>
              <Sidebar />
              <View style={styles.content}>
                <Stack.Navigator initialRouteName="HomePage">
                  <Stack.Screen name="Contact" component={Contact} />
                  <Stack.Screen name="Mouse" component={MousePage} />
                  <Stack.Screen name="Computer" component={ComputerPage} />
                  <Stack.Screen name="Keyboard" component={KeyboardPage} />
                  <Stack.Screen name="HomePage">
                    {props => <HomePage {...props} isSidebarActive={isSidebarActive} />}
                  </Stack.Screen>
                  <Stack.Screen name="Products" component={ProductGrid} />
                  <Stack.Screen name="Cart" component={Cart} />
                  <Stack.Screen name="Checkout" component={Checkout} />
                  <Stack.Screen name="ProductDetail" component={ProductDetail} />
                </Stack.Navigator>
              </View>
              <View> 
                {(typeof backendData.users === 'undefined') ? (
                  <Text>Loading...</Text>
                ) : (
                  backendData.users.map((user, i) => (
                    <Text key={i}>{user}</Text>
                  ))
                )}
              </View>
              <Footer />
            </View>
          </View>
          <LoginModal visible={isLoginModalOpen} onClose={closeLoginModal} />
          <RegisterModal visible={isRegisterModalOpen} onClose={closeRegisterModal} />
        </SafeAreaView>
      </NavigationContainer>
    </ShopContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
  },
  active: {
    // Add your active style here
  },
  main_container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
});

export default App;
