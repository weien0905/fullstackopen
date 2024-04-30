import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';

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

const Persons = ({ filtered, removePerson }) => <div>
      {filtered.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button data-id={person.id} onClick={removePerson}>Delete</button>
        </div>
      )}
</div>

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
    .getAll()
    .then(data => {
      setPersons(data);
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
      personService
      .create({
        name: newName,
        number: newNumber
      })
      .then(data => {
        setPersons([...persons, data]);
      });

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

  const removePerson = e => {
    personService
    .remove(e.target.dataset.id)
    .then(data => 
      setPersons(persons.filter(person => person.id !== data.id))
    )
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filtered={filtered} removePerson={removePerson} />
    </div>
  )
}

export default App