import React from 'react';
import './Button.css';

const Button = (props) => (
  <input className="btn" type="button" {...props} />
);

export default Button;
