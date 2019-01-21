const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        // proxy("/geoLocation/*", {
        //   target: "https://maps.googleapis.com/maps/api/geocode/json",
        //   changeOrigin: true
        // }), 
        proxy("/forecast", {
          target: "https://api.darksky.net/",
          changeOrigin: true
        }));
}

// Proxy setting from package.json
// "proxy": {
//     "/geoLocation": {
//         "target": "https://maps.googleapis.com/maps/api/geocode/json",
//             "changeOrigin": true
//     },
//     "/getWeather": {
//         "target": "https://api.darksky.net/forecast/",
//             "changeOrigin": true
//     }
// },