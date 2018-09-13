import React from 'react';
import Button from '../Button/Button';
import './Toolbox.css';

const onPrint = () => {
  window.print();
}

const Toolbox = () => (
  <div className="toolbox">
    <Button value="Print" onClick={onPrint} />
  </div>
);

export default Toolbox;
