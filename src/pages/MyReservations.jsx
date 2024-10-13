import React, { useEffect, useState } from 'react';
import '../styles/reservation.css';
import Swal from 'sweetalert2';

const MyReservations = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        setReservations(storedReservations);
    }, []);

    const isCancellationAllowed = (journeyDateTime) => {
        const now = new Date();
        const reservationDateTime = new Date(journeyDateTime);
        const localReservationDateTime = new Date(reservationDateTime.getTime() - reservationDateTime.getTimezoneOffset() * 60000);
        
        const timeDifference = localReservationDateTime - now;
        return timeDifference > 48 * 60 * 60 * 1000; 
    };

    const handleCancel = (index) => {
        const reservation = reservations[index];
        if (isCancellationAllowed(reservation.journeyDateTime)) {
            Swal.fire({
                title: 'Are you sure?',
                text: "Do you want to cancel this reservation?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, cancel it!',
                cancelButtonText: 'No, keep it'
            }).then((result) => {
                if (result.isConfirmed) {
                    const updatedReservations = reservations.filter((_, i) => i !== index);
                    setReservations(updatedReservations);
                    localStorage.setItem('reservations', JSON.stringify(updatedReservations));
                    Swal.fire('Deleted!', 'Your reservation has been successfully deleted.', 'success');
                }
            });
        } else {
            Swal.fire({
                title: 'Cancellation not allowed',
                text: 'Due to company policy, you cannot cancel this reservation. Please contact the owner.',
                icon: 'error'
            });
        }
    };

    return (
        <div className="reservation-container">
            <h2 className="title">My Reservations</h2>
            {reservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                reservations.map((reservation, index) => (
                    <div className="reservation-card" key={index}>
                       
                        <img src={reservation.imgUrl} alt={reservation.carName} className="reservation-image" title={reservation.carName} />
                        <div className="reservation-info">
                            <h3 className="reservation-title">{reservation.carName}</h3>
                            <div className="reservation-details-container">
                                <div className="details-column">
                                    <p>Name: {reservation.firstName} {reservation.lastName}</p>
                                    <p>Email: {reservation.email}</p>
                                    <p>Phone: {reservation.phone}</p>
                                </div>
                                <div className="details-column">
                                    <p>From: {reservation.fromAddress}</p>
                                    <p>To: {reservation.toAddress}</p>
                                    <p>Number of Persons: {reservation.numOfPersons}</p>
                                    <p>Number of Luggage: {reservation.numOfLuggage}</p>
                                    <p>Date: {new Date(reservation.journeyDateTime).toLocaleString()}</p>
                                </div>
                            </div>
                            <button className="cancel-button" onClick={() => handleCancel(index)}>Cancel</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyReservations;
