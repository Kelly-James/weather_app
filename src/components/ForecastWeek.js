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
            let newCell = document.createElement('div');
            newCell.className = `wi iconCell wi-forecast-io-${
              this.props.weatherData.daily.data[i + 1].icon
            }`;
            forecastGrid.insertBefore(newCell, column[i + 1]);
        })
    }

    render() {
        return (
            <div className="forecastWeek">
                <div>
                    <h3 className="weekSummary">{this.props.weatherData.daily.summary}</h3>
                </div>
                <div className="forecastWeekGrid">
                    <div className="first cell column" data-column="0"></div>
                    <div className="second cell column" data-column="1"></div>
                    <div className="third cell column" data-column="2"></div>
                    <div className="fourth cell column" data-column="3"></div>
                    <div className="fifth cell column" data-column="4"></div>
                    <div className="sixth cell column" data-column="5"></div>
                    <div className="seventh cell column" data-column="6"></div>
                </div>
            </div>
        )
    }
}

export default ForecastWeek;