import { useState } from 'react';

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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