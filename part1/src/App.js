import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:3001/notes')
            .then(response => {
                setNotes(response.data)
                console.log('Promise fulfilled')
                console.log(response)
            })
    }, [])

    const notesToShow = showAll ? notes: notes.filter(note => note.important === true)

    const rows = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note}
        />
    )

    const addNote = (event) => {
        event.preventDefault()
        const note = {
            id: notes.length + 1,
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }

        setNotes(notes.concat(note))
        setNewNote('')
    }

    const handleNewNote = (event) => {
        console.log("New note added", event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNewNote}/>
                <button type="submit"> save </button>
            </form>
        </div>
    )
}

export default App