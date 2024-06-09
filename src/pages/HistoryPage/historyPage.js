import React, { useState, useEffect } from 'react';
import Navbar from "../common/Navbar/navbar";
import "./historyPage.css";
import HistoryCard from "./historyCard";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      const history = JSON.parse(storedHistory);
      console.log("History:", history); // Add a console log to check the data
      setSearchHistory(history.reverse()); // Reverse the history array
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  return (
    <div>
      <Navbar page="history" />
        {searchHistory.length > 0 && (
            <div className="history-clear-button">
            <button onClick={handleClearHistory}>Clear History</button>
          </div>
        )}
        
        <div className="history-main-container">
            {searchHistory.map((item, index) => (
            <HistoryCard key={index} item={item} />
            ))}
        </div>
    </div>
  );
};

export default HistoryPage;