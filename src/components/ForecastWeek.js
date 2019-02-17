import React from 'react';

import '../css/ForecastWeek.css';
import { buildGridColumn, handleClearGrid,sortDays } from '../helpers';

class ForecastWeek extends React.Component {
  componentDidMount() {
    console.log("Weekly Forecast Mounted..");
    this.handleBuildGridWeek(this.props.weatherData);
  }

  componentWillReceiveProps(nextState) {
      if (this.props.weatherData !== nextState.weatherData) {
        handleClearGrid();
        this.handleBuildGridWeek(nextState.weatherData);
      }
  }

  // Will most likely be moved to helpers.js
  handleBuildGridWeek = weatherData => {
    let dateString = new Date();
    let dayInt = dateString.getDay();
    let shiftedDays = sortDays(dayInt);
    // let columns = Array.from(document.querySelectorAll(".weekDay"));
    shiftedDays.forEach((day, i) => {
      let forecastGrid = document.querySelector('.forecastGrid');
      forecastGrid.appendChild(buildGridColumn(i, weatherData.daily.data, day));
    });
  };

  render() {
    return (
      <div className="forecastWeek">
        <div className="summaryContainer">
          <h4 className="forecastSummary">
            {this.props.weatherData.daily.summary}
          </h4>
        </div>
        {/* <div className="forecastLegend">
          <div className="highTemp legendCell">highTemp</div>
          <div className="lowTemp legendCell">lowTemp</div>
          <div className="precipProb legendCell">precipProb</div>
          <div className="humidity legendCell">humidity</div>
          <div className="windSpeed legendCell">windSpeed</div>
          <div className="windGust legendCell">windGust</div>
          <div className="ozone legendCell">ozone</div>
        </div> */}
        <div className="forecastGrid" />
          {/* <div className="day0 forecastCell weekDay" />
          <div className="day1 forecastCell weekDay" />
          <div className="day2 forecastCell weekDay" />
          <div className="day3 forecastCell weekDay" />
          <div className="day4 forecastCell weekDay" />
          <div className="day5 forecastCell weekDay" />
          <div className="day6 forecastCell weekDay" /> */}
      </div>
    );
  }
}

export default ForecastWeek;