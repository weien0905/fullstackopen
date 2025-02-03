const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

if (process.argv.length === 4 || process.argv.length > 5) {
    console.log('invalid argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://weien0905:${password}@cluster0.qyyng.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3];
    const number = process.argv[4];

    const note = new Person({
        name,
        number
    })

    note.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })
}

