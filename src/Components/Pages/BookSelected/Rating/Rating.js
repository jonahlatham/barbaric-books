import React from 'react';
import './Rating.css';

const Rating = () => {
  return (
    <div className="Rating-App">
      <div className="rating-summary-container">
        <strong>Sex & Nudity:</strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>Violence & Gore:</strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>Profanity:</strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>Alcohol/Drugs/Smoking:</strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>Frightening & Intense Scenes:</strong>
        <p>description</p>
      </div>
    </div>
  );
};

export default Rating;
