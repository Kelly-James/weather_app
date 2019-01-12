import React from 'react';
import { Countries } from "../data/countries";

import '../css/Nav.css';

class Nav extends React.Component {

    componentDidMount() {
        const countries = Countries;
        const countrySelect = document.querySelector('#country-dropdown');
        countries.forEach(country => {
            let countryOption = document.createElement('option');
            countryOption.textContent = country.name;
            countryOption.value = country.code;
            countrySelect.append(countryOption);
        })
    }

    handleCountrySelect = (target) => {
        const cities = require('../data/city.list.json');
        const countrySelect = document.querySelector("#country-dropdown");
        const citySelect = document.querySelector('#city-dropdown');
        console.log('Country Select: ', countrySelect.value);
        let citiesFiltered = cities.filter(city => city.country === countrySelect.value);
        citiesFiltered
            .sort((a, b) => {
                return a.name < b.name ? -1 : 1;
            })
            .forEach(city => {
                let cityOption = document.createElement('option');
                cityOption.id = city.id;
                cityOption.value = city.country;
                cityOption.textContent = city.name;
                citySelect.append(cityOption);
            });
        console.log('Cities: ', citiesFiltered);
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
                <select name="country-dropdown" id="country-dropdown" className="countryDropdown" onChange={this.handleCountrySelect} />
                <select name="city-dropdown" id="city-dropdown" className="cityDropdown" />
            </div>
          </div>;
    }
}

export default Nav;