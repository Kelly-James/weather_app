import { Countries } from './data/countries';
const cities = require("./data/city.list.json");

// Populate country dropdown on component load
export function populateCountriesDrop() {
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

export function toggleMenu() {
    const menu = document.querySelector(".menuContainer");
    if (menu.classList.contains('closed')) {
        menu.classList.remove("closed");
    } else {
        menu.classList.add("closed");
    }
};

export function convertUNIXTime(unixTime) {
    let unix_time = unixTime;
    let date = new Date(unix_time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formatedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formatedTime;
}

// Get user coordinates and location info
export function getUserCoordinates() {
    let options = { enableHighAccuracy: true };

    let success = pos => {
        let coords = pos.coords;
        return coords;
    };

    let error = err => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
};