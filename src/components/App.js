import React, { Component } from 'react';
import update from "immutability-helper";
import Menu from './Menu';
import Nav from './Nav';
import WeatherContainer from './WeatherContainer';
import { toggleMenu, convertUNIXTime } from '../helpers';

import '../css/App.css';

const apiKey = require("../keys/api-key.json");

class App extends Component {

  state = {
    locInfo: {
      cityName: null,
      countryName: null,
      formattedAddress: null,
      lat: null,
      lon: null,
      provName: null,
      timezone: null
    },
    temperature: {
      apparentTemperature: null,
      dewPoint: null,
      humidity: null,
      pressure: null,
      temperature: null
    },
    sun: {
      sunrise: null,
      sunset: null
    },
    weather: {
      icon: null,
      ozone: null,
      precipIntensity: null,
      precipProbibility: null,
      precipType: null,
      pressure: null,
      summary: null,
      uvIndex: null,
      visibility: null
    },
    wind: {
      windBearing: null,
      windGust: null,
      windSpeed: null
    }
  };

  componentDidMount() {
    console.log("App Mounted..");
    this.getUserCoordinates();
    this.fetchWeatherDataAuto();
  }

  getUserCoordinates = () => {
    let options = { enableHighAccuracy: true };
    
    let success = (pos) => {
      let crd = pos.coords;
      let locInfo = { ...this.state.locInfo };
      locInfo = {
        lon: crd.longitude,
        lat: crd.latitude,
        timezone: null
      }

      this.setState({ locInfo }, () => {
        this.fetchGeoLocation(locInfo);
      });
    };

    let error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
      
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  fetchGeoLocation = (coords) => {
    let lat = coords.lat;
    let lon = coords.lon;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey.google_key}`)
      .then(response => response.json())
      // .then(response => console.log("Google Response: ", response));
      .then(response => this.setGeoState(response));
  }

  fetchWeatherDataAuto = () => {
    let lat = this.state.locInfo.lat;
    let lon = this.state.locInfo.lon;
    fetch(`/forecast/${apiKey.darkSky_key}/${lat},${lon}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response.latitude));
      .then(response => this.setWeatherState(response));
  }

  fetchWeatherDataManual = () => {
    let lat = this.state.locInfo.lat;
    let lon = this.state.locInfo.lon;
    fetch(`/forecast/${apiKey.darkSky_key}/${lat},${lon}`)
      .then(response => response.json())
      // .then(response => console.log("Weather Response: ", response))
      .then(response => this.setWeatherState(response));
  };

  setGeoState = responseData => {
    console.log("GeoStateFunc: ", responseData.results);
    let locInfo = { ...this.state.locInfo };
    locInfo = update(this.state.locInfo, 
      {$merge: {
        cityName: responseData.results[1].address_components[0].long_name,
        countryName: responseData.results[1].address_components[2].long_name,
        formattedAddress: responseData.results[1].formatted_address,
        provName: responseData.results[1].address_components[1].long_name,
      }
    })
    this.setState({ locInfo });
  }

  setWeatherState = responseData => {
    let locInfo = { ...this.state.locInfo };
    locInfo = update(this.state.locInfo,
      {$merge: {
        timezone: responseData.timezone
      }
    });

    let temperature = { ...this.state.temperature };
    temperature = {
      apparentTemperature : responseData.currently.apparentTemperature,
      dewPoint: responseData.currently.dewPoint,
      humidity: responseData.currently.humidity,
      pressure: responseData.currently.pressure,
      temperature: responseData.currently.temperature,
    };

    // let sun = { ...this.state.sun };
    // sun = {
    //   sunrise: responseData.sys.sunrise,
    //   sunset: responseData.sys.sunset
    // };

    let weather = { ...this.state.weather };
    weather = {
      icon: responseData.currently.icon,
      ozone: responseData.currently.ozone,
      precipIntensity: responseData.currently.precipIntensity,
      precipProbibility: responseData.currently.precipProbibility,
      precipType: responseData.currently.precipType,
      pressure: responseData.currently.pressure,
      summary: responseData.currently.summary,
      uvIndex: responseData.currently.uvIndex,
      visibility: responseData.currently.visibility
    };

    let wind = { ...this.state.wind };
    wind = {
      windBearing: responseData.currently.windBearing,
      windGust: responseData.currently.windGust,
      windSpeed: responseData.currently.windSpeed
    };

    this.setState({ locInfo, temperature, weather, wind });
  };

  render() {
    return (
      <div>
          <Nav toggleMenu={toggleMenu} />
          <div className="appContainer">
            <h2 className="cityName">{this.state.locInfo.formattedAddress}</h2>
            <WeatherContainer 
              fetchWeatherDataAuto={this.fetchWeatherDataAuto}
              temperature={this.state.temperature}
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
