import React, { Component } from 'react';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {
  
  componentDidMount() {
    console.log('App Mounted..');
  }
  
  fetchWeatherData(cityId) {
    const apiKey = require('../keys/api-key.json');
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey.api_key}`)
    .then(response => response.json())
    .then(response => console.log('Weather Response: ', response))
  }
  
  render() {
    return <div>
        <Nav fetchWeatherData={this.fetchWeatherData} />
        <Weather />
      </div>;
  }
}

export default App;
