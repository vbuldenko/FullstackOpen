let contacts = require('./data')
const express = require('express')
const morgan = require('morgan')
const app = express()
// const cors = require('cors')

// app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))


app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}<p/>
    `)
})

// app.put('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = contacts.find(person => person.id === id)
//     if (person) {
//         response.json(person)
//       } else {
//         response.status(404).end()
//       }
// })

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = contacts.find(person => person.id === id)
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.post ('/api/persons', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(400).json({ 
          error: 'name or number is missing' 
        })
    }

    if (contacts.find(contact => contact.name === req.body.name)) {
        return res.status(400).json({ 
          error: 'name must be unique' 
        })
    }

    const newId = Math.floor(Math.random() * 1000) + 1
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
