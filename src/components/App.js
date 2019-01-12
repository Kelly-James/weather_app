import React, { Component } from 'react';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {
  
  componentDidMount() {
    const apiKey = require('../keys/api-key.json');
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=3623064&APPID=${apiKey.api_key}`)
      .then(response => response.json())
      .then(response => console.log('Weather Response: ', response))
  }
  
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
