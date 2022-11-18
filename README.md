# Weather Forecast API 🥎

This is a simple API to get weather forecast for a given city.

## ENV Variables

- `PORT` - Port to run the server on
- `WEATHERSTACK_API_KEY` - API key for the weather API
- `MAPBOX_API_KEY` - Mapbox API key

## Installation

- Clone the repo
- Run `npm install` to install dependencies
- Run `npm start` to start the server
- Run `npm dev` to run in development mode

## Endpoints 👀

### Get weather forecast for a given city 🌧

```
GET /weather?city=London
```

### Get weather forecast for a given city and country 🌧

```
GET /weather?city=London&country=GB
```

### Get weather forecast for a given city and country and number of days 🌧

```
GET /weather?city=London&country=GB&days=5
```
