import React, { useState } from 'react';
import '../../styles/booking-form.css';
import { Form, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../../pages/Modal';
import Swal from 'sweetalert2';

const BookingForm = ({ formData, setFormData, setMyReservations, carImage }) => {
    const [showModal, setShowModal] = useState(false);
    const [reservationDetails, setReservationDetails] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (formData.journeyDate) {
            const now = new Date();
            const journeyDateTime = new Date(formData.journeyDate);
            journeyDateTime.setHours(formData.journeyTime.split(':')[0], formData.journeyTime.split(':')[1]);

            const timeDifference = journeyDateTime - now;

            if (timeDifference <= 25 * 60 * 60 * 1000) {
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Error',
                    text: 'You cannot book a car less than 24 hours in advance. You must book at least 25 hours ahead.',
                });
                return;
            }
        }

        const newReservation = {
            ...formData,
            imgUrl: carImage,
            journeyDateTime: new Date(`${formData.journeyDate.toISOString().split('T')[0]}T${formData.journeyTime}`),
        };

        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        storedReservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(storedReservations));

        setReservationDetails(newReservation);
        setShowModal(true);

        setFormData({
            name: '',
            email: '',
            address: '',
            numOfPersons: '',
            numOfLuggage: '',
            journeyDate: null,
            journeyTime: '',
        });

        setMyReservations(storedReservations);
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder='Name' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder='Email' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        placeholder='Address' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <select 
                        name="numOfPersons" 
                        value={formData.numOfPersons} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select Number of People</option>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <select 
                        name="numOfLuggage" 
                        value={formData.numOfLuggage} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="" disabled>Select Number of Luggage</option>
                        {[0, 1, 2, 3, 4].map((num) => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <DatePicker 
                        selected={formData.journeyDate} 
                        onChange={(date) => setFormData({ ...formData, journeyDate: date })} 
                        placeholderText='Journey Date' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="time" 
                        name="journeyTime" 
                        value={formData.journeyTime} 
                        onChange={handleChange} 
                        placeholder='Journey Time' 
                        required 
                    />
                </FormGroup>
                <button type="submit" className='btn btn-primary'>Reserve Now</button>
            </Form>

            {showModal && (
                <Modal 
                    formData={reservationDetails} 
                    onClose={() => setShowModal(false)} 
                />
            )}
        </>
    );
};

export default BookingForm;
