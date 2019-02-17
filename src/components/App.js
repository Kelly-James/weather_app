import React, { Component } from 'react';
import Footer from './Footer';
import Menu from './Menu';
import Nav from './Nav';
import WeatherContainer from './WeatherContainer';
import {
  convertTimestamp,
  convertUnits,
  dissectGeoResponse,
  setUserPrefsAuto,
  tempVariants,
  toggleMenu,
  updateUserPrefs,
  setUserUI
} from "../helpers";

import '../css/App.css';

import response from '../data/response.json';

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
    ui: {
      units: {
        speed: null,
        temperature: null,
        amountLarge: null,
        amountSmall: null
      }
    },
    // weatherData: null,
    weatherData: response
  };

  componentDidMount() {
    console.log("App Mounted..");
    // this.autoLoadData();
  }

  // Get user location data ( longitude, latitude ) and set user location state object
  // Once state ( locInfo ) has been updated, fetch weather for users current location
  autoLoadData = () => {
    let options = { enableHighAccuracy: true };

    let error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    let success = pos => {
      let coords = pos.coords;
      // Fetch GeoLocation data
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
          coords.latitude
        },${coords.longitude}&key=${apiKey.google_key}`
      )
        .then(response => response.json())
        .then(response => {
          let locInfo = { ...this.state.locInfo };
          locInfo = {
            cityName: response.results[1].address_components[0].long_name,
            countryName: response.results[1].address_components[2].long_name,
            formattedAddress: response.results[1].formatted_address,
            lat: coords.latitude,
            lon: coords.longitude,
            provName: response.results[1].address_components[1].long_name
            
          };
          this.setState({ locInfo }, () => {
            this.fetchWeatherData();
          });
        });
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  // Fetch coordinates based on user input
  // Store response data in state
  fetchGeoLocation = locationString => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${
        apiKey.google_key
      }`
    )
      .then(response => response.json())
      .then(response => this.setGeoState(response));
  };

  // Fetch weather data
  // Store response data in state
  fetchWeatherData = () => {
    let lat = this.state.locInfo.lat;
    let lon = this.state.locInfo.lon;
    fetch(`/forecast/${apiKey.darkSky_key}/${lat},${lon}?units=auto`)
      .then(response => response.json())
      .then(response => this.setWeatherState(response));
  };

  // Set the Geo state
  // Make call for weather data based off user input
  setGeoState = responseData => {
    let geoObject = dissectGeoResponse(responseData);
    let locInfo = { ...this.state.locInfo };
    locInfo = {
      cityName: geoObject.city,
      countryName: geoObject.country,
      formattedAddress: responseData.results[0].formatted_address,
      lat: responseData.results[0].geometry.location.lat,
      lon: responseData.results[0].geometry.location.lng,
      provName: geoObject.province
    };
    this.setState({ locInfo }, () => {
      this.fetchWeatherData();
    });
  };

  // Set the weather state
  setWeatherState = response => {
    let weatherData = { ...this.state.weatherData };
    let responseTempVariants = tempVariants(response, convertTimestamp);
    weatherData = responseTempVariants;
    let ui = { ...this.state.ui };
    ui.units = setUserPrefsAuto(response);
    this.setState({ weatherData, ui }, () => {
      setUserUI(this.state.ui.units);
    });
  };

  handleConvertUnits = unit => {
    let weatherDataState = { ...this.state.weatherData };
    let requestedCurrentUnit = null;
    if(unit === "c" || unit === "f") {
      requestedCurrentUnit = this.state.ui.units.temperature;
    } else {
      requestedCurrentUnit = this.state.ui.units.speed;
    }
    let weatherData = convertUnits(unit, requestedCurrentUnit, weatherDataState);
    let ui = updateUserPrefs(unit, this.state.ui)
    this.setState({ weatherData, ui });
  }

  render() {
    return <div>
        <div className="navContainer">
          <Nav toggleMenu={toggleMenu} />
        </div>
        <div className="appContainer">
          <Menu handleConvertUnits={this.handleConvertUnits} weatherData={this.state.weatherData} ui={this.state.ui} />
          <WeatherContainer fetchGeoLocation={this.fetchGeoLocation} locInfo={this.state.locInfo} ui={this.state.ui} weatherData={this.state.weatherData} />
        </div>
        <div className="footerContainer">
          <Footer />
        </div>
      </div>;
  }
}

export default App;
