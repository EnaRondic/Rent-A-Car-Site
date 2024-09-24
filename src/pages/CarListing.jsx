import React, { useState } from "react";
import StarRating from "./StarRating";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from '../components/UI/CarItem';
import CarData from '../assets/data/carData';
import carData from "../assets/data/carData";

const CarListing = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i class="ri-sort-asc"></i>Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="Low">Low to High</option>
                  <option value="High">High to Low</option>
                </select>
              </div>
            </Col>

            {
              carData.map(item => <CarItem item={item} key={item.id}/>)
            }
          </Row>
        </Container>
      </section>
      <div className="car-details">
        <h1>Car Model</h1>
        {/* Other car details */}
        <StarRating rating={rating} onRatingChange={handleRatingChange} />
        <p>Your rating: {rating}</p>
      </div>
    </Helmet>
  );
};

export default CarListing;
