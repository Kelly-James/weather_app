import React from 'react';
import { Countries } from "../data/countries";

import '../css/Nav.css';

class Nav extends React.Component {

    componentDidMount() {
        // Populate country dropdown
        let countries = Countries;
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
                if(!city.name) return;
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
        return <div className="navContainer">
            <div className="nav">
              {/* <div className="menuBtnFrame" onClick={this.props.toggleMenu}>
                <div className="menuBtnLine btnLine1" />
                <div className="menuBtnLine btnLine2" />
                <div className="menuBtnLine btnLine3" />
              </div> */}
              <h2>The Weather App</h2>
              <select name="country-dropdown" id="country-dropdown" className="countryDropdown" onChange={this.populateCitySelect}>
                <option value="Choose Country">Choose Country</option>
              </select>
              <select name="city-dropdown" id="city-dropdown" className="cityDropdown">
                    <option value="Choose City">Choose City</option>
              </select>
              <button tpye="submit" onClick={this.handleFetchWeather}>Get Weather</button>
            </div>
          </div>;
    }
}

export default Nav;