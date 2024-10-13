import React from 'react';
import '../styles/modal.css';

const Modal = ({ formData, onClose }) => {
  if (!formData) {
    return null; 
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="confirmation-title">Reservation Confirmed!</h2>
        <div className="confirmation-message">
          <p className="confirmation-details"><strong>Name:</strong> {formData.name}</p>
          <p className="confirmation-details"><strong>Email:</strong> {formData.email}</p>
          <p className="confirmation-details"><strong>Address:</strong> {formData.address}</p>
          <p className="confirmation-details"><strong>Number of Persons:</strong> {formData.numOfPersons}</p>
          <p className="confirmation-details"><strong>Number of Luggage:</strong> {formData.numOfLuggage}</p>
          <p className="confirmation-details"><strong>Journey Date:</strong> {formData.journeyDate ? formData.journeyDate.toLocaleDateString() : ''}</p>
          <p className="confirmation-details"><strong>Journey Time:</strong> {formData.journeyTime}</p>
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
