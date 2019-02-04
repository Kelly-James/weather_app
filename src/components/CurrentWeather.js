import React from 'react';
import '../css/CurrentWeather.css'

class CurrentWeather extends React.Component {
    render() {
        return (
          <div className="currentWeather">
            <div className="currentWeatherGrid">
              <div className="summaryCell">
                <p className="weatherSummary">
                  {this.props.currentWeather.summary}
                </p>
              </div>
              <div className="weatherIconCell">
                <i
                  className={`wi weatherIcon wi-forecast-io-${
                    this.props.currentWeather.icon
                  }`}
                />
              </div>
              <div className="tempCell">
                <p className="temperature">
                  {this.props.currentWeather.temperature}&deg;
                </p>
                <p className="apparentTemp tempVar">
                  Feels like{" "}
                  {this.props.currentWeather.apparentTemperature}&deg;
                </p>
              </div>
              <div className="tempVarCell">
                <ul className="tempList">
                  {/* <li className="apparentTemp tempVar">
                    Feels like{" "}
                    {this.props.currentWeather.apparentTemperature}&deg;
                  </li> */}
                  <li className="tempVariantHigh tempVar">
                    High:{" "}
                    {this.props.currentWeather.temperatureVariants.high}
                    &deg;
                  </li>
                  <li className="tempVariantLow tempVar">
                    Low:{" "}
                    {this.props.currentWeather.temperatureVariants.low}
                    &deg;
                  </li>
                </ul>
              </div>
              <div className="sunCell">
                <ul className="sunTime">
                  <li className="sunrise sun">Sunrise: 5:45 AM</li>
                  <li className="sunset sun">Sunset: 5:55 AM</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
}

export default CurrentWeather;
