import React, { useState } from 'react';
import Modal from 'react-modal';
import './SchedulesCard.css';
import { AddSchedules } from '../pages/TimeSchedules/AddSchedules';

export const Schedule = ({
  schedule,
  day,
  time
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const modalCustomStyles = {
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
    <>
      <div
        className="schedulesCard"
        onClick={openModal}
      >
        <div>
          {!schedule && <>登録なし</>}
          {schedule && <div>
            <div>{schedule.time}</div>
            <div>{schedule.title}</div>
            <div>{schedule.teacher}</div>
            <div>{schedule.room}</div>
          </div>
          }
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalCustomStyles}
        contentLabel="Example Modal"
      >
        <AddSchedules schedule={schedule} day={day} time={time} />
        <div>モーダルだよ</div>
      </Modal>
    </>
  );
};
