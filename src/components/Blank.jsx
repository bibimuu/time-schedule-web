import React from 'react';
import './Blank.css';

export const Blank = ({ children, addSchedule, time, day, classRoom }) => {
  return (
    <div
      className="blank"
      onClick={() => {
        addSchedule(time, day, classRoom);
      }}
    >
      {children}
    </div>
  );
};
