import React, {useState} from 'react'
import StarRating from './StarRating'

const CarListing = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="car-details">
      <h1>Car Model</h1>
      {/* Other car details */}
      <StarRating rating={rating} onRatingChange={handleRatingChange} />
      <p>Your rating: {rating}</p>
    </div>
    )
};

export default CarListing;
