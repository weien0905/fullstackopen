import { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './components/Display'

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [display, setDisplay] = useState('');
  const [change, setChange] = useState(false);

  useEffect(() => {
    axios
    .get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
      setCountries(res.data);
  })
  }, [])

  const handleChange = e => {
    setSearch(e.target.value);
    setChange(true);
  }

  const handleShow = e => {
    let result = countries.find(country => country.name.common === e.target.parentElement.firstChild.textContent);
    setDisplay(<Display result={result} />);
    setChange(false);
  }

  const results = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));

  if (change) {
    if (results.length > 10) {
      setDisplay('Too many matches, specify another filter');
    } else if (results.length === 1) {
      let result = results[0];
      setDisplay(<Display result={result} />);
    } else {
      setDisplay(results.map(result => <div key={result.name.common}><span>{result.name.common}</span><button onClick={handleShow}>show</button></div>))
    }
    setChange(false);
  }

  return (
    <>
    <div>
      Find countries: <input value={search} onChange={handleChange} disabled={countries.length > 0 ? false : true} />
    </div>
    <div>
      {display}
    </div>
    </>
  )
}

export default App
