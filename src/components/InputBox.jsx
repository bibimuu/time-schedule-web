import React from 'react';
import './InputBox.css';

export const InputBox = ({
  color,
  placeholder,
  defaultValue,
  name,
  register,
  type,
  label,
  small_text_underline,
  smallInputBox,
}) => {
  return (
    <>
      <label htmlFor={name} style={{ color: color }}>
        {label}
      </label>
      <div className="inputContainer">
        <input
          type={type}
          ref={register}
          name={name}
          id={name}
          className={`${smallInputBox} inputBox`}
          style={{ color: color }}
          defaultValue={defaultValue || ''}
          placeholder={placeholder}
          autocomplete="off"
        />
      </div>
      <div
        className={`${small_text_underline} text_underline`}
        style={{ borderColor: color }}
      ></div>
    </>
  );
};
