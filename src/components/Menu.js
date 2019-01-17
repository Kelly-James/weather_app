import React from "react";
import { Countries } from "../data/countries";

import "../css/Menu.css";

class Menu extends React.Component {

  componentDidMount() {
    // Populate country dropdown
    let countries = Countries;
    console.log('Countries: ', countries);
    let countrySelect = document.querySelector('#country-dropdown');
    countries.forEach(country => {
      let countryOption = document.createElement('option');
      countryOption.textContent = country.name;
      countryOption.value = country.code;
      countrySelect.append(countryOption);
    });
  }

  // Populate city dropdown on Country select
  populateCitySelect = (target) => {
    let countrySelect = document.querySelector("#country-dropdown");
    let citySelect = document.querySelector('#city-dropdown');
    // Clear city dropdown before populating
    if (citySelect.length > 0) Array.from(citySelect - 1).forEach(city => city.remove());
    let cities = require('../data/city.list.json');
    let citiesFiltered = cities.filter(city => city.country === countrySelect.value);
    citiesFiltered
      .sort((a, b) => {
        return a.name < b.name ? -1 : 1;
      })
      .forEach(city => {
        if (!city.name) return;
        let cityOption = document.createElement('option');
        cityOption.id = city.id;
        cityOption.value = city.country;
        cityOption.textContent = city.name;
        citySelect.append(cityOption);
      });
  }

  handleFetchWeather = () => {
    let cityDropdown = document.getElementById('city-dropdown');
    let cityId = cityDropdown.options[cityDropdown.selectedIndex].id;
    this.props.fetchWeatherData(cityId);
  }

  render() {
    return <div className="menuContainer closed">
        <div className="menu">
          <select name="country-dropdown" id="country-dropdown" className="countryDropdown" onChange={this.populateCitySelect}>
            <option value="Choose Country">Choose Country</option>
          </select>
          <select name="city-dropdown" id="city-dropdown" className="cityDropdown">
            <option value="Choose City">Choose City</option>
          </select>
          <button type="submit" onClick={this.handleFetchWeather}>Get Weather</button>
        </div>
      </div>;
  }
}

export default Menu;
