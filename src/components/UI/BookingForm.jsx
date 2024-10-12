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
            journeyDateTime: new Date(`${formData.journeyDate.toISOString().split('T')[0]}T${formData.journeyTime}`), // Combine date and time
        };

        const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
        storedReservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(storedReservations));

        setReservationDetails(newReservation);
        setShowModal(true);

        setFormData({
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

        setMyReservations(storedReservations);
    };

    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        placeholder='First Name' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        placeholder='Last Name' 
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
                <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder='Phone Number' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="text" 
                        name="fromAddress" 
                        value={formData.fromAddress} 
                        onChange={handleChange} 
                        placeholder='From Address' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
                    <input 
                        type="text" 
                        name="toAddress" 
                        value={formData.toAddress} 
                        onChange={handleChange} 
                        placeholder='To Address' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <input 
                        type="number" 
                        name="numOfPersons" 
                        value={formData.numOfPersons} 
                        onChange={handleChange} 
                        placeholder='Number of Persons' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
                    <input 
                        type="number" 
                        name="numOfLuggage" 
                        value={formData.numOfLuggage} 
                        onChange={handleChange} 
                        placeholder='Number of Luggage' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block me-4 mb-4'>
                    <DatePicker 
                        selected={formData.journeyDate} 
                        onChange={(date) => setFormData({ ...formData, journeyDate: date })} 
                        placeholderText='Journey Date' 
                        required 
                    />
                </FormGroup>
                <FormGroup className='booking__form d-inline-block ms-1 mb-4'>
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
