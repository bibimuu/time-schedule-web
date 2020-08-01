import React from 'react';
import './Error.css';

export const Error = ({ children }) => {
  return <span className="errorMessage">{children}</span>;
};
