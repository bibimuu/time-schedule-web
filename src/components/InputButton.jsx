import React from 'react';
import './InputButton.css';

export const InputButton = (props) => {
  return (
    <input className="btn-push" type="submit" value={props.value} {...props} />
  );
};
