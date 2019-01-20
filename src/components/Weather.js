import React from 'react';
import '../css/Weather.css'

class Weather extends React.Component {
    render() {
        return (
            <div className="weatherFrame">
                <h3>Weather Data: </h3>
                <p>Desc: {this.props.weather.description}</p>
                <p>Main: {this.props.weather.main}</p>
            </div>
        )
    }
}

export default Weather;
