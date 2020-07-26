import React from 'react';

export const InputBox = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      ref={props.register}
      name={props.name}
    />
  );
};
