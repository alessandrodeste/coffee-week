import React, { Component } from 'react';
import Header from './components/Header/Header';
import PairListContainer from './containers/PairListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PairListContainer />
      </div>
    );
  }
}

export default App;
