import React, { Component } from 'react';
import logo from '../src/images/logo.png';


import Main from './containers/Main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="logo" src={logo} />
        </header>
        <Main />
      </div>
    );
  }
}

export default App;
