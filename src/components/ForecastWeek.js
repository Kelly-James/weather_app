import React from 'react';

import '../css/ForecastWeek.css';

class ForecastWeek extends React.Component {
    render() {
        return (
            <div className="forecastWeek">
                <div>
                    <h3 className="weekSummary">{this.props.daily.summary}</h3>
                </div>
                <div className="forecastWeekGrid">
                    <div className="monday cell">monday</div>
                    <div className="tuesday cell">tuesday</div>
                    <div className="wednesday cell">wednesday</div>
                    <div className="thursday cell">thursday</div>
                    <div className="friday cell">friday</div>
                    <div className="saturday cell">saturday</div>
                    <div className="sunday cell">sunday</div>
                </div>
            </div>
        )
    }
}

export default ForecastWeek;