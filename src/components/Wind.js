import React from 'react';

import '../css/weather-icons-wind.css';
import '../css/Wind.css';

class Wind extends React.Component {

    componentWDidMount() {
        this.handleSetCompass();
    }

    handleSetCompass = () => {
        let className = `from-${this.props.wind.deg}-deg`;
        let compass = document.querySelector('.wi-wind');
        compass.classList.add(className);
    }

    render() {
        return <div className="windFrame">
            <h3>Wind Data: </h3>
            <p>Bearing: {this.props.wind.windBearing}</p>
            <p>Speed: {this.props.wind.windSpeed}</p>
          </div>;
    }
}

export default Wind;