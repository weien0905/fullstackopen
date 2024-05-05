import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = import.meta.env.VITE_OPEN_WEATHER_API;

const Display = ({ result }) => {
    let [weather, setWeather] = useState(null);
  
    useEffect(() => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${result.latlng[0]}&lon=${result.latlng[1]}&appid=${api_key}&units=metric`)
      .then(res => {
          setWeather(res.data);
      });
    }, [])

    return (
    <div>
      <h2>{result.name.common}</h2>
      <div>Capital: {result.capital.join(', ')}</div>
      <div>Area: {result.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(result.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img width="150" src={result.flags.png} alt={result.flags.alt} />
      <h3>Weather in {result.name.common}</h3>
      {weather && <>
        <div>Temperate: {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <div>Wind: {weather.wind.speed} m/s</div>
      </>}
    </div>
    )
}

export default Display