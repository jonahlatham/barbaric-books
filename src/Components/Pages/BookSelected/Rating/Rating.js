import React from 'react';
import './Rating.css';

const Rating = () => {
  return (
    <div className="Rating-App">
      <div className="rating-summary-container">
        <strong>
          Sex & Nudity: <i>PG</i>
        </strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>
          Violence & Gore: <i>PG-13</i>
        </strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>
          Profanity: <i>R</i>
        </strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>
          Alcohol/Drugs/Smoking: <i>PG-13</i>
        </strong>
        <p>description</p>
      </div>
      <div className="rating-summary-container">
        <strong>
          Frightening & Intense Scenes: <i>PG-13</i>
        </strong>
        <p>description</p>
      </div>
    </div>
  );
};

export default Rating;
