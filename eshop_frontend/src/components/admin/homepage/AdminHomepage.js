import React, { useContext } from 'react';
import { HomepageProvider, HomepageContext } from './HomepageContext';
import Banner from '../../user/Banner';
import SaleNews from './AdminSaleNews';
import ProductGrid from '../../product/AdminProductGrid';
import News from './AdminNews';
import '../../../css/homepage.css';
import ChatComponent from './ChatComponent';

const HomePageContent = () => {
  const { isAdmin, toggleAdminMode } = useContext(HomepageContext);

  return (
    <div className="main_container">
      <div className="container">
        <button onClick={toggleAdminMode}>
          {isAdmin ? 'Switch to Viewer Mode' : 'Switch to Admin Mode'}
        </button>
        <Banner />
        <SaleNews />
        <ChatComponent />
        <ProductGrid />
        <News />
      </div>
    </div>
  );
};

const HomePage = ({ isSidebarActive }) => {
  return (
    <HomepageProvider>
      <HomePageContent />
    </HomepageProvider>
  );
};

export default HomePage;
