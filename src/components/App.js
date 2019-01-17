import React, { Component } from 'react';
import Menu from './Menu';
import Nav from './Nav';
import Weather from './Weather';
import '../css/App.css';

class App extends Component {
  state = {
    userCoords: {
      lat: null,
      lon: null
    },
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
    },
    menuOpen: false
  };

  componentDidMount() {
    console.log("App Mounted..");
    this.getUserCoordinates();
  }

  
  getUserCoordinates = () => {
    let options = { enableHighAccuracy: true };
    let error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
  
    let success = (pos) => {
      let crd = pos.coords;
      let userCoords = { ...this.state.userCoords };
      userCoords = {
        lon: crd.longitude,
        lat: crd.latitude
      }
      this.setState({ userCoords });
  
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  fetchWeatherData = cityId => {
    const apiKey = require("../keys/api-key.json");
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey.api_key}`
    )
      // fetch(`http://api.openweathermap.org/data/2.5/weather?lat=9.74&lon=-82.85&APPID=${apiKey.api_key}`)
      // fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${apiKey.api_key}`)
      .then(response => response.json())
      .then(response => console.log("Weather Response: ", response))
      .then(response => this.dissectData(response));
  };

  dissectData = responseData => {
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

    let wind = { ...this.state.wind };
    wind = {
      deg: responseData.wind.deg,
      speed: responseData.wind.speed
    };

    this.setState({ main, sys, weather, wind });
  };

  toggleMenu = () => {
    const menu = document.querySelector(".menuContainer");
    if (!this.state.menuOpen) {
      this.setState({ menuOpen: true });
      menu.classList.remove("closed");
    } else {
      this.setState({ menuOpen: false });
      menu.classList.add("closed");
    }
  };

  render() {
    return <div>
        <Nav toggleMenu={this.toggleMenu} />
        <Weather />
        <Menu fetchWeatherData={this.fetchWeatherData} />
      </div>;
  }
}

export default App;
