import React from 'react';
import '../css/CurrentDetails.css';

import { getCardinalDirection } from '../helpers';

class CurrentDetails extends React.Component {
    render() {
        return (
            <div className="currentDetails">
                <div className="weatherBarGrid">
                    <div className="windCell weatherWidget">
                        <p className="cellText measurement">
                            Wind: {Math.round(this.props.currentWeather.windSpeed)} {this.props.userPrefs.units.speed}
                        </p>
                        <i className={`wi wi-wind from-${this.props.currentWeather.windBearing}-deg`} />
                        <p className="cardinalDirection cellText">
                            {getCardinalDirection(
                                this.props.currentWeather.windBearing
                            )}
                        </p>
                    </div>
                    <div className="humidityCell weatherWidget">
                        <i className="wi wi-humidity" />
                        <p className="cellText">
                            Humidity: {this.props.currentWeather.humidity}
                        </p>
                    </div>
                    <div className="precipitationCell weatherWidget">
                        <i className="wi wi-raindrops" />
                        <p className="cellText">
                            PoP: {this.props.currentWeather.precipProbability}%
                </p>
                    </div>
                    <div className="uvCell weatherWidget">
                        <p className="cellText">
                            UV Index: {this.props.currentWeather.uvIndex}
                        </p>
                    </div>
                    <div className="pressureCell weatherWidget">
                        <i className="wi wi-barometer" />
                        <p className="cellText">
                            Pressure: {Math.round(this.props.currentWeather.pressure)} hPa
                </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CurrentDetails;