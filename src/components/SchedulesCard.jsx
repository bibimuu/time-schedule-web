import React, { useState } from 'react';
import Modal from 'react-modal';

import './SchedulesCard.css';
import { AddSchedules } from '../pages/TimeSchedules/AddSchedules';

export const ScheduleCard = ({
  time,
  day,
  title,
  classRoom,
  teacher,
  userId,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="schedulesCard"
      onClick={() => {
        openModal();
      }}
    >
      <div className="contentContainer">
        <div>{title}</div>
        <div>{classRoom}</div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <AddSchedules day={day} time={time} userId={userId} />
      </Modal>
    </div>
  );
};
