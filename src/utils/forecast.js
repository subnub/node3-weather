const request = require("request");


const forecast = (lat, long, callbacks) => {

    const url = "https://api.darksky.net/forecast/f97e98609d7b5ee5522a922dea6eb4c6/" + long + "," + lat;

    request({
        url: url,
        json: true,
    }, (error, {body}) => {

    if (error) {

        callbacks("Error");
    } else {

        callbacks(undefined, "It is currently " + body.currently.temperature + " degrees out. There is a " 
        + body.currently.precipProbability + " of rain")
    }

    
    
    });
}

module.exports = forecast;