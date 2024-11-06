import React, { useState } from "react";
import { Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom"; 
import '../../styles/car-item.css';

const CarItem = (props) => {
  const { imgUrl, model, carName, automatic, speed, price, brand, year, fuelType, seatType, gps, description } = props.item;
  const navigate = useNavigate(); 
  const [modalOpen, setModalOpen] = useState(false); 

  const handleRentClick = () => {
    navigate(`/cars/${carName}`); 
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
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

          
          <button className="w-50 car__item-btn car__btn-details" onClick={toggleModal}>
            Details
          </button>
        </div>
      </div>

      {/* Modal for details */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{carName} Details</ModalHeader>
        <ModalBody>
          <img src={imgUrl} alt={carName} className="w-100 mb-3" />
          <h5>Brand: {brand}</h5>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Fuel Type:</strong> {fuelType}</p>
          <p><strong>Price:</strong> ${price}/day</p>
          <p><strong>Speed:</strong> {speed}</p>
          <p><strong>Automatic:</strong> {automatic}</p>
          <p><strong>GPS:</strong> {gps}</p>
          <p><strong>Seats:</strong> {seatType}</p>
          <p>{description}</p>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={toggleModal}>Close</button>
          <button className="btn btn-primary" onClick={handleRentClick}>Rent</button>
        </ModalFooter>
      </Modal>
    </Col>
  );
};

export default CarItem;
