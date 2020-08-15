import React, { useState } from 'react';
import Modal from 'react-modal';
import './SchedulesCard.css';
import { AddSchedules } from '../pages/AddSchedules/AddSchedules';

export const SchedulesCard = ({ schedule, day, time }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const modalCustomStyles = {
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '330px',
      width: '430px',
      borderRadius: '90px',
      border: 'none',
      padding: '30px',
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="schedulesCard" onClick={openModal}>
        <div className="contentContainer">
          {!schedule && <></>}
          {schedule && (
            <>
              <div>{schedule.title}</div>
              {/* <div>{schedule.teacher}</div> */}
              <div>{schedule.room}</div>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      >
        <AddSchedules
          schedule={schedule}
          day={day}
          time={time}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
};
