const request = require("request");


const geocode = (address, callbacks) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
     + encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1Ijoic3VibnViOTkiLCJhIjoiY2p3dTIyZ2lrMDZtbDN5bHJmb2huMmFneCJ9.6yxRHNGy-_RpStBg9dPgiA";

    request({
        url: url, 
        json: true, 

    }, (error, {body}) => {

        if (error) {

            callbacks("Unable to connect to location services");

        } else if (body.features.length === 0) {

            callbacks("Unable to find location, choose another")
        } else {

            callbacks(undefined, {

                lat : body.features[0].center[1],
                long : body.features[0].center[0], 
                location: body.features[0].place_name,

            })
        }
    })

}

module.exports = geocode;