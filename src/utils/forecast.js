const request = require('request');

const forecast = (data, callback) => {
  // long, lat of the location you look up.
  const { lat, long, locationName } = data;

  // url.
  const access_key = process.env.WEATHERSTACK_API_KEY;
  const forecastUrl = `http://api.weatherstack.com/current?access_key=${access_key}&query=${lat},${long}`;

  request({ url: forecastUrl, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to the service!', undefined);
    } else if (body.error) {
      // callback('Invalid data passed, try again with a valid data!', undefined);
      callback('Free plan limit!', undefined);
    } else {
      const location = `${body.location.name}, ${body.location.region}, ${body.location.country}.`;

      const forcast = `It was ${body.current.weather_descriptions[0]}, tempreture: ${body.current.temperature} and it feels like: ${body.current.feelslike}.`;

      const time = `Time: ${body.current.observation_time}.`;

      const wind = `Wind speed: ${body.current.wind_speed}.`;

      // Final res to send back.
      const res = {
        forcast,
        location,
        time,
        wind,
        iconUrl: body.current.weather_icons[0],
      };

      callback(undefined, res);
    }
  });
};

module.exports = forecast;
