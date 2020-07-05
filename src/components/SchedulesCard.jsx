import React from 'react';
import '../pages/TimeSchedules/style.css';

export const ScheduleCard = (props) => {
  return (
    <div className="schedulesCard" onClick={props.addSchedule}>
      <div>{props.title}</div>
    </div>
  );
};
