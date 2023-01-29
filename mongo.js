/* eslint-disable no-undef */
const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Bosher:${password}@cluster0.megdfbi.mongodb.net/phoneBook?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

if (name && number) {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')

      const person = new Person({
        name: name,
        number: number,
      })

      return person.save()
    })
    .then(() => {
      console.log('person saved!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else {
  mongoose.connect(url)
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log('phonebook:')
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
//console.log(name);
