import React from 'react';
import './InputBox.css';

export const InputBox = (props) => {
  return (
    <>
      <label htmlFor={props.name} style={{ color: props.color }}>
        {props.label}
      </label>
      <div className="center">
        <input
          type={props.type}
          ref={props.register}
          name={props.name}
          id={props.name}
          className="inputBox"
          style={{ color: props.color }}
        />
      </div>
      <div
        className="text_underline"
        style={{ borderColor: props.color }}
      ></div>
    </>
  );
};
