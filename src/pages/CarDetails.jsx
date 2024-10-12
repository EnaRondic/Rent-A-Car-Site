import React, { useEffect, useState } from "react";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import Modal from "./Modal";
import { useParams } from "react-router-dom"; 

const CarDetails = () => {
  const { slug } = useParams();
  const singleCarItem = carData.find((item) => item.carName === slug);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fromAddress: '',
    toAddress: '',
    numOfPersons: '',
    numOfLuggage: '',
    journeyDate: null,  
    journeyTime: '',
  });

  const [myReservations, setMyReservations] = useState([]); 
  const [formError, setFormError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(formData).every(field => field)) {
      setFormError('All fields must be filled!');
      return;
    }

    const reservationData = { 
      ...formData, 
      carName: singleCarItem.carName, 
      imgUrl: singleCarItem.imgUrl 
    };
    
    setMyReservations(prev => [...prev, reservationData]);

    setReservationDetails(reservationData);
    setShowModal(true);
    setFormError('');
  };

  return (
    <Helmet title={singleCarItem.carName}>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <img src={singleCarItem.imgUrl} className="w-100" alt={singleCarItem.carName} />
            </Col>
            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{singleCarItem.carName}</h2>
                <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${singleCarItem.price}.00 / Day
                  </h6>
                  <span className="d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                      <i className="ri-star-fill"></i>
                    </span>
                    ({singleCarItem.rating} ratings)
                  </span>
                </div>
              </div>

              <p className="section__description">{singleCarItem.description}</p>
              
              <div className="d-flex align-items-center" style={{ columnGap: "4rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-roadster-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.model}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-settings-2-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.automatic}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-timer-flash-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.speed}
                </span>
              </div>

              <div className="d-flex align-items-center" style={{ columnGap: "2.8rem" }}>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-map-pin-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.gps}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-wheelchair-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.seatType}
                </span>
                <span className="d-flex align-items-center gap-1 section__description">
                  <i className="ri-building-2-line" style={{ color: "#f9a826" }}></i>
                  {singleCarItem.brand}
                </span>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold">Booking Information</h5>
                <BookingForm 
                  onSubmit={handleFormSubmit} 
                  formData={formData} 
                  setFormData={setFormData} 
                  setMyReservations={setMyReservations} 
                  formError={formError} 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {showModal && (
        <Modal 
          reservation={reservationDetails} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </Helmet>
  );
};

export default CarDetails;