import React from 'react';
// import Sun from './Sun';
// import Temp from './Temp';
// import Weather from './Weather';
// import Wind from './Wind';

import '../css/WeatherContainer.css';
import '../css/weather-icons.css';
import '../css/weather-icons-wind.css';

class WeatherContainer extends React.Component {

  componentDidMount() {
    console.log('Weather Mounted');
    this.handleSetWindBearing();
    this.handleGetWeatherIcon();
  }

  handleSetWindBearing = () => {
    let className = `from-${this.props.weatherData.currently.windBearing}-deg`;
    let compass = document.querySelector('.wi-wind');
    compass.classList.add(className);
  }

  handleGetWeatherIcon = () => {
    let className = `wi-forecast-io-${this.props.weatherData.currently.icon}`;
    let weatherIcon = document.querySelector('.weatherIcon');
    weatherIcon.classList.add(className);
  }

  // Get high/low temp
  // Loop through hourly to find highest and lowest temp
  getTempVariants = () => {
    
  }

  render() {
    if(!this.props.weatherData) {
      return <h1>Loading Data...</h1>
    }
    return <div id="weatherFrame" className="frame">
        <div className="weatherHeaderContainer">
          <div className="weatherHeader">
            {/* <h2 className="cityName">{this.props.locInfo.formattedAddress}</h2> */}
            <h2 className="headerCityName">
              Current Weather for: Location Placeholder
            </h2>
          </div>
        </div>
        <div className="currentDetailsContainer">
          <div className="currentDetails">
            <div className="weatherGrid">
              <div className="windCell weatherWidget">
                <p className="cellText">
                  Wind: {this.props.weatherData.currently.windSpeed}
                </p>
                {/* <p className="cellText">Wind: 5 km/h</p> */}
                <i className="wi wi-wind" />
              </div>
              <div className="humidityCell weatherWidget">
                <p className="cellText">
                  Humidity: {this.props.weatherData.currently.humidity}
                </p>
              </div>
              <div className="precipitationCell weatherWidget">
                <p className="cellText">
                  PoP: {this.props.weatherData.currently.precipProbability}%
                </p>
              </div>
              <div className="uvCell weatherWidget">
                <p className="cellText">
                  UV Index: {this.props.weatherData.currently.uvIndex}
                </p>
              </div>
              <div className="pressureCell weatherWidget">
                <p className="cellText">
                  Pressure: {this.props.weatherData.currently.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="currentWeatherMainContainer">
          <div className="currentWeather">
            <p className="weatherSummary">
              {this.props.weatherData.currently.summary}
            </p>
            <p className="temperature">
              {this.props.weatherData.currently.temperature}&deg;
            </p>
            <i className="wi weatherIcon" />
            <p className="apparentTemp">
              Feels like {this.props.weatherData.currently.apparentTemperature}&deg;
            </p>
          </div>
        </div>
      </div>;
  }
}

export default WeatherContainer;