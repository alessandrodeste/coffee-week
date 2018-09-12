import React from 'react';
import PairCard from '../PairCard/PairCard';
import './PairList.css';

const PairList = ({pairs = []}) => {
  return (
    <div className="pairList">
      {pairs.map(pair => (
        <PairCard
          giver={pair.giver}
          receiver={pair.receiver}
          key={pair.giver.guid}
        />
      ))}
    </div>
  );
};

export default PairList;
