import React from 'react';

import '../css/WeatherHeader.css';

class WeatherHeader extends React.Component {

    handleFetchWeather = () => {
        let cityString = document.getElementById("locationSearch").value;
        if(cityString) {
            this.props.fetchGeoLocation(cityString);
        }
    };

    handleUserInput = () => {
        let inputField = document.getElementById("locationSearch");
        inputField.addEventListener("change", () => {
            let input = inputField.value;
            return input;
        });
    };

    render() {
        return (
            <div className="weatherHeader">
                <h2 className="headerCityName">
                    {this.props.locInfo.formattedAddress}
                </h2>
                <div className="searchContainer">
                    <input type="search" id="locationSearch" className="locationSearch" name="locationSearch" aria-label="Search for a location" placeholder="Search for Location" />
                    <button type="submit" className="searchButton" onClick={this.handleFetchWeather}>
                        <i className="wi wi-alien" />
                    </button>
                </div>
                {/* <h6 className="updatedAt">Last Updated: {convertTimestamp(this.props.weatherData.currently.time)}</h6> */}
            </div>
        )
    }
}

export default WeatherHeader;