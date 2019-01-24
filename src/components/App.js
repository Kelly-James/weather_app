import React, { Component } from 'react';
import update from "immutability-helper";
import Menu from './Menu';
import Nav from './Nav';
import WeatherContainer from './WeatherContainer';
import { toggleMenu, dissectGeoResponse } from '../helpers';

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
    weatherData: {}
  };

  componentDidMount() {
    console.log("App Mounted..");
    this.autoLoadData();
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
    fetch(`/forecast/${apiKey.darkSky_key}/${lat},${lon}`)
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
  setWeatherState = responseData => {
    let weatherData = { ...this.state.weatherData };
    weatherData = responseData;
    this.setState({ weatherData });
  };

  render() {
    return (
      <div>
        <Nav toggleMenu={toggleMenu} />
        <div className="appContainer">
          <h2 className="cityName">{this.state.locInfo.formattedAddress}</h2>
          <WeatherContainer weatherData={this.state.weatherData} />
          <Menu fetchGeoLocation={this.fetchGeoLocation} />
        </div>
      </div>
    );
  }
}

export default App;
