const Display = ({ result }) => {
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
    </div>
    )
}

export default Display