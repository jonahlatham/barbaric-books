import React from 'react';
import './BookSelected.css';
import Summary from './Summary/Summary';
import Rating from './Rating/Rating';
import Comments from './Comments/Comments';

const BookSelected = () => {
  return (
    <div className="BookSelected-App">
      <Summary />
      <Rating />
      <Comments />
      {/* <div>Related Books</div> */}
    </div>
  );
};

export default BookSelected;
