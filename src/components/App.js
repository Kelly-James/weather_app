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
      timezone: null
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
        timezone: null
      }
      
      this.setState({ locInfo }, () => {
          this.fetchWeatherDataAuto()
          this.fetchGeoLocation(this.state.locInfo);
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  fetchGeoLocation = (coords) => {
    let lat = coords.lat;
    let lon = coords.lon;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey.google_key}`)
      // .then(response => response.json())
      .then(response => console.log("Google Response: ", response));
  }

  fetchWeatherDataAuto = () => {
    let lat = this.state.locInfo.lat;
    let lon = this.state.locInfo.lon;
    fetch(`/forecast/${apiKey.darkSky_key}/${lat},${lon}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response.latitude));
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
      lat: responseData.latitude,
      lon: responseData.longitude,
      timezone: responseData.timezone
    }

    // let temp = { ...this.state.temp };
    // temp = {
    //   humidity: responseData.main.humidity,
    //   pressure: responseData.main.pressure,
    //   temp: responseData.main.temp,
    //   temp_max: responseData.main.temp_max,
    //   temp_min: responseData.main.temp_min
    // };

    // let sun = { ...this.state.sun };
    // sun = {
    //   sunrise: responseData.sys.sunrise,
    //   sunset: responseData.sys.sunset
    // };

    // let weather = { ...this.state.weather };
    // weather = {
    //   description: responseData.weather[0].description,
    //   main: responseData.weather[0].main
    // };

    // let wind = { ...this.state.wind };
    // wind = {
    //   deg: responseData.wind.deg,
    //   speed: responseData.wind.speed
    // };

    // this.setState({ locInfo, temp, sun, weather, wind });
    this.setState({ locInfo });
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
