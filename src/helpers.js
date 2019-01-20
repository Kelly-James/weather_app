import { Countries } from './data/countries';
const cities = require("./data/city.list.json");

// Populate country dropdown on component load
export function populateCountriesDrop() {
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
export function populateCityDrop(target) {
    let countrySelect = document.querySelector("#country-dropdown");
    let citySelect = document.querySelector('#city-dropdown');
    // Clear city dropdown before populating
    if (citySelect.length > 0) Array.from(citySelect - 1).forEach(city => city.remove());
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
