import React from 'react';
import CurrentDetails from './CurrentDetails';
import CurrentWeather from './CurrentWeather';
import Forecast from "./Forecast";
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
    return (
      <div id="weatherFrame" className="frame">
        <div className="weatherHeaderContainer container">
          <WeatherHeader
            currentWeather={this.props.weatherData.currently}
            locInfo={this.props.locInfo}
            fetchGeoLocation={this.props.fetchGeoLocation}
          />
        </div>
        <div className="currentDetailsContainer container">
          <CurrentDetails
            currentWeather={this.props.weatherData.currently}
            ui={this.props.ui}
          />
        </div>
        <div className="currentWeatherMainContainer container">
          <CurrentWeather weatherData={this.props.weatherData} />
        </div>
        <div className="forecastContainer container">
          <Forecast weatherData={this.props.weatherData}/>
        </div>
      </div>
    );
  }
}

export default WeatherContainer;