const express = require('express')
const app = express()
var morgan = require('morgan')

const cors = require('cors')
app.use(cors())
app.use(express.json())

morgan.token('postData', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
    return "";
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let phonebook = [
    { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
    },
    { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
    },
    { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
    },
    { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
    }
];

app.get('/', (req, res) => {
    res.send('<h1>Welcome to phonebook</h1>');
})
  
app.get('/api/persons', (req, res) => {
    res.json(phonebook);
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(person => person.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
})

app.get('/info', (req, res) => {
    const timestamp = new Date();
    res.send(
        `<div>Phonebook has info for ${phonebook.length} people</div>` +
        `<div>${timestamp}</div>`
    );
})

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;
    //console.log(`Received POST for person: ${JSON.stringify(newPerson)}`);
    const hasValidFields =  newPerson.hasOwnProperty('name') &&
                            newPerson.hasOwnProperty('number');
    const isNew = (!phonebook.some(person => person.name === newPerson.name));
    if (hasValidFields && isNew) {
        if (newPerson.name === "" || newPerson.number === "") {
            return res.status(400).json({error: 'Content missing'});
        }
        const newID = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 4) + 4); // 4 first entries are hardcoded
        const addedPerson = {...newPerson, "id": newID};
        phonebook.push(addedPerson);
        res.json(addedPerson);
    }
    else if (hasValidFields) 
        res.status(409).json({error: 'Entry already exists'});
    else                
    {
        res.status(400).json({error: 'Malformed request'});
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const personIndex = phonebook.findIndex(person => person.id === id);
    //console.log(`Request to delete index ${personIndex}`);
    if (personIndex !== -1) {
        //console.log('Found! Deleting');
        phonebook.splice(personIndex, 1);
        res.status(200).end();
    }
    else {
        res.status(404).end();
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})