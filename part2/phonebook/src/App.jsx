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
          <button data-id={person.id} data-name={person.name} onClick={removePerson}>Delete</button>
        </div>
      )}
</div>

const Notification = ({ message }) => {
  const messageStyle = {
    color: message.color
  }

  return <div style={messageStyle} className='message'>
    {message.text}
  </div>
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

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
      if (!newName || !newNumber) {
        // Ensure no empty fields before submitting
        alert('All fields must be filled');
      } else if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Check if the name is already in the phonebook
        const duplicate = persons.filter(person => person.name === newName)[0]
        
        personService
        .update(duplicate.id, { ...duplicate, number: newNumber })
        .then(data => {
          setPersons(persons.map(person => person.name !== newName ? person : data));
          
          setMessage({
            text: `Phone number for ${data.name} was updated`,
            color: 'green'
          })
          setNewName('');
          setNewNumber('');
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      } else {
        setNewName('');
        setNewNumber('');
      }
    } else {
      personService
      .create({
        name: newName,
        number: newNumber
      })
      .then(data => {
        setPersons([...persons, data]);
      });

      setMessage({
        text: `Added ${newName}`,
        color: 'green'
      })
      setNewName('');
      setNewNumber('');
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
    .then(data => {
      setPersons(persons.filter(person => person.id !== e.target.dataset.id))
    })
    .catch(err => {
      setMessage({
        text: `Information of ${e.target.dataset.name} has already been removed from server`,
        color: 'red'
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== e.target.dataset.id))
    })
  }

  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons filtered={filtered} removePerson={removePerson} />
    </div>
  )
}

export default App