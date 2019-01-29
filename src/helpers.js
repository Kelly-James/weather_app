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
            userPrefs.units.speed = 'mi/h';
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
            userPrefs.units.speed = 'mi/h';
            userPrefs.units.temperature = "C";
            userPrefs.units.amountLarge = "mi";
            userPrefs.units.amountSmall = "mm";
            break;
        default:
            console.log('Check function, it could be broken..');
    }
    // console.log(userPrefs);
    return userPrefs;
}

// Write functions to convert units
// export function measurementConverter (curUnits, selectedUnits, state) {
//     let curUnits = state.userPrefs;
//     switch (selectedUnits) {
//         case "km":

//     }
// }

// Miles to kilometers
let mi2km = (mile) => {
    return mile * 1.69034;
}

// Kilometers to miles
let km2mi = (km) => {
    return km / 1.69034;
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

// Function that takes short form country name and returns units of measure
export function getUnitOfMeasure(countryName) {

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