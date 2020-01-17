const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

let notes = [{
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
}, {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
}, {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
}]

const generateID = () => {
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(n => n.idx))
    : 0

    return maxId + 1
}

app.get('/', (req, res) => {
    res.end('<h1> Hello world! </h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }
    else{
        res.status(404).end()
    }
})


app.post('/notes', (req, res) => {
    const body = req.body

    if(!body.content){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateID(),
    }

    notes = notes.concat(note)

    res.json(note)
})

app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server: port ${port}`)
})
