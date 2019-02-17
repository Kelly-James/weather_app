import React from 'react';

import '../css/ForecastHour.css';
import { buildGridColumn, convertTimestamp, handleClearGrid } from '../helpers';

class ForecastHour extends React.Component {

    componentDidMount() {
        console.log('Forecast Hourly Mounted..');
        this.handleBuildGridHour(this.props.weatherData);
    }

    componentWillReceiveProps(nextState) {
        if (this.props.weatherData !== nextState.weatherData) {
            handleClearGrid();
            this.handleBuildGridHour(nextState.weatherData);
        }
    }

    handleBuildGridHour = weatherData => {
        let hourlyWeatherData = weatherData.hourly.data;
        hourlyWeatherData.forEach((hour, i) => {
            let hours = 48;
            if(i < hours) {
                let forecastGrid = document.querySelector('.forecastGrid');
                let header = convertTimestamp(hour.time).substring(12, 20);
                forecastGrid.appendChild(buildGridColumn(i, hourlyWeatherData, header));
            }
        })
    }

    handleScrollLeft = () => {
        document.querySelector('.forecastGrid').scrollLeft += 770;
    }

    handleScrollRight = () => {
        document.querySelector('.forecastGrid').scrollLeft -= 770;
    }

    render() {
        return(
            <div className="forecastHour">
                <div className="summaryContainer">
                    <h4 className="forecastSummary">
                        {this.props.weatherData.hourly.summary}
                    </h4>
                    <div className="scrollButtonContainer">
                        <button className="scrollLeft scrollBtn" onClick={this.handleScrollRight}>Prev</button>
                        <button className="scrollRight scrollBtn" onClick={this.handleScrollLeft}>Next</button>
                    </div>
                </div>
                <div className="forecastGrid" onWheel={() => false} />
            </div>
        )
    }
}

export default ForecastHour;