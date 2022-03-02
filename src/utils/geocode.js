const request = require('request');

const geocode = (address, callback) => {
  // url.
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW80NzUiLCJhIjoiY2t1dTg5d2ZmMHJkdjJ1bzBqdWhieDlvNCJ9.D-wYkp6JNYKNnNPGCocu7A&limit=1`;

  // Make and http request to get the lat, long of this place.
  request({ url: geocodeUrl, json: true }, (err, res) => {
    if (err) {
      callback('There is a problem to connect the service!', undefined);
    } else if (res.error) {
      callback('Invalid information passed!', undefined);
    } else if (res.body.features.length === 0) {
      callback(
        'There is no information about this location, try a valid location!',
        undefined
      );
    } else {
      const [long, lat] = res.body.features[0].center;
      const locationName = res.body.features[0].place_name;

      callback(undefined, {
        lat: lat,
        long: long,
        locationName: locationName,
      });
    }
  });
};

module.exports = geocode;
