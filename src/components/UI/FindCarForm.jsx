import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import "../../styles/find-car-form.css";
import { Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const FindCarForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const formatDates = () => {
    if (startDate && endDate) {
      const start = startDate.toLocaleDateString("sr-RS", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const end = endDate.toLocaleDateString("sr-RS", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return `${start}-${end}`;
    }
    return ''; 
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;

   
    if (start && !end) {
      setStartDate(start);
    } else if (start && end) {
      setStartDate(start);
      setEndDate(end);
      setModalOpen(false);
    }
  };

  return (
    <Form className="form">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        
        <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            type="text"
            value={formatDates()}
            placeholder="Pick-up - Return"
            readOnly
            onClick={() => setModalOpen(true)} 
            className="date-input" 
          />
        </FormGroup>

        <FormGroup className="select__group">
          <select>
            <option value="ac">AC Car</option>
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader toggle={() => setModalOpen(false)}>Izaberi datume</ModalHeader>
        <ModalBody>
          <DatePicker
            selected={startDate || endDate} 
            onChange={handleDateChange}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()} 
            placeholderText="Izaberi datum"
            dateFormat="dd.MM.yyyy"
            inline
          />
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Zatvori</button>
        </ModalFooter>
      </Modal>
    </Form>
  );
};

export default FindCarForm;
