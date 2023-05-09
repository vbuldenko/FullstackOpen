const contacts = require('./data')
const express = require('express')
const app = express()

app.use(express.json())


app.get('/api/persones', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
    response.send(`
    <h1>Phonebook has info for ${contacts.length} people</h1>
    <h1>${new Date()}<h1/>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = contacts.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
})

app.post ('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return response.status(400).json({ 
          error: 'name or number is missing' 
        })
    }

    if (contacts.find(contact => contact.name === req.body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
    }


    const newId = Math.floor(Math.random() * 10000) + 1
    const person = req.body

    person.id = newId

    contacts = contacts.concat(person)

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(p => p.id !== id)
  
    res.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})