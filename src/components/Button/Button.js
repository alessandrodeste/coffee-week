import React from 'react';
import './Button.css';

const Button = ({label, onClick = () => {}}) => (
 <input className="btn" type="button" onClick={onClick} value={label} />
);

export default Button;