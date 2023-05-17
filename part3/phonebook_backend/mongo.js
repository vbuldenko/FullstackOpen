const mongoose = require('mongoose');

if (process.argv.length<3) {
  console.log('give password an arguments')
  process.exit(1)
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url =
  `mongodb+srv://vbfullstack:${password}@clustervb0.db8puja.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {

  Contact.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(contact => {
      console.log(contact.name, constact.number)
    })
    mongoose.connection.close()
  })
  process.exit(1)
}

const contact = new Contact({name, number})

contact.save().then(result => {
  console.log(`added ${name} number ${number} to the phonebook`)
  mongoose.connection.close()
})