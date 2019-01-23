import React from "react";

import "../css/Menu.css";

class Menu extends React.Component {

  componentDidMount() {
  }

  handleFetchWeather = () => {
    let cityString = document.getElementById("locationSearch").value;
    console.log('City String: ', cityString);
    this.props.fetchGeoLocation(cityString);
    // this.props.fetchWeatherDataManual(cityString);
  }

  handleUserInput = () => {
    let inputField = document.getElementById("locationSearch");
    console.log('Input Element: ', inputField);
    inputField.addEventListener('change', () => {
      let input = inputField.value;
      console.log('Input: ', input);
      return input;
    })
  }

  render() {
    return <div className="menuContainer closed">
        <div className="menu">
          <input type="search" id="locationSearch" className="locationSearch" name="locationSearch" aria-label="Search for a location" />
          <button type="submit" onClick={this.handleFetchWeather}>
            Get Weather
          </button>
        </div>
      </div>;
  }
}

export default Menu;
