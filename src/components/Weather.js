import React from 'react';
import '../css/Weather.css'

class Weather extends React.Component {
    render() {
        return (
            <div className="weatherFrame">
                <h3>Weather Data: </h3>
                <p>Summary: {this.props.weather.summary}</p>
                <p>Icon: {this.props.weather.icon}</p>
            </div>
        )
    }
}

export default Weather;
