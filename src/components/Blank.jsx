import React from 'react';
import './Blank.css';

export const Blank = ({ children, addSchedule, time, day }) => {
  return (
    <div className="blank" onClick={() => addSchedule(time, day)}>
      {children}
    </div>
  );
};
