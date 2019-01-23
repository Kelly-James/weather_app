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