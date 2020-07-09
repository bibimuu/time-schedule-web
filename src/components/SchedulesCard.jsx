import React from 'react';
import '../pages/TimeSchedules/style.css';

export const ScheduleCard = (props) => {
  return (
    <div
      className="schedulesCard"
      onClick={() => {
        props.addSchedule(props.time, props.day);
      }}
    >
      <div>{props.title}</div>
    </div>
  );
};
