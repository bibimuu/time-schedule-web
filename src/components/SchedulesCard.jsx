import React from 'react';
import './SchedulesCard.css';

export const ScheduleCard = ({
  time,
  day,
  title,
  addSchedule,
  classRoom,
  teacher,
}) => {
  return (
    <div
      className="schedulesCard"
      onClick={() => {
        addSchedule(time, day, classRoom);
      }}
    >
      <div className="contentContainer">
        <div>{title}</div>
        <div>{classRoom}</div>
      </div>
    </div>
  );
};
