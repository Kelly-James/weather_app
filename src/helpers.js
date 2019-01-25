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
    let className = 'wi-towards-';
    switch (windBearing) {
        case windBearing > 336 && windBearing <= 359 || windBearing === 0:
            className = +"n";
            break;
        case windBearing > 0 && windBearing <= 23:
            className = +"nne";
            break;
        case windBearing > 23 && windBearing <= 45:
            className = +"ne";
            break;
        case windBearing > 45 && windBearing <= 68:
            className = +"ene";
            break;
        case windBearing > 68 && windBearing <= 90:
            className = +"e";
            break;
        case windBearing > 90 && windBearing <= 113:
            className = +"ese";
            break;
        case windBearing > 113 && windBearing <= 135:
            className = +"se";
            break;
        case windBearing > 135 && windBearing <= 158:
            className = +"sse";
            break;
        case windBearing > 158 && windBearing <= 180:
            className = +"s";
            break;
        case windBearing > 180 && windBearing <= 203:
            className = +"ssw";
            break;
        case windBearing > 203 && windBearing <= 225:
            className = +"s";
            break;
        case windBearing > 225 && windBearing <= 248:
            className = +"wsw";
            break;
        case windBearing > 248 && windBearing <= 270:
            className = +"w";
            break;
        case windBearing > 270 && windBearing <= 293:
            className = +"wnw";
            break;
        case windBearing > 293 && windBearing <= 313:
            className = +"nw";
            break;
        case windBearing > 313 && windBearing <= 336:
            className = +"nnw";
            break;
        default:
            return;
    }
    return className;
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