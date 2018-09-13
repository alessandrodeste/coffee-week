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

  getUserFilter = user => `${user.location}-${user.department}`;

  filterUsers = users =>
    users.filter(
      user =>
        (!this.state.enabledOnly || this.isEnable(this.getUserFilter(user))) &&
        (!this.state.filter || this.getUserFilter(user) === this.state.filter),
    );

  filterEnableFilters = filters =>
    filters.filter(filter => !this.state.enabledOnly || this.isEnable(filter));

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
    const {
      loading,
      generatePairs,
      combineLocationsDepartments,
      data,
      error,
    } = this.props;

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

    const filters = combineLocationsDepartments(
      data.users,
      ({location, department}) => {
        return [`${location}-${department}`];
      },
    );

    return (
      <React.Fragment>
        <Toolbox
          filters={this.filterEnableFilters(filters)}
          enabledOnly={this.state.enabledOnly}
          onChangeFilter={this.onChangeFilter}
          onChangeEnabledOnly={this.onChangeEnabledOnly}
        />
        <PairList pairs={generatePairs(this.filterUsers(data.users))} />
      </React.Fragment>
    );
  }
}

export default withUsers(withPairsGenerator(PairListContainer));
