import React from 'react';
import {stringToColour} from '../../helpers/utilities';
import CoffeeBeans from '../../assets/coffee_beans.svg';
import './PairCard.css';

const PairCard = ({giver, receiver}) => {
  const getFullName = ({first, last}) => {
    return `${first} ${last}`;
  };
  return (
    <div className="pairCard" title={`${giver.location} - ${giver.department}`}>
      <div className="pairCard-giver">
        <div className="pairCard-motto">
          &ldquo;
          {giver.motto}
          &rdquo;
        </div>
        <div className="pairCard-info">
          <a href={`mailto:${giver.email}`}>{giver.email}</a> /{' '}
          <a href={`tel:${giver.phone}`}>{giver.phone}</a>
        </div>
        <div className="pairCard-name">{getFullName(giver.name)}</div>
      </div>
      <img
        src={CoffeeBeans}
        className="pairCard-image"
        alt="coffee bean"
        width="48"
      />
      <div className="pairCard-receiver">
        <div className="pairCard-name">{getFullName(receiver.name)}</div>
        <div className="pairCard-info">
          <a href={`mailto:${receiver.email}`}>{receiver.email}</a> /{' '}
          <a href={`tel:${receiver.phone}`}>{receiver.phone}</a>
        </div>
        <div className="pairCard-motto">
          &ldquo;
          {receiver.motto}
          &rdquo;
        </div>
      </div>
      <div
        className="pairCard-group"
        title={`${giver.location} - ${giver.department}`}
        style={{
          backgroundColor: stringToColour(giver.location + giver.department),
        }}
      />
    </div>
  );
};

export default PairCard;
