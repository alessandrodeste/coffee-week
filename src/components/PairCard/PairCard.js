import React from 'react';
import {stringToColour} from '../../helpers/utility';
import './PairCard.css';

const PairCard = ({giver, receiver}) => {
  const getFullName = ({first, last}) => {
    return `${first} ${last}`;
  };
  return (
    <div className="pairCard">
      <div className="giver">{getFullName(giver.name)}</div>
      <div className="receiver">{getFullName(receiver.name)}</div>
      <div
        className="group"
        style={{
          backgroundColor: stringToColour(giver.location + giver.department),
        }}
      />
    </div>
  );
};

export default PairCard;
