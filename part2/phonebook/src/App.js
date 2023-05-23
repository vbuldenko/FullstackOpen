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
			{people.map(el => <Contact key={el.id} name={el.name} number={el.number} remover={() => remover(el.id, el.name)} />)}
		</>
	)
}

function Notification ({message}) {

  const notificationStyle1 = {
	color: 'green',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
  }

  const notificationStyle2 = {
	color: 'red',
	background: 'lightgrey',
	fontSize: 20,
	borderStyle: 'solid',
	borderRadius: 5,
	padding: 10,
	marginBottom: 10,
  }

  if (message === null) {
    return null
  }

  return (
    <div className='notification' style={message.error? notificationStyle2: notificationStyle1}>
      {message.text}
    </div>
  )
}

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchName, setSearchName] = useState('');
	const [notification, setNotification] = useState(null);
	
	const people = searchName.length ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())): persons;

	function resetForm () {
		setNewName('')
		setNewNumber('')
	}
	
	function handleNotification (message) {
		setNotification(message)
		setTimeout(() => {
		  setNotification(null)
		}, 3000)
	}

	function handleSubmit(event) {
		event.preventDefault();
		const hasName = persons.some(person => person.name === newName);
		const message = hasName ? {text:'a number is changed', error: false} : {text:`${newName} was added to the phonebook`, error: false};

		if (hasName) {

			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const person = persons.find(p => p.name === newName);
				const changedPerson = {...person, number: newNumber};

				contactService
					.update(person.id, changedPerson)
					.then(response => {
						setPersons(persons.map(p => p.id !== person.id ? p: response))
						handleNotification(message)
						resetForm()
					})
					.catch(error => {
						console.log(error)
						handleNotification({text: error.response.data.error, error: true})
						setPersons(persons.filter(p => p.id !== person.id))
					})
			}
		} else {
			contactService
				.create({name: newName, number: newNumber})
				.then(contact => {
					setPersons(prev => prev.concat(contact))
					handleNotification(message)
					resetForm()
				}).catch(error => {
						console.log(error)
						handleNotification({text: error.response.data.error, error: true}) //Added code Lookup later!!!!!!!!
				})
		}
	}
	
	async function handleRemove(id, name) {
	  if (window.confirm(`Do you really want to delete ${name}?`)) {
	    try {
	      await contactService.remove(id);
	      const data = await contactService.getAll();
	      setPersons(data);
	    } catch (error) {
	      console.error('An error occurred:', error);
	    }
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
