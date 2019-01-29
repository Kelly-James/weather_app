import React from 'react';
import CurrentDetails from './CurrentDetails';
import CurrentWeather from './CurrentWeather';
import WeatherHeader from './WeatherHeader';
import { convertTimestamp, getCardinalDirection, measurementConverter } from '../helpers';

import '../css/WeatherContainer.css';
import '../css/weather-icons.css';
import '../css/weather-icons-wind.css';

class WeatherContainer extends React.Component {
  componentDidMount() {
    console.log("Weather Mounted");
  }

  render() {
    if (!this.props.weatherData) {
      return <h1 className="loading">Loading Data...</h1>;
    }
    return <div id="weatherFrame" className="frame">
        <div className="weatherHeaderContainer">
        <WeatherHeader currentWeather={this.props.weatherData.currently} locInfo={this.props.locInfo} fetchGeoLocation={this.props.fetchGeoLocation}/>
          {/* <div className="weatherHeader">
            <h2 className="headerCityName">
              {this.props.locInfo.formattedAddress}
            </h2>
            <div className="searchContainer">
              <input type="search" id="locationSearch" className="locationSearch" name="locationSearch" aria-label="Search for a location" placeholder="Search for Location" />
              <button type="submit" className="searchButton" onClick={this.handleFetchWeather}>
                <i className="wi wi-alien" />
              </button>
            </div>
            <h6 className="updatedAt">Last Updated: {convertTimestamp(this.props.weatherData.currently.time)}</h6>
          </div> */}
        </div>
        <div className="currentDetailsContainer">
          <CurrentDetails currentWeather={this.props.weatherData.currently} userPrefs={this.props.userPrefs} />
        </div>
        <div className="currentWeatherMainContainer">
          <CurrentWeather currentWeather={this.props.weatherData.currently} />
        </div>
      </div>;
  }
}

export default WeatherContainer;