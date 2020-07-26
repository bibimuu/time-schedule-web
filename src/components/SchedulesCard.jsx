import React from 'react';
import '../pages/TimeSchedules/style.css';

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
      <div>
        {title} {classRoom} {teacher}
      </div>
    </div>
  );
};
