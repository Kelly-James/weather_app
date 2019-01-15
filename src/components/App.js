import React, { Component } from 'react';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {

  state = {
    main: {
      temp: null,
      temp_max: null,
      temp_min: null
    },
    sys: {
      sunrise: null,
      sunset: null
    },
    weather: {
      description: null,
      main: null
    },
    wind: {
      deg: null,
      speed: null
    }
  }
  
  componentDidMount() {
    console.log('App Mounted..');
  }
  
  fetchWeatherData = (cityId) => {
    const apiKey = require('../keys/api-key.json');
    // fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey.api_key}`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey.api_key}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response))
      .then(response => this.dissectData(response));
  }

  dissectData = (responseData) => {
    this.setState( { 
      main: { ...this.state.main, temp: responseData.main.temp },
      sys: { ...this.state.sys, sunrise: responseData.sys.sunrise }, 
      weather: { ...this.state.weather, description: responseData.weather[0].description },
      wind: { ...this.state.wind, deg: responseData.wind.deg }
    });
  }
  
  render() {
    return <div>
        <Nav fetchWeatherData={this.fetchWeatherData} />
        <Weather />
      </div>;
  }
}

export default App;
