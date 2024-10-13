import React, { useEffect, useState } from "react";
import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import BookingForm from "../components/UI/BookingForm";
import Modal from "./Modal";
import { useParams } from "react-router-dom"; 
import Swal from 'sweetalert2';
import '../styles/rating.css';

const CarDetails = () => {
  const { slug } = useParams();
  const singleCarItem = carData.find((item) => item.carName === slug);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',  
    numOfPersons: '',
    numOfLuggage: '',
    journeyDate: null,  
    journeyTime: '',
  });

  const [myReservations, setMyReservations] = useState([]); 
  const [formError, setFormError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');

  const [averageRating, setAverageRating] = useState(singleCarItem.rating);
  const [totalRatings, setTotalRatings] = useState(singleCarItem.totalRatings || 0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    const filteredComments = storedComments.filter(comment => comment.carName === slug);
    setComments(filteredComments);
    updateRatingData(filteredComments);
  }, [singleCarItem]);

  const updateRatingData = (comments) => {
    const total = comments.length;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    const newAverage = total > 0 ? (sum / total).toFixed(1) : 0;

    setAverageRating(newAverage);
    setTotalRatings(total);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(formData).every(field => field)) {
      setFormError('All fields must be filled!');
      return;
    }

    const reservationData = { 
      ...formData, 
      carName: singleCarItem.carName, 
      imgUrl: singleCarItem.imgUrl,
      journeyDateTime: new Date(formData.journeyDate + ' ' + formData.journeyTime).toISOString()
    };
    
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    localStorage.setItem('reservations', JSON.stringify([...storedReservations, reservationData]));

    setReservationDetails(reservationData);
    setShowModal(true);
    setFormError('');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentText || rating === 0) {
      alert('Please provide a comment and rating.');
      return;
    }

    const newComment = {
      carName: singleCarItem.carName,
      text: commentText,
      rating,
      date: new Date().toLocaleString()
    };

    const updatedComments = [...comments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
    setCommentText('');
    setRating(0);

    updateRatingData(updatedComments);

    Swal.fire({
      title: 'Thank you!',
      text: 'Your comment has been submitted successfully.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleCommentDelete = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(updatedComments);
    updateRatingData(updatedComments); 

    Swal.fire({
      title: 'Deleted!',
      text: 'Your comment has been deleted.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
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
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className={index < averageRating ? "ri-star-fill" : "ri-star-line"} style={{ color: "#f9a826" }}></i>
                      ))}
                    </span>
                    ({totalRatings} ratings)
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

            <Col lg="5" className="mt-5">
              <div className="comments-section">
                <h5 className="mb-4 fw-bold">Leave a Comment</h5>
                <form onSubmit={handleCommentSubmit}>
                  <div>
                    <label>Rating:</label>
                    <div className="star-rating" style={{ display: 'flex', cursor: 'pointer' }}>
                      {[1, 2, 3, 4, 5].map((star, index) => (
                        <span key={index} onClick={() => handleStarClick(index)}>
                          {index < rating ? (
                            <i className="ri-star-fill" style={{ color: "#f9a826" }}></i>
                          ) : (
                            <i className="ri-star-line"></i>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <textarea 
                      className="comment-textarea" 
                      rows="4" 
                      placeholder="Write your comment..." 
                      value={commentText} 
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  <button className="submit-button" type="submit">Submit</button>
                </form>

                <h5 className="mt-5">User Comments</h5>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <div className="comment-rating">
                        <strong>Rating:</strong>
                        <div className="star-rating">
                          {[1, 2, 3, 4, 5].map((star, starIndex) => (
                            <span key={starIndex}>
                              {starIndex < comment.rating ? (
                                <i className="ri-star-fill" style={{ color: "#f9a826" }}></i>
                              ) : (
                                <i className="ri-star-line"></i>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                      <small className="comment-date">{comment.date}</small>
                      <button className="delete-button" onClick={() => handleCommentDelete(index)}>Delete</button>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
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
