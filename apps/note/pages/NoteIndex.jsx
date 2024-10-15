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

    function onChangeBgnColorNote(note, newColor) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: newColor } }

        setNotes(prevNotes => prevNotes.map(currNote => (currNote.id === note.id ? updatedNote : currNote)))

        noteService.save(updatedNote).catch(err => console.log('Problems saving note with new background color:', err))
    }

    function onTogglePinNote(note) {
        const updatedNote = { ...note, isPinned: !note.isPinned }
        setNotes(prevNotes => prevNotes.map(currNote => (currNote.id === note.id ? updatedNote : currNote)))
        noteService.save(updatedNote).catch(err => console.log('Problems saving note with pin toggle:', err))
    }

    if (!notes) return <div>Loading...</div>

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)
    return (
        <section className="note-index">
            <AddNote onAddNote={onAddNote} />
            <h3>PINNED</h3>
            <NoteList
                notes={pinnedNotes}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onChangeBgnColorNote={onChangeBgnColorNote}
                onTogglePinNote={onTogglePinNote}
            />

            <h3>OTHERS</h3>
            <NoteList
                notes={unpinnedNotes}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onChangeBgnColorNote={onChangeBgnColorNote}
                onTogglePinNote={onTogglePinNote}
            />
        </section>
    )
}
