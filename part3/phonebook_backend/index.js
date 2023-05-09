let contacts = require('./data')
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)
app.use(morgan("tiny"))


app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${new Date()}<p/>
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
    console.log(person)

    contacts = contacts.concat(person)
    console.log(contacts)

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