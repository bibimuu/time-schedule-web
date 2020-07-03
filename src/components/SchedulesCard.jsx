import React from "react";
import "../pages/TimeSchedules/style.css";

export const ScheduleCard = (props) => {
  return (
    <div className="schedulesCard">
      <div>{props.children}</div>
    </div>
  );
};
