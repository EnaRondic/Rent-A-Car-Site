import React, { useState } from 'react';
import "../styles/star.css"

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(null);
  };

  const handleClick = (index) => {
    onRatingChange(index);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`star ${index < (hoveredStar !== null ? hoveredStar : rating) ? 'filled' : ''}`}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
