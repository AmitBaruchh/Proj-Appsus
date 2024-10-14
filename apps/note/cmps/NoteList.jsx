import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({ notes }) {

    if (!notes) return <div>Loading...</div>
    return (
        <ul>
            {notes.map(note => (
                <li key={note.id}>{note.id}</li>
            ))}
        </ul>
    )
}
