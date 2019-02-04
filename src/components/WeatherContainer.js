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
        </div>
        <div className="currentDetailsContainer">
          <CurrentDetails currentWeather={this.props.weatherData.currently} userPrefs={this.props.userPrefs} />
        </div>
        <div className="currentWeatherMainContainer">
          <CurrentWeather weatherData={this.props.weatherData} />
        </div>
      </div>;
  }
}

export default WeatherContainer;