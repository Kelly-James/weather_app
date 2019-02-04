import update from "immutability-helper";

export function toggleMenu() {
    const menu = document.querySelector(".menuContainer");
    if (menu.classList.contains('closed')) {
        menu.classList.remove("closed");
    } else {
        menu.classList.add("closed");
    }
};

export function convertTimestamp(timestamp) {
  var date = new Date(timestamp * 1000), // Convert the passed timestamp to milliseconds
    year = date.getFullYear(),
    month = ("0" + (date.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    day = ("0" + date.getDate()).slice(-2), // Add leading 0.
    hour = date.getHours(),
    min = ("0" + date.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time;

  // Convert 24 hour time to 12 hour
  if (hour > 12) {
    hour = hour - 12;
    ampm = "PM";
  } else if (hour === 12) {
    hour = 12;
    ampm = "PM";
  } else if (hour === 0) {
    hour = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = year + "-" + month + "-" + day + ", " + hour + ":" + min + " " + ampm;
  return time;
}

export function tempVariants(response, callback) {
  let temps = {
    high: null,
    low: null
  };
  let todayTemps = [];
  let currentDay = callback(response.currently.time).slice(0, 10);
  response.hourly.data.forEach(dataElement => {
    let timeElement = callback(dataElement.time).slice(0, 10);
    if (timeElement === currentDay) {
      todayTemps.push(dataElement);
    }
  });
  todayTemps.sort((a, b) => {
    return a.temperature - b.temperature;
  });
  temps.high = todayTemps[todayTemps.length - 1].temperature;
  temps.low = todayTemps[0].temperature;
  response.currently.temperatureVariants = temps;
  return response;
};

// Write function that takes in windBearing and returns the cardinal direction
export function getCardinalDirection (windBearing) {
    let cardinalAlpha = ""
    switch (true) {
        case windBearing > 336 && (windBearing <= 359 || windBearing === 0):
            // cardinalDirInfo.className = +"n";
            cardinalAlpha = "N"
            break;
        case windBearing > 0 && windBearing <= 23:
            // cardinalDirInfo.className = +"nne";
            cardinalAlpha = "NNE"
            break;
        case windBearing > 23 && windBearing <= 45:
            // cardinalDirInfo.className = +"ne";
            cardinalAlpha = "NE"
            break;
        case windBearing > 45 && windBearing <= 68:
            // cardinalDirInfo.className = +"ene";
            cardinalAlpha = "ENE"
            break;
        case windBearing > 68 && windBearing <= 90:
            // cardinalDirInfo.className = +"e";
            cardinalAlpha = "E"
            break;
        case windBearing > 90 && windBearing <= 113:
            // cardinalDirInfo.className = +"ese";
            cardinalAlpha = "ESE"
            break;
        case windBearing > 113 && windBearing <= 135:
            // cardinalDirInfo.className = +"se";
            cardinalAlpha = "SE"
            break;
        case windBearing > 135 && windBearing <= 158:
            // cardinalDirInfo.className = +"sse";
            cardinalAlpha = "SSE"
            break;
        case windBearing > 158 && windBearing <= 180:
            // cardinalDirInfo.className = +"s";
            cardinalAlpha = "S"
            break;
        case windBearing > 180 && windBearing <= 203:
            // cardinalDirInfo.className = +"ssw";
            cardinalAlpha = "SSW"
            break;
        case windBearing > 203 && windBearing <= 225:
            // cardinalDirInfo.className = +"s";
            cardinalAlpha = "S"
            break;
        case windBearing > 225 && windBearing <= 248:
            // cardinalDirInfo.className = +"wsw";
            cardinalAlpha = "WSW"
            break;
        case windBearing > 248 && windBearing <= 270:
            // cardinalDirInfo.className = +"w";
            cardinalAlpha = "W"
            break;
        case windBearing > 270 && windBearing <= 293:
            // cardinalDirInfo.className = +"wnw";
            cardinalAlpha = "WNW"
            break;
        case windBearing > 293 && windBearing <= 313:
            // cardinalDirInfo.className = +"nw";
            cardinalAlpha = "NW"
            break;
        case windBearing > 313 && windBearing <= 336:
            // cardinalDirInfo.className = +"nnw";
            cardinalAlpha = "NNW"
            break;
        default:
        cardinalAlpha = "Not Working"
        break;
    }
    return cardinalAlpha;
}

export function setUserPrefsAuto (response) {
    let unitFlag = response.flags.units;
    let userPrefs = {
        units: {
            speed: null,
            temperature: null,
            amountLarge: null,
            amountSmall: null
        }
    }
    switch (unitFlag) {
        case "us":
            userPrefs.units.speed = 'mph';
            userPrefs.units.temperature = "F";
            userPrefs.units.amountLarge = "mi";
            userPrefs.units.amountSmall = "in";
            break;
        case "ca":
            userPrefs.units.speed = 'km/h';
            userPrefs.units.temperature = "C";
            userPrefs.units.amountLarge = "km";
            userPrefs.units.amountSmall = "mm";
            break;
        case "si":
            userPrefs.units.speed = 'm/s';
            userPrefs.units.temperature = "C";
            userPrefs.units.amountLarge = "km";
            userPrefs.units.amountSmall = "mm";
            break;
        case "uk2":
            userPrefs.units.speed = 'mph';
            userPrefs.units.temperature = "C";
            userPrefs.units.amountLarge = "mi";
            userPrefs.units.amountSmall = "mm";
            break;
        default:
            console.error('Check setUserPrefsAuto function, it could be broken..');
    }
    return userPrefs;
}

export function updateUserPrefs(unit, userPrefs) {
    let currentPrefs = { ...userPrefs };
    let updatedPrefs = {};
    switch (unit) {
        case "km/h":
            updatedPrefs = update(currentPrefs, {
                units: {
                    speed: { $set: 'km/h' },
                    amountLarge: { $set: "km" },
                    amountSmall: { $set: "mm" }
                }
            });
            break;
        case "mph":
            updatedPrefs = update(currentPrefs, {
                units: {
                    speed: { $set: 'mph' },
                    amountLarge: { $set: "mi" },
                    amountSmall: { $set: "in" }
                }
            });
            break;
        case "m/s":
            updatedPrefs = update(currentPrefs, {
                units: {
                    speed: { $set: 'm/s' },
                    amountLarge: { $set: "km" },
                    amountSmall: { $set: "mm" }
                }
            });
            break;
        case "c":
            updatedPrefs = update(currentPrefs, {
                units: {
                    temperature: { $set: "C" }
                }
            });
            break;
        case "f":
            updatedPrefs = update(currentPrefs, {
                units: {
                    temperature: { $set: "F" }
                }
            });
            break;
        default:
            console.error('Check setUserPrefsManual function, it could be broken..');
    }
    return updatedPrefs;
}

// Unit conversion functions
// Miles to kilometers
let mi2km = (mi) => {
    return mi * 1.609;
}

// Kilometers to miles
let km2mi = (km) => {
    return km / 1.609;
}

// Kilometers to meters
let km2m = (km) => {
    return km / 3.6;
}

// Meters to kilommeters
let m2km = (m) => {
    return m * 3.6;
}

// Miles to meters
let mi2m = (mi) => {
    return mi / 2.237;
}

// Meters to miles
let m2mi = (m) => {
    return m * 2.237;
}

// Millimeters to inches
let mm2in = (mm) => {
    return mm / 25.4;
}

// Inches to millimeters
let in2mm = (inch) => {
    return inch * 25.4;
}

// Celsius to fahrenheit
let c2f = (c) => {
    return (c * 1.8) + 32;
}

// Fahrenheit to celsius
let f2c = (f) => {
    return (f - 32) / 1.8;
}

// Takes in unit and returns appropriate conversion function
let unitFuncGen = (newUnit, currentUnit) => {
    let requestedFunction = null;
    switch (true) {
      case newUnit === "km/h" && currentUnit === "mph":
        requestedFunction = mi2km
        break;
      case newUnit === "km/h" && currentUnit === "m/s":
        requestedFunction = m2km
        break;
      case newUnit === "mph" && currentUnit === "km/h":
        requestedFunction = km2mi
        break;
      case newUnit === "mph" && currentUnit === "m/s":
        requestedFunction = m2mi
        break;
      case newUnit === "m/s" && currentUnit === "km/h":
        requestedFunction = km2m
        break;
      case newUnit === "m/s" && currentUnit === "mph":
        requestedFunction = mi2m
        break;
      case newUnit === "mm":
        requestedFunction = in2mm;
        break;
      case newUnit === "inch":
        requestedFunction = mm2in;
        break;
      case newUnit ===  "c":
        requestedFunction = f2c;
        break;
      case newUnit === "f":
        requestedFunction = c2f;
        break;
      default:
        console.log("Unit Func Gen says - What?");
    }
    return requestedFunction;
}

// Converts current measurements 
export function convertUnits(unit, currentSpeedUnit, weatherDataState) {
    let weatherDataObj = { ...weatherDataState };
    let conversionFunction = unitFuncGen(unit, currentSpeedUnit);
    switch (unit) {
        case "c":
        case "f":
            for (let property in weatherDataObj.currently) {
                if (property === "temperature") {
                    weatherDataObj.currently.temperature = conversionFunction(weatherDataObj.currently.temperature);
                }
                if (property === "apparentTemperature") {
                    weatherDataObj.currently.apparentTemperature = conversionFunction(weatherDataObj.currently.apparentTemperature);
                }
                if (property === "dewPoint") {
                    weatherDataObj.currently.dewPoint = conversionFunction(weatherDataObj.currently.dewPoint);
                }
            }
            weatherDataObj.hourly.data.forEach(hour => {
                for (let property in hour) {
                    if (property === "temperature") {
                        hour.temperature = conversionFunction(hour.temperature);
                    }
                    if (property === "apparentTemperature") {
                        hour.apparentTemperature = conversionFunction(hour.apparentTemperature);
                    }
                    if (property === "dewPoint") {
                        hour.dewPoint = conversionFunction(hour.dewPoint);
                    }
                }
            });
            weatherDataObj.daily.data.forEach(day => {
                for (let property in day) {
                    if (property === "temperatureHigh") {
                        day.temperatureHigh = conversionFunction(day.temperatureHigh);
                    }
                    if (property === "temperatureLow") {
                        day.temperatureLow = conversionFunction(day.temperatureLow);
                    }
                    if (property === "apparentTemperatureHigh") {
                        day.apparentTemperatureHigh = conversionFunction(day.apparentTemperatureHigh);
                    }
                    if (property === "apparentTemperatureLow") {
                        day.apparentTemperatureLow = conversionFunction(day.apparentTemperatureLow);
                    }
                    if (property === "dewPoint") {
                        day.dewPoint = conversionFunction(day.dewPoint);
                    }
                    if (property === "temperatureMin") {
                        day.temperatureMin = conversionFunction(day.temperatureMin);
                    }
                    if (property === "temperatureMax") {
                        day.temperatureMax = conversionFunction(day.temperatureMax);
                    }
                    if (property === "apparentTemperatureMin") {
                        day.apparentTemperatureMin = conversionFunction(day.apparentTemperatureMin);
                    }
                    if (property === "apparentTemperatureMax") {
                        day.apparentTemperatureMax = conversionFunction(day.apparentTemperatureMax);
                    }
                }
            });
            break;
        case "km/h":
        case "mph":
        case "m/s":
        for (let property in weatherDataObj.currently) {
            if (property === "windSpeed") {
                    weatherDataObj.currently.windSpeed = conversionFunction(weatherDataObj.currently.windSpeed);
                }
                if (property === "windGust") {
                    weatherDataObj.currently.windGust = conversionFunction(weatherDataObj.currently.windGust);
                }
                if (property === "visibility") {
                    weatherDataObj.currently.visibility = conversionFunction(weatherDataObj.currently.visibility);
                }
            }
            weatherDataObj.hourly.data.forEach(hour => {
                for (let property in hour) {
                    if (property === "windSpeed") {
                        hour.windSpeed = conversionFunction(hour.windSpeed);
                    }
                    if (property === "windGust") {
                        hour.windGust = conversionFunction(hour.windGust);
                    }
                    if (property === "visibility") {
                        hour.visibility = conversionFunction(hour.visibility);
                    }
                }
            });
            weatherDataObj.daily.data.forEach(day => {
                for (let property in day) {
                    if (property === "windSpeed") {
                        day.windSpeed = conversionFunction(day.windSpeed);
                    }
                    if (property === "windGust") {
                        day.windGust = conversionFunction(day.windGust);
                    }
                    if (property === "visibility") {
                        day.visibility = conversionFunction(day.visibility);
                    }
                }
            });
            break;
        case "mm":
        case "inch":
            for (let property in weatherDataObj.currently) {
                if (property === "precipIntensity") {
                    weatherDataObj.currently.precipIntensity = conversionFunction(weatherDataObj.currently.precipIntensity);
                }
            }
            weatherDataObj.hourly.data.forEach(hour => {
                for (let property in hour) {
                    if (property === "precipIntensity") {
                        hour.precipIntensity = conversionFunction(hour.precipIntensity);
                    }
                }
            });
            weatherDataObj.daily.data.forEach(day => {
                for (let property in day) {
                    if (property === "precipIntensity") {
                        day.precipIntensity = conversionFunction(day.precipIntensity);
                    }
                    if (property === "precipIntensityMax") {
                        day.precipIntensityMax = conversionFunction(day.precipIntensityMax);
                    }
                }
            });
        break;
        default: 
            console.error('Unit converting function error');
    }
    return weatherDataObj;
}

export function dissectGeoResponse (response) {
    let geoObject = { city: null, country: null, province: null };
    response.results[0].address_components.forEach(component => {
        switch (component.types[0]) {
        case "locality":
            geoObject.city = component.long_name;
            break
        case "country":
            geoObject.country = component.long_name;
            break
        case "administrative_area_level_1":
            geoObject.province = component.long_name;
            break
        default: 
        return;
        }
    });
    if (!geoObject.city) {
        geoObject.city = geoObject.province;
    }
    return geoObject
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