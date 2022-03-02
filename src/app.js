// Core modules.
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// npm modules.
const express = require('express');
const hbs = require('hbs');
// express init.
const app = express();

// Setup the port.
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve like css and js.
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Alph96 team.',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Alph96 team.',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Alph96 team.',
  });
});

// Setup our http endpoint which send back json forcast information.
app.get('/weather', (req, res) => {
  // Check the address.
  if (!req.query.address)
    return res.send({
      error: 'You must provide an address',
    });

  // user entered an address. (converting that address to lat, long)
  geocode(req.query.address, (err, data) => {
    if (err)
      return res.send({
        error: err,
      });

    // Ready to get the forcast.
    forecast(data, (err, forcastData) => {
      if (err)
        return res.send({
          error: err,
        });

      // got the forcast
      // send it back in a json format.
      return res.send(forcastData);
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alph96 team.',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alph96 team.',
    errorMessage: 'Page not found.',
  });
});

// Fire up the server.
app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
