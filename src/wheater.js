import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import './App.css';

const toCelsius = (F) => {
  return Math.floor(F - 273);
};

const Weatercomponent = () => {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  console.log(coords);
  const getCoordenates = () => {
    const coords = {
      lat: '',
      lon: '',
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        coords['lat'] = position.coords.latitude;
        coords['lon'] = position.coords.longitude;
        console.log('antes-->coords', coords);
        setCoords(coords);
        console.log('coords-->', coords);
        const promise = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=a6004f6759c4f6ba7a711371a367aab3`
        );
        promise
          .then((body) => body.json())
          .then((data) => {
            setWeather(data);
          });
      });
    } else {
      console.log('geolocation is not avalable');
    }
  };

  useEffect(() => {
    getCoordenates();
  }, []);

  if (weather) {
    console.log(weather.coord.lat);
    return (
      <div className="card col-8 col-sm-8 col-md-8  shadow p-3 mb-5 bg-white rounded  d-flex justify-content-center">
        <div className="card-body">
          <h2>Weather Channel</h2>
          <p>Latitude: {weather.coord.lat}</p>
          <p>Longitude: {weather.coord.lon}</p>
          <p>City : {weather.name}</p>
          <p>Country : {weather.sys.country}</p>
          <p>Description : {weather.weather[0].description}</p>
          <p>Pressure : {weather.main.pressure}</p>
          <p>Humidity : {weather.main.humidity}</p>
          <p>Temp : {toCelsius(weather.main.temp)} °C</p>
        </div>
      </div>
    );
  }
  return (
    <div className="Hola">
      <h1>Wheater Channel</h1>
      <div className="">
        <p>Latitude: {}</p>
        <p>Longitude: {}</p>
        <p>Pressure : {}</p>
      </div>
    </div>
  );
};

export default Weatercomponent;
