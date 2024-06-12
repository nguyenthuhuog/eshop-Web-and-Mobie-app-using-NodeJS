import React, { useContext } from 'react';
import { HomepageContext } from './HomepageContext';

const News = () => {
  const { newsData, setNewsData, isAdmin } = useContext(HomepageContext);

  return (
    <div className="news">
      {isAdmin ? (
        <textarea
          value={newsData}
          onChange={(e) => setNewsData(e.target.value)}
        />
      ) : (
        <p>{newsData}</p>
      )}
    </div>
  );
};

export default News;
