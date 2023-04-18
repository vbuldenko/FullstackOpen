import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');
	
	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
	const people = searchName.length ? filteredPersons: persons;

	function handleSubmit(event) {
		event.preventDefault();

		const hasName = persons.some(person => person.name === newName);
		if (hasName) {
			alert(`${newName} is already added to phonebook`)
		} else {
			setPersons(prev => prev.concat({name: newName, number: newNumber, id: persons.length + 1}))
			setNewName('')
		}
	}

	function handleNameChange(event) {
		setNewName(event.target.value);
	}

	function handleNumberChange(event) {
		setNewNumber(event.target.value);
	}

	function handleSearch(event) {
		setSearchName(event.target.value)
	}


	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Search <input value={searchName} onChange={handleSearch} />
			</div>

			<h2>Add a new contact</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Contacts</h2>
			{people.map(el => <p key={el.name} >{el.name} {el.number}</p>)}
		</div>
	)
}

export default App