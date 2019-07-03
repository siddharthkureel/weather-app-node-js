const request = require('request')
const geocode = (address, callback) => {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoiam95a3VyZWVsIiwiYSI6ImNqeGkwdWJ0dzBsOW8zb3FuNmR1bTVjaXgifQ.0GdRQFY_wEcgkutrWXksyQ`;
    request({ url: geocodingUrl, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather api', undefined)
        } else if (response.body.features.length === 0) {
            callback('user input is not valid', undefined)
        } else {
            const coordinates = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
            callback(undefined, coordinates)
        }
    })
}
const forecast = (latitude, longitute, callback) => {
    const url = `https://api.darksky.net/forecast/21e706cd866403ae3a1b55684d5c45b3/${latitude},${longitute}?units=si`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('unable to connect to weather api', undefined)
        } else if (response.body.error) {
            callback('user input is not valid', response.body.error)
        } else {
            const { precipProbability, temperature } = response.body.currently;
            callback(undefined, `It's currently ${temperature} C and chances of raining are ${precipProbability}%`)
        }
    })
}
module.exports={
    geocode,
    forecast
}