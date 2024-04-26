import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]); 
  const [newName, setNewName] = useState('');

  const addName = e => {
    e.preventDefault();
    // Check if the name is already in the phonebook
    if (persons.find(person => JSON.stringify(person) === JSON.stringify({name: newName}))) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
    } else {
      setPersons([...persons, {name: newName}]);
      setNewName('');
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <div key={person.name}>{person.name}</div>
      )}
    </div>
  )
}

export default App