import React from "react";
import { Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import '../../styles/car-item.css';

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price } = props.item;
  const navigate = useNavigate(); // Use useNavigate to get the navigation function

  const handleRentClick = () => {
    navigate(`/cars/${carName}`); // Navigate to the Rent page
  };

  const handleDetailsClick = () => {
    navigate(`/cars/${carName}`); // Navigate to the Details page
  };

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} className="w-100" alt={carName} />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">${price}.00<span>/ Day</span></h6>
          

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-car-line"></i>
              {model}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i>
              {automatic}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i>
              {speed}
            </span>
          </div>

          <button className="w-50 car__item-btn car__btn-rent" onClick={handleRentClick}>
            Rent
          </button>

          <button className="w-50 car__item-btn car__btn-details" onClick={handleDetailsClick}>
            Details
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
