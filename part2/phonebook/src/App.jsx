import { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ handleFilterChange }) => <div>
  filter shown with <input onChange={handleFilterChange} />
</div>

const PersonForm = ({ addName, handleNameChange, handleNumberChange, newName, newNumber }) => <>
  <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
</>

const Persons = ({ filtered }) => <div>
      {filtered.map(person => 
        <div key={person.id}>{person.name} {person.number}</div>
      )}
</div>

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data);
    })
  }, [])

  const addName = e => {
    e.preventDefault();
    
    if (persons.find(person => person.name === newName)) {
      // Check if the name is already in the phonebook
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else if (!newName || !newNumber) {
      // Ensure no empty fields before submitting
      alert('All fields must be filled');
    } else {
      setPersons([...persons, {id: persons.length + 1 , name: newName, number: newNumber}]);
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = e => {
    setNewName(e.target.value);
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  }

  const handleFilterChange = e => {
    setFilter(e.target.value);
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filtered={filtered} />
    </div>
  )
}

export default App