import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddTxtNote } from '../cmps/AddTxtNote.jsx'

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

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <AddTxtNote onAddNote={onAddNote} />
            <NoteList notes={notes} />
        </section>
    )
}
