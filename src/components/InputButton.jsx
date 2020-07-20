import React from 'react';

export const InputButton = (props) => {
  return <input type="submit" value={props.value} {...props} />;
};
