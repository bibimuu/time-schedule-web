import React from 'react';

export const InputBox = (props) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      ref={props.register}
      name={props.name}
    />
  );
};
