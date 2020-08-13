import React, { useState } from 'react';
import Modal from 'react-modal';

import { AddSchedules } from '../pages/TimeSchedules/AddSchedules';
import './Blank.css';
import './ModalStyle.css';

export const Blank = ({ children, time, day, classRoom, userId, dayData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log('aaa');
  };

  return (
    <>
      <div
        className="blank"
        onClick={() => {
          openModal();
        }}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modalStyle"
        contentLabel="Example Modal"
      >
        <AddSchedules
          day={day}
          time={time}
          userId={userId}
          closeModal={closeModal}
          dayData={dayData}
        />
      </Modal>
    </>
  );
};
