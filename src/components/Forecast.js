import React from 'react';
import ForecastWeek from './ForecastWeek';

import '../css/Forecast.css';

class Forecast extends React.Component {
    render() {
        return (
          <div className="forecast">
            <h2 className="forecastHeader">Forecast</h2>
            <div className="forecaastMenu">
              <button>Hourly</button>
              <button>7 Day</button>
              <button>36 Hour</button>
              <button>Weekend</button>
            </div>
            <div className="forecastGridContainer">
                <ForecastWeek weatherData={this.props.weatherData} />
                <div className="forecastLegend">
                    <div className="highTemp legendCell">highTemp</div>
                    <div className="lowTemp legendCell">lowTemp</div>
                    <div className="precipProb legendCell">precipProb</div>
                    <div className="humidity legendCell">humidity</div>
                    <div className="windSpeed legendCell">windSpeed</div>
                    <div className="windGust legendCell">windGust</div>
                    <div className="ozone legendCell">ozone</div>
                </div>
            </div>
          </div>
        );
    }
}

export default Forecast;