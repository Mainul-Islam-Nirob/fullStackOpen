const express = require('express')
const app = express()
const morgan = require('morgan')


// middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('tiny'))

let persons = [
    {
        "id": 1,
        "name": "Nirob Chowdhury",
        "number": "01783791670"
    },
    {
        "id": 2,
        "name": "Mainul Islam",
        "number": "01885597774"
    },
    {
        "id": 3,
        "name": "Ridoy Khan",
        "number": "01752311016"
    },
    {
        "id": 4,
        "name": "Aman Mahbub Hasan",
        "number": "01719121739"
    },
    {
        "id": 5,
        "name": "Aman",
        "number": "01719139"
    },
    {
        "id": 6,
        "name": "Mahbub Hasan",
        "number": "01719129"
    },
    {
        "id": 7,
        "name": "Hasan",
        "number": "017191239"
    },
    {
        "id": 8,
        "name": "Rubel",
        "number": "719121739"
    },
    {
        "id": 9,
        "name": "Santo",
        "number": "0719121739"
    },
    {
        "id": 10,
        "name": "Asad",
        "number": "0179121739"
    },
    {
        "id": 11,
        "name": "Moyen",
        "number": "0171912739"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
   response.send(
       `<div>
            <span>Phonebook has info of ${persons.length} people</span> 
        </div>
        <span>${new Date().toString()}</span>`
   )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
   
    if (person) {
        response.json(person)
    }else{
        response.status(404).end()
    }
   
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const generateId = () => (Math.random() * 10000).toFixed(0)
    const body = request.body

    // Empty related error handling
    if (!body.name) {
        return response.status(400).json({
            error: "name is required"
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: "number is required"
        })
    }

    // Checking if person is already exist
    const alreadyExist = persons.some(person => person.name === body.name)

    if (alreadyExist) {
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

