import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from 'react';
import './App.css';

function toFarenheit(value) {
  return Math.floor((value - 273) * (9 / 5) + 32);
}

const toCelsius = (F) => {
  return Math.floor(F - 273);
};

const Weatercomponent = () => {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [flag, setflag] = useState(true);
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
        setCoords(coords);
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
    let temp = weather.main.temp;
    const handleTemp = (text) => {
      temp = weather.main.temp;
      setflag(!text);
    };
    return (
      <div className="card col-8 col-sm-8 col-md-8  shadow p-3 mb-5 bg-white rounded  d-flex justify-content-center">
        <div className="card-body">
          <div className="card-header">
            <h2 className="card-title">Weather Channel</h2>
          </div>
          <p>Latitude: {weather.coord.lat}</p>
          <p>Longitude: {weather.coord.lon}</p>
          <p>City : {weather.name}</p>
          <p>Country : {weather.sys.country}</p>
          <p>Description : {weather.weather[0].description}</p>
          <p>Pressure : {weather.main.pressure}</p>
          <p>Humidity : {weather.main.humidity}</p>
          <p>
            Temp : {flag ? toCelsius(temp) + '°C' : toFarenheit(temp) + '°F'}{' '}
          </p>
          <button onClick={() => handleTemp(flag)} className="btn btn-primary">
            Change to F/C
          </button>
        </div>

        <div className="card-footer text-muted">By Luis Mex</div>
      </div>
    );
  }
  return (
    <div className="Hola">
      <h1>Wheater Channel</h1>
      <div className="">
        <p> La API no respondio</p>
        <p>Latitude: {}</p>
        <p>Longitude: {}</p>
        <p>Pressure : {}</p>
      </div>
    </div>
  );
};

export default Weatercomponent;
