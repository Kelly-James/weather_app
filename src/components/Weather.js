import React from 'react';
import '../css/Weather.css';
import '../css/weather-icons.css';

class Weather extends React.Component {
    render() {
        return (
            <div>
                <div className="weatherFrame"></div>
                <i className="wi wi-day-sunny"></i>
            </div>
        )
    }
}

export default Weather;