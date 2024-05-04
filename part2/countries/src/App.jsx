import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
      setCountries(res.data);
  })
  }, [])

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const results = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  let display = '';

  if (results.length > 10) {
    display = 'Too many matches, specify another filter';
  } else if (results.length === 1) {
    const result = results[0];
    console.log(result);
    display = <div>
      <h2>{result.name.common}</h2>
      <div>Capital: {result.capital.join(', ')}</div>
      <div>Area: {result.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(result.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img width="150" src={result.flags.png} alt={result.flags.alt} />
    </div>;
  } else {
    display = results.map(result => <div key={result.name.common}>{result.name.common}</div>)
  }

  return (
    <>
    <div>
      Find countries: <input value={search} onChange={handleChange} disabled={countries.length > 0 ? false : true} />
    </div>
    <div>{display}</div>
    </>
  )
}

export default App
