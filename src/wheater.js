import React, {useState, useEffect} from 'react';

const Weatercomponent = () => {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();

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
  
  if (weather){
      console.log(weather.coord.lat);
      return (
        <div className="Hola">
          <h1>Wheater Channel</h1>
          <div className=""> 
            <p>Latitude: {weather.coord.lat}</p>
            <p>Longitude: {weather.coord.lon}</p>
            <p>Pressure : {weather.main.pressure}</p>
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
