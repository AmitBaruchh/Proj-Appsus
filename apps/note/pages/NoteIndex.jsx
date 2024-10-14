import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

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

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList notes={notes} />
        </section>
    )
}
