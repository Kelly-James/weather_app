import React from 'react';
import '../css/CurrentWeather.css'

import { convertTimestamp } from '../helpers';

class CurrentWeather extends React.Component {
    render() {
        return (
          <div className="currentWeather">
            <div className="currentWeatherGrid">
              <div className="summaryCell">
                <p className="weatherSummary">
                  {this.props.weatherData.currently.summary}
                </p>
              </div>
              <div className="weatherIconCell">
                <i
                  className={`wi weatherIcon wi-forecast-io-${
                    this.props.weatherData.currently.icon
                  }`}
                />
              </div>
              <div className="tempCell">
                <p className="temperature">
                  {this.props.weatherData.currently.temperature}&deg;
                </p>
                <p className="apparentTemp tempVar">
                  Feels like{" "}
                  {this.props.weatherData.currently.apparentTemperature}&deg;
                </p>
              </div>
              <div className="tempVarCell">
                <ul className="tempList">
                  <li className="tempVariantHigh tempVar">
                    High:{" "}
                    {this.props.weatherData.currently.temperatureVariants.high}
                    &deg;
                  </li>
                  <li className="tempVariantLow tempVar">
                    Low:{" "}
                    {this.props.weatherData.currently.temperatureVariants.low}
                    &deg;
                  </li>
                </ul>
              </div>
              <div className="sunCell">
                <ul className="sunTime">
                  <li className="sunrise sun">Sunrise: {convertTimestamp(this.props.weatherData.daily.data[0].sunriseTime).split(', ')[1]}</li>
                  <li className="sunset sun">Sunset: {convertTimestamp(this.props.weatherData.daily.data[0].sunsetTime).split(', ')[1]}</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
}

export default CurrentWeather;
