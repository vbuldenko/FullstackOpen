import { useState, useEffect} from 'react';
import contactService from './services/contacts';


function Search ({name, handleChange}) {
	return (<div>Search <input value={name} onChange={handleChange} /></div>)
}

function Form ({name, handleName, number, handleNumber, handleSubmit}) {
	return (
		<>
			<h2>Add a new contact</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={name} onChange={handleName} />
				</div>
				<div>
					number: <input value={number} onChange={handleNumber}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
		</>
	)
}

function Contact ({name, number, remover}) {
	return (
		<div>{name} {number} <button onClick={remover}>delete</button></div>
	)
}

function Contacts ({people, remover}) {
	return (
		<>
			<h2>Contacts</h2>
			{people.map(el => <Contact 
						key={el.id}
						name={el.name}
						number={el.number}
						remover={() => remover(el.id, el.name)}
						/>)
			}
		</>
	)
}

function Notification ({ message }) {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');
	const [notification, setNotification] = useState(null);
	
	const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
	const people = searchName.length ? filteredPersons: persons;

	function resetForm () {
		setNewName('')
		setNewNumber('')
	}
	
	function handleNotification (message) {
		setNotification(message)
		setTimeout(() => {
		  setNotification(null)
		}, 5000)
	}

	function handleSubmit(event) {
		event.preventDefault();
		const newContact = {name: newName, number: newNumber}
		const hasName = persons.some(person => person.name === newName);
		const message = hasName ? 'a number is changed' : `${newContact.name} was added to the phonebook`;
		const errorMessage = `Information of ${newContact.name} was already removed from the server`;

		if (hasName) {
			// alert(`${newName} is already added to phonebook`)
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const person = persons.find(p => p.name === newName);
				const p_id = person.id;
				const changedPerson = {...person, number: newNumber};
				contactService
					.update(p_id, changedPerson)
					.then(response => {
						setPersons(persons.map(p => p.id !== p_id ? p: response))
						resetForm()
						handleNotification(message)
					}).catch(error => {
						console.log(error)
						handleNotification(errorMessage)
					  })
			}
		} else {
			contactService
				.create(newContact)
				.then(contact => {
					setPersons(prev => prev.concat(contact))
					resetForm()
					handleNotification(message)
				})
		}
	}
	
	function handleRemove(id, name) {
		if (window.confirm(`Do you really want to delete ${name}?`)) {
			contactService.remove(id)
			contactService.getAll().then(data => setPersons(data))
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


	useEffect(() => {
		contactService.getAll().then(data => setPersons(data))
	}, [])

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notification} />
			<Search 
				name={searchName}
				handleChange={handleSearch}
			/>
			<Form 
				name={newName}
				handleName={handleNameChange}
				number={newNumber}
				handleNumber={handleNumberChange}
				handleSubmit={handleSubmit}
			/>
			<Contacts people={people} remover={handleRemove}/>
		</div>
	)
}

export default App