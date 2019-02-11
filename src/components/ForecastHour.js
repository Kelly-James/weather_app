import React from 'react';

import '../css/ForecastHour.css';

class ForecastHour extends React.Component {

    componentDidMount() {
        console.log('Forecast Hourly Mounted..');
    }

    render() {
        return(
            <div className="forecastHour">
                <h2>ForecastHour!</h2>
            </div>
        )
    }
}

export default ForecastHour;