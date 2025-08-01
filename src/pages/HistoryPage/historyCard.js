import React from "react";
import "./historyCard.css";

import React from 'react';

const HistoryCard = ({ item }) => {
  return (
    <div className="history-card">
      <p>{item}</p>
    </div>
  );
};

export default HistoryCard;