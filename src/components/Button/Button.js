import React from 'react';
import './Button.css';

const Button = ({onClick, value}) => (
  <span className="btn" onClick={onClick}>
    {value}
  </span>
);

export default Button;
