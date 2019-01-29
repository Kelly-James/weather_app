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
              </div>
              <div className="tempVarCell">
                <ul className="tempList">
                  <li className="apparentTemp">
                    Feels like{" "}
                    {this.props.currentWeather.apparentTemperature}&deg;
                  </li>
                  <li className="tempVariantHigh">
                    High:{" "}
                    {this.props.currentWeather.temperatureVariants.high}
                    &deg;
                  </li>
                  <li className="tempVariantLow">
                    Low:{" "}
                    {this.props.currentWeather.temperatureVariants.low}
                    &deg;
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )
    }
}

export default CurrentWeather;
