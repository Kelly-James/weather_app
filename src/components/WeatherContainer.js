import React from 'react';
import Sun from './Sun';
import Temp from './Temp';
import Weather from './Weather';
import Wind from './Wind';

import '../css/WeatherContainer.css';
import '../css/weather-icons.css';

class WeatherContainer extends React.Component {

    componentDidMount() {
        console.log('Weather Mounted');
    }

    render() {
        return <div>
            <div className="frame">
              <div className="weatherGrid">
                <div className="gridCell1 weatherWidget">
                  <Wind wind={this.props.wind} />
                </div>
                {/* <i className="wi wi-day-sunny" /> */}
                <div className="gridCell2 weatherWidget">
                  <Weather weather={this.props.weather} />
                </div>
                <div className="gridCell3 weatherWidget">
                  <Temp temp={this.props.temp} />
                </div>
                <div className="gridCell4 weatherWidget">
                  <Sun sun={this.props.sun} />
                </div>
              </div>
            </div>
          </div>;
    }
}

export default WeatherContainer;