import React, { createContext, useState } from 'react';

export const HomepageContext = createContext();

export const HomepageProvider = ({ children }) => {
  const [saleNewsData, setSaleNewsData] = useState('Default Sale News');
  const [productGridData, setProductGridData] = useState([]);
  const [newsData, setNewsData] = useState('Default News');
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleAdminMode = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <HomepageContext.Provider value={{
      saleNewsData, setSaleNewsData,
      productGridData, setProductGridData,
      newsData, setNewsData,
      isAdmin, toggleAdminMode
    }}>
      {children}
    </HomepageContext.Provider>
  );
};
