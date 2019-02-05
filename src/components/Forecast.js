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
                <ForecastWeek daily={this.props.weatherData.daily} />
            </div>
          </div>
        );
    }
}

export default Forecast;