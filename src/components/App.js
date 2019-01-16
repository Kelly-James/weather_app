import React, { Component } from 'react';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {

  state = {
    main: {
      humidity: null,
      pressure: null,
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
    let main = { ...this.state.main };
    main = {
      humidity: responseData.main.humidity,
      pressure: responseData.main.pressure,
      temp: responseData.main.temp,
      temp_max: responseData.main.temp_max,
      temp_min: responseData.main.temp_min
    };

    let sys = { ...this.state.sys };
    sys = { 
      sunrise: responseData.sys.sunrise,
      sunset: responseData.sys.sunset
    };

    let weather = { ...this.state.weather };
    weather = {
      description: responseData.weather[0].description,
      main: responseData.weather[0].main
    };

    let wind = { ...this.state.wind }
    wind = { 
      deg: responseData.wind.deg,
      speed: responseData.wind.speed
    };

    this.setState({ main, sys, weather, wind });
  }
  
  render() {
    return <div>
        <Nav fetchWeatherData={this.fetchWeatherData} />
        <Weather />
      </div>;
  }
}

export default App;
