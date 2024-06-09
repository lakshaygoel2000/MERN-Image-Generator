import React, { useState, useEffect } from 'react';
import Navbar from "../common/Navbar/navbar";
import "./historyPage.css";
import HistoryCard from "./historyCard";

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        setSearchHistory(data.searchHistory);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const newSearchHistory = [...searchHistory, searchTerm];
    setSearchHistory(newSearchHistory);
    updateDataJson(newSearchHistory);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    updateDataJson([]);
  };

  const updateDataJson = (newSearchHistory) => {
    fetch('data.json', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchHistory: newSearchHistory }),
    });
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