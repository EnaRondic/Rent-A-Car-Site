import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from '../components/UI/CarItem';
import CarData from '../assets/data/carData';

const CarListing = () => {
  const [rating, setRating] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <Helmet title="Cars">
      <CommonSection title="All Cars" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i>Sort By
                </span>

                <select>
                  <option>Price</option>
                  <option value="Low">Low to High</option>
                  <option value="High">High to Low</option>
                </select>

                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                  <option value="All">All Types</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                </select>

                <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                  <option value="All">All Brands</option>
                  <option value="Toyota">Toyota</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes">Mercedes</option>
                </select>
              </div>
            </Col>

            {
              CarData.map(item => <CarItem item={item} key={item.id} />)
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
