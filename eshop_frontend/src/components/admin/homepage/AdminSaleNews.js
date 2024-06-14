import React, { useContext } from 'react';
import { HomepageContext } from './HomepageProvider';

const SaleNews = () => {
  const { saleNewsData, setSaleNewsData, isAdmin } = useContext(HomepageContext);

  return (
    <div className="sale-news">
      {isAdmin ? (
        <textarea
          value={saleNewsData}
          onChange={(e) => setSaleNewsData(e.target.value)}
        />
      ) : (
        <p>{saleNewsData}</p>
      )}
    </div>
  );
};

export default SaleNews;
