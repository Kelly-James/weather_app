import React, { Component } from 'react';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Weather />
      </div>
    );
  }
}

export default App;
