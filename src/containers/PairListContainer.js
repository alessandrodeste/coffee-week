import React, { Component } from 'react';
import PairList from '../components/PairList/PairList';
import Toolbox from '../components/Toolbox/Toolbox';
import Loader from '../components/Loader/Loader';
import withUsers from '../hoc/withUsers';
import withPairsGenerator from '../hoc/withPairsGenerator';

class PairListContainer extends Component {
  render() {
    const { loading, generatePairs, data } = this.props;

    if (loading) {
      return (
        <Loader />
      );
    }
    return (
      <React.Fragment>
        <Toolbox />
        <PairList pairs={generatePairs(data.users)} />
      </React.Fragment>
    );
  }
}

export default withUsers(withPairsGenerator(PairListContainer));
