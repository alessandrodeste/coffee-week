import React, {Component} from 'react';
import PairList from '../components/PairList/PairList';
import Toolbox from '../components/Toolbox/Toolbox';
import Loader from '../components/Loader/Loader';
import withUsers from '../hoc/withUsers';
import withPairsGenerator from '../hoc/withPairsGenerator';

class PairListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      enabledOnly: true,
    };
  }

  isEnable = filter => ['ny-engineering', 'dub-engineering'].includes(filter);

  getUserFilterId = user => `${user.location}-${user.department}`;

  filterPairs = pairs =>
    pairs.filter(
      pair =>
        (!this.state.enabledOnly ||
          this.isEnable(this.getUserFilterId(pair.giver))) &&
        (!this.state.filter ||
          this.getUserFilterId(pair.giver) === this.state.filter),
    );

  getFilterList = () => {
    const {combineLocationsDepartments, data} = this.props;

    const filters = combineLocationsDepartments(
      data.users,
      ({location, department}) => {
        return [`${location}-${department}`];
      },
    );

    return filters.filter(
      filter => !this.state.enabledOnly || this.isEnable(filter),
    );
  };

  onChangeFilter = event => {
    this.setState({filter: event.target.value});
  };

  onChangeEnabledOnly = event => {
    this.setState(state => ({
      enabledOnly: !state.enabledOnly,
      filter: !!state.enabledOnly ? state.filter : null,
    }));
  };

  render() {
    const {loading, generatePairs, data, error} = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div>
          Error Loading data. Please refresh the page. If the problem persist...
        </div>
      );
    }

    return (
      <React.Fragment>
        <Toolbox
          filters={this.getFilterList()}
          enabledOnly={this.state.enabledOnly}
          onChangeFilter={this.onChangeFilter}
          onChangeEnabledOnly={this.onChangeEnabledOnly}
        />
        <PairList pairs={this.filterPairs(generatePairs(data.users))} />
        {/* <PairList pairs={generatePairs(this.filterUsers(data.users))} /> */}
      </React.Fragment>
    );
  }
}

export default withUsers(withPairsGenerator(PairListContainer));
