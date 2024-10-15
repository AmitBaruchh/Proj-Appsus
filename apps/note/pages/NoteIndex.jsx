import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddTxtNote } from '../cmps/AddTxtNote.jsx'
import { AddTodoNote } from '../cmps/AddTodoNote.jsx'
import { AddNote } from '../cmps/AddNote.jsx'

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [notes])

    function loadNotes() {
        noteService
            .query()
            .then(setNotes)
            .catch(err => {
                console.log('err', err)
            })
    }

    function onAddNote(newNote) {
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote])
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

    function onDuplicateNote(note) {
        const duplicatedNote = { ...note, id: null, createdAt: Date.now() }
        onAddNote(duplicatedNote)
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            {/* <AddTxtNote onAddNote={onAddNote} />
            <AddTodoNote onAddNote={onAddNote} /> */}
            <AddNote onAddNote={onAddNote} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onDuplicateNote={onDuplicateNote} />
        </section>
    )
}
