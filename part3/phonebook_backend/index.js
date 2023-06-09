require('dotenv').config()
const Contact = require('./models/contact');
// let contacts = require('./data');
const express = require('express');
const morgan = require('morgan');
const app = express();
// const cors = require('cors')

// app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('reqBody', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))


app.get('/api/persons', (request, response, next) => {
    Contact.find({}).then(result => {
        response.json(result)
    }).catch(error => next(error))
})

app.get('/info', (request, response, next) => {

    Contact.find({}).then(result => {
        response.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${new Date()}<p/>
    `)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {

    const { name, number } = request.body

    const contact = { name, number }
    Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true, context: 'query' })
        .then(updtContact => {
            if (updtContact) {
                response.json(updtContact)
            } else {
                response.status(404).json({ error: "contact was already deleted" })
            }
        })
        .catch(error => {
            next(error)
        })
})

app.get('/api/persons/:id', (request, response, next) => {

    Contact.findById(request.params.id)
        .then(contact => {
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post ('/api/persons', (req, res, next) => {

    const { name, number } = req.body

    const contact = new Contact({ name, number })

    contact.save().then(savedResult => {
        console.log(`added ${name} number ${number} to the phonebook`)
        res.json(savedResult)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {

    Contact.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
