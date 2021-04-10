require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('postData', (req, res) => {
	if (req.method === 'POST') {
		return JSON.stringify(req.body);
	}
	return "";
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

app.get('/', (req, res) => {
	res.send('<h1>Welcome to phonebook</h1>');
})

app.get('/api/persons', (req, res) => {
	Person
		.find()
		.then(persons => {
			res.json(persons)
		})
})

app.get('/api/persons/:id', (req, res) => {
	Person
		.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person);
			}
			else {
				res.status(404).end();
			}
		});
})

app.get('/info', (req, res) => {
	const timestamp = new Date();
	Person
		.find()
		.countDocuments((err, count) => {
			if (err) {
				res.status(500).end();
			}
			else {
				res.send(
					`<div>Phonebook has info for ${count} people</div>` +
					`<div>${timestamp}</div>`
				);
			}
    });
})

app.post('/api/persons', (req, res) => {
	const newPerson = req.body;
	const hasValidFields = newPerson.hasOwnProperty('name') &&
		newPerson.hasOwnProperty('number');
	//const isNew = (!phonebook.some(person => person.name === newPerson.name));
	if (hasValidFields) { //&& isNew) {
		if (newPerson.name === "" || newPerson.number === "") {
			return res.status(400).json({ error: 'Content missing' });
		}
		//const newID = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 4) + 4); // 4 first entries are hardcoded
		//const addedPerson = { ...newPerson, "id": newID };
		const person = new Person({
			name: newPerson.name,
			number: newPerson.number
		})
		person
			.save()
			.then(savedPerson => {
				console.log(
					`Saved ${savedPerson.name} number ${savedPerson.number} to db with id ${savedPerson._id}`)
				res.json(savedPerson);
			})		
	}
	//else if (hasValidFields)
	//	res.status(409).json({ error: 'Entry already exists' });
	else {
		res.status(400).json({ error: 'Malformed request' });
	}
})

app.delete('/api/persons/:id', (req, res) => {
	Person.deleteOne({_id: req.params.id}).then(result => {
		if (result.deletedCount === 1) {
			res.status(200).end();
		}
		else {
			res.status(404).end();
		}
	});
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
})