import React from 'react';

import '../css/ForecastWeek.css';
import { sortDays } from '../helpers';

class ForecastWeek extends React.Component {
  componentDidMount() {
    console.log("Weekly Forecast Mounted..");
    this.handleBuildGrid(this.props);
  }

  componentWillReceiveProps(nextState) {
      if (this.props.weatherData !== nextState.weatherData) {
          this.handleBuildGrid(nextState);
      }
  }

  handleBuildGrid = (props) => {
    let dateString = new Date();
    let dayInt = dateString.getDay();
    let shiftedDays = sortDays(dayInt);
    let columns = Array.from(document.querySelectorAll(".weekDay"));
    columns.forEach((column, i) => {
      column.innerHTML = shiftedDays[i];
      column.appendChild(this.buildGridColumn(i, props));
    });
  };

  buildGridColumn = (i, props) => {
    let column = document.createElement("div");
    column.className = `column${i} forecastCell column`;

    let iconCell = document.createElement("div");
    iconCell.className = `wi forecastCell iconCell wi-forecast-io-${
      props.weatherData.daily.data[i + 1].icon
    }`;

    let highTempCell = document.createElement("div");
    highTempCell.className = "highTempCell forecastCell";
    highTempCell.innerHTML = Math.round(props.weatherData.daily.data[
      i + 1
    ].temperatureHigh);

    let lowTempCell = document.createElement("div");
    lowTempCell.className = "lowTempCell forecastCell";
    lowTempCell.innerHTML = Math.round(props.weatherData.daily.data[
      i + 1
    ].temperatureLow);

    let precipProbCell = document.createElement("div");
    precipProbCell.className = "precipProbCell forecastCell";
    precipProbCell.innerHTML =
      Math.round(
        props.weatherData.daily.data[i + 1].precipProbability * 10
      ) + `%`;

    let humidityCell = document.createElement("div");
    humidityCell.className = "humidityCell forecastCell";
    humidityCell.innerHTML =
      Math.round(props.weatherData.daily.data[i + 1].humidity * 10) + `%`;

    let windSpeedCell = document.createElement("div");
    windSpeedCell.className = "windSpeedCell forecastCell";
    windSpeedCell.innerHTML = Math.round(props.weatherData.daily.data[
      i + 1
    ].windSpeed);

    let windGustCell = document.createElement("div");
    windGustCell.className = "windGustCell forecastCell";
    windGustCell.innerHTML = Math.round(props.weatherData.daily.data[i + 1].windGust);

    let ozoneCell = document.createElement("div");
    ozoneCell.className = "ozoneCell forecastCell";
    ozoneCell.innerHTML = Math.round(props.weatherData.daily.data[i + 1].ozone);

    column.appendChild(iconCell);
    column.appendChild(highTempCell);
    column.appendChild(lowTempCell);
    column.appendChild(precipProbCell);
    column.appendChild(humidityCell);
    column.appendChild(windSpeedCell);
    column.appendChild(windGustCell);
    column.appendChild(ozoneCell);
    return column;
  };

  render() {
    return (
      <div className="forecastWeek">
        <div>
          <h4 className="weekSummary">
            {this.props.weatherData.daily.summary}
          </h4>
        </div>
        <div className="forecastWeekGrid">
          <div className="day0 forecastCell weekDay" />
          <div className="day1 forecastCell weekDay" />
          <div className="day2 forecastCell weekDay" />
          <div className="day3 forecastCell weekDay" />
          <div className="day4 forecastCell weekDay" />
          <div className="day5 forecastCell weekDay" />
          <div className="day6 forecastCell weekDay" />
        </div>
      </div>
    );
  }
}

export default ForecastWeek;