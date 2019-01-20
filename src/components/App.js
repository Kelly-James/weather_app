import React, { Component } from 'react';
import Menu from './Menu';
import Nav from './Nav';
import WeatherContainer from './WeatherContainer';
import '../css/App.css';

const apiKey = require("../keys/api-key.json");

class App extends Component {

  state = {
    locInfo: {
      lat: null,
      lon: null,
      name: null
    },
    temp: {
      humidity: null,
      pressure: null,
      temp: null,
      temp_max: null,
      temp_min: null
    },
    sun: {
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
      let locInfo = { ...this.state.locInfo };
      locInfo = {
        lon: crd.longitude,
        lat: crd.latitude,
        name: null
      }
      
      this.setState({ locInfo }, () => {
          this.fetchWeatherDataAuto()
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  fetchWeatherDataAuto = () => {
    let lat = this.state.locInfo.lat;
    let lon = this.state.locInfo.lon;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey.openWeather_key}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response));
      .then(response => this.spreadStateData(response));
  }

  fetchWeatherDataManual = cityId => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey.openWeather_key}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response))
      .then(response => this.spreadStateData(response));
  };

  spreadStateData = responseData => {
    let locInfo = { ...this.state.locInfo }
    locInfo = {
      lat: responseData.coord.lat,
      lon: responseData.coord.lon,
      name: responseData.name
    }

    let temp = { ...this.state.temp };
    temp = {
      humidity: responseData.main.humidity,
      pressure: responseData.main.pressure,
      temp: responseData.main.temp,
      temp_max: responseData.main.temp_max,
      temp_min: responseData.main.temp_min
    };

    let sun = { ...this.state.sun };
    sun = {
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

    this.setState({ locInfo, temp, sun, weather, wind });
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
    return (
      <div>
          <Nav toggleMenu={this.toggleMenu} />
          <div className="appContainer">
            <h2 className="cityName">{this.state.locInfo.name}</h2>
            <WeatherContainer 
              fetchWeatherDataAuto={this.fetchWeatherDataAuto}
              temp={this.state.temp}
              weather={this.state.weather}
              wind={this.state.wind} 
              sun={this.state.sun}/>
            <Menu fetchWeatherDataManual={this.fetchWeatherDataManual} />
          </div>
      </div>
    );
  }
}

export default App;
