import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteSvc from './services/notes'
import Notification from './components/Notification'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')
    useEffect(() => {
        noteSvc.getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const notesToShow = showAll ? notes: notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = {...note, important: !note.important}

       noteSvc.update(id, changedNote)
                .then(updatedNote => {
                setNotes(notes.map(note => note.id !== id ? note : updatedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '{$note.content}' was already removed from the server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    }

    const rows = () => notesToShow.map(note =>
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
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

    noteSvc.create(note)
        .then(newNote => {
            setNotes(notes.concat(newNote))
            setNewNote('')
        })
    }

    const handleNewNote = (event) => {
        console.log("New note added", event.target.value)
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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