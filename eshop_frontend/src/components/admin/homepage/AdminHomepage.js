//no use
import React, { useContext } from 'react';
import { HomepageProvider, HomepageContext } from './HomepageProvider';
import Banner from '../../Banner';
// import ProductGrid from '../product/AdminProductGrid';
import '../../../css/homepage.css';
// import ChatComponent from './ChatComponent';

const HomePageContent = () => {
  const { isAdmin, toggleAdminMode } = useContext(HomepageContext);

  return (
    <div className="main_container">
      <div className="container">
        <button onClick={toggleAdminMode}>
          {isAdmin ? 'Switch to Viewer Mode' : 'Switch to Admin Mode'}
        </button>
        <Banner />
        {/* <ChatComponent /> */}
        {/* <ProductGrid /> */}
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
