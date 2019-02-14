import React from 'react';

import '../css/ForecastHour.css';
import { buildGridColumn, convertTimestamp } from '../helpers';

class ForecastHour extends React.Component {

    componentDidMount() {
        console.log('Forecast Hourly Mounted..');
        this.handleBuildGridHour(this.props.weatherData.hourly.data);
    }

    componentWillReceiveProps(nextState) {
        if (this.props.weatherData !== nextState.weatherData) {
            this.handleBuildGridHour(nextState);
        }
    }

    handleBuildGridHour = data => {
        data.forEach((hour, i) => {
            let hours = 48;
            if(i < hours) {
                let forecastGrid = document.querySelector('.forecastHourGrid');
                let columnHeader = document.createElement('div');
                columnHeader.className = 'forecastCell';
                columnHeader.style.gridColumn = i + 1;
                columnHeader.innerHTML = convertTimestamp(hour.time).substring(12, 20);
                forecastGrid.appendChild(columnHeader);
                columnHeader.appendChild(buildGridColumn(i, data));
            }
        })
    }

    render() {
        return(
            <div className="forecastWeek">
                <div>
                    <h4 className="hourSummary">
                        {this.props.weatherData.hourly.summary}
                    </h4>
                </div>
                <div className="forecastHour">
                    <div className="forecastHourGrid" />
                </div>
            </div>
        )
    }
}

export default ForecastHour;