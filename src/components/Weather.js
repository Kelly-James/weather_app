import React from 'react';
import '../css/Weather.css';
import '../css/weather-icons.css';

class Weather extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        fetch('http://api.openweathermap.org/data/2.5/forecast?id=3623064&APPID=d9d5e616fcb6c5f45453919819cd4fa0')
            .then((response) => response.json())
            .then((response => console.log('Weather Response: ', response)));
    }

    render() {
        return (
            <div>
                <div className="weatherFrame">The Weather App</div>
                <i className="wi wi-day-sunny"></i>
            </div>
        )
    }
}

export default Weather;