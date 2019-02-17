import React from 'react';
import ForecastHour from './ForecastHour';
import ForecastWeek from './ForecastWeek';

import '../css/Forecast.css';

class Forecast extends React.Component {

  state = {
    forecast: {
      week: true,
      hour: false
    }
  }

  handleForecastSelect = event => {
    let forecast = { ...this.state.forecast };
    let selection = event.target.value;
    console.log('Selection: ', selection);
    switch(selection) {
      case 'week':
        forecast.week = true;
        forecast.hour = false;
        break;
      case 'hour':
        forecast.week = false;
        forecast.hour = true;
        break;
      default:
        console.error('Forecast Selection Broken');
    }
    this.setState({ forecast });
  }

  render() {
    let forecast;
    let tempLeg1;
    let tempLeg2;

    switch(true) {
      case this.state.forecast.week:
        forecast = <ForecastWeek weatherData={this.props.weatherData} />;
        tempLeg1 = <div className="temp1 legendCell">highTemp</div>
        tempLeg2 = <div className="temp2 legendCell">lowTemp</div>
        break;
      case this.state.forecast.hour:
        forecast = <ForecastHour weatherData={this.props.weatherData} />;
        tempLeg1 = <div className="temp1 legendCell">Temp</div>
        tempLeg2 = <div className="temp2 legendCell">ApprntTemp</div>
        break;
      default:
      console.error('Where is the forecast?');
    }

      return (
        <div className="forecast">
        <div className="forecastHeaderContainer">
          <h2 className="forecastHeader">Forecast</h2>
        </div>
          <div className="forecastMenu">
            <button className="forecastButton" value="week" onClick={this.handleForecastSelect}>7 Day</button>
            <button className="forecastButton" value="hour" onClick={this.handleForecastSelect}>48 Hour</button>
          </div>
          <div className="forecastGridContainer">
            {forecast}
            {/* Rewrite this becuase it is grooossse */}
            <div className="forecastLegend">
              {tempLeg1}
              {tempLeg2}
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