import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddTxtNote } from '../cmps/AddTxtNote.jsx'
import { AddTodoNote } from '../cmps/AddTodoNote.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService
            .query()
            .then(setNotes)
            .catch(err => {
                console.log('err', err)
            })
    }

    function onAddNote(newNote) {
        noteService.save(newNote).then(() => {
            loadNotes()
        })
    }

    function onRemoveNote(note) {
        const noteId = note.id
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <AddTxtNote onAddNote={onAddNote} />
            <AddTodoNote onAddNote={onAddNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
