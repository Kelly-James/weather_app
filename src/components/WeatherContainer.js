import React from 'react';
import { convertTimestamp, getCardinalDirection } from '../helpers';

import '../css/WeatherContainer.css';
import '../css/weather-icons.css';
import '../css/weather-icons-wind.css';

class WeatherContainer extends React.Component {

  componentDidMount() {
    console.log('Weather Mounted');
  }

  render() {
    if(!this.props.weatherData) {
      return <h1>Loading Data...</h1>
    }
    return <div id="weatherFrame" className="frame">
        <div className="weatherHeaderContainer">
          <div className="weatherHeader">
            <h2 className="headerCityName">{this.props.locInfo.formattedAddress}</h2>
            {/* <h2 className="headerCityName">
              Current Weather for: Location Placeholder
            </h2> */}
            <h6 className="updatedAt">Last Updated: {convertTimestamp(this.props.weatherData.currently.time)}</h6>
          </div>
        </div>
        <div className="currentDetailsContainer">
          <div className="currentDetails">
            <div className="weatherBarGrid">
              <div className="windCell weatherWidget">
                <p className="cellText">
                  Wind: {this.props.weatherData.currently.windSpeed}
                </p>
                {/* <p className="cellText">Wind: 5 km/h</p> */}
                <i className={`wi wi-wind from-${this.props.weatherData.currently.windBearing}-deg`} />
                {/* <p className={`cardinalDirection ${getCardinalDirection(this.props.weatherData.currently.windBearing)}`}></p> */}
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
            <div className="currentWeatherGrid">
              <div className="summaryCell">
                <p className="weatherSummary">
                  {this.props.weatherData.currently.summary}
                </p>
              </div>
              <div className="weatherIconCell">
                <i className={`wi weatherIcon wi-forecast-io-${this.props.weatherData.currently.icon}`} />
              </div>
              <div className="tempCell">
                <p className="temperature">
                  {this.props.weatherData.currently.temperature}&deg;
                </p>
              </div>
              <div className="tempVarCell">
                <ul className="tempList">
                  <li className="apparentTemp">
                    Feels like{" "}
                    {this.props.weatherData.currently.apparentTemperature}&deg;
                  </li>
                  <li className="tempVariantHigh">High: {this.props.weatherData.currently.temperatureVariants.high}&deg;</li>
                  <li className="tempVariantLow">Low: {this.props.weatherData.currently.temperatureVariants.low}&deg;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default WeatherContainer;