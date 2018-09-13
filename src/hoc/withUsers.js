import React from 'react';
import axios from 'axios';

export default function withUsers(WrappedComponent) {
  return class WrapperWithUsers extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        loading: true,
        error: false,
      };
    }

    componentDidMount() {
      this.refresh();
    }

    refresh = () => {
      this.setState(
        {
          loading: true,
        },
        () => {
          // load data
          axios
            .get(
              `https://hbc-frontend-challenge.hbccommon.private.hbc.com/coffee-week/users`,
            )
            .then(response => {
              this.saveData(response.data);
            })
            .catch(error => {
              this.saveError(error);
            });
        },
      );
    };

    saveError = error => {
      console.error(error);
      this.setState({
        loading: false,
        error,
      });
    };

    saveData = data => {
      this.setState({
        loading: false,
        data,
      });
    };

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          loading={this.state.loading}
          refresh={this.refresh}
          {...this.props}
        />
      );
    }
  };
}
