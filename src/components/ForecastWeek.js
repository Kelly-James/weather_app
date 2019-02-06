import React from 'react';

import '../css/ForecastWeek.css';
import { sortDays } from '../helpers';

class ForecastWeek extends React.Component {

    componentDidMount() {
        this.handleBuildGrid();
    }

    handleBuildGrid = () => {
        let dateString = new Date();
        let dayInt = dateString.getDay();
        let shiftedDays = sortDays(dayInt);
        let forecastGrid = document.querySelector('.forecastWeekGrid');
        let columns = Array.from(document.querySelectorAll('.column'));
        columns.forEach((column, i) => {
            column.innerHTML = shiftedDays[i];
            forecastGrid.insertBefore(this.buildGridColumn(i), column[i + 1]);
        })
    }

    buildGridColumn = (i) => {
        let columnContainer = document.createElement('div');
        columnContainer.className = "columnContainer";

        let iconCell = document.createElement("div");
        iconCell.className = `wi forecastCell iconCell wi-forecast-io-${
            this.props.weatherData.daily.data[i + 1].icon
            }`;

        let highTempCell = document.createElement('div');
        highTempCell.className = "highTempCell forecastCell";
        highTempCell.innerHTML = this.props.weatherData.daily.data[
            i + 1
        ].temperatureHigh;

        let lowTempCell = document.createElement("div");
        lowTempCell.className = "lowTempCell forecastCell";
        lowTempCell.innerHTML = this.props.weatherData.daily.data[
          i + 1
        ].temperatureLow;

        let precipProbCell = document.createElement("div");
        precipProbCell.className = "precipProbCell forecastCell";
        precipProbCell.innerHTML = Math.round(this.props.weatherData.daily.data[
            i + 1
        ].precipProbability * 10) + `%`;

        let humidityCell = document.createElement('div');
        humidityCell.className = "humidityCell forecastCell";
        humidityCell.innerHTML = Math.round(this.props.weatherData.daily.data[
            i + 1
        ].humidity * 10) + `%`;
        
        let windSpeedCell = document.createElement('div');
        windSpeedCell.className = "windSpeedCell forecastCell";
        windSpeedCell.innerHTML = this.props.weatherData.daily.data[
            i + 1
        ].windSpeed;

        let windGustCell = document.createElement("div");
        windGustCell.className = "windGustCell forecastCell";
        windGustCell.innerHTML = this.props.weatherData.daily.data[
          i + 1
        ].windGust;
        
        let ozoneCell = document.createElement('div');
        ozoneCell.className = "ozoneCell forecastCell";
        ozoneCell.innerHTML = this.props.weatherData.daily.data[
            i + 1
        ].ozone;

        columnContainer.appendChild(iconCell);
        columnContainer.appendChild(highTempCell);
        columnContainer.appendChild(lowTempCell);
        columnContainer.appendChild(precipProbCell);
        columnContainer.appendChild(humidityCell);
        columnContainer.appendChild(windSpeedCell);
        columnContainer.appendChild(windGustCell);
        columnContainer.appendChild(ozoneCell);
        return columnContainer;
    }

    render() {
        return (
            <div className="forecastWeek">
                <div>
                    <h4 className="weekSummary">{this.props.weatherData.daily.summary}</h4>
                </div>
                <div className="forecastWeekGrid">
                    <div className="first forecastCell column" data-column="0"></div>
                    <div className="second forecastCell column" data-column="1"></div>
                    <div className="third forecastCell column" data-column="2"></div>
                    <div className="fourth forecastCell column" data-column="3"></div>
                    <div className="fifth forecastCell column" data-column="4"></div>
                    <div className="sixth forecastCell column" data-column="5"></div>
                    <div className="seventh forecastCell column" data-column="6"></div>
                </div>
            </div>
        )
    }
}

export default ForecastWeek;