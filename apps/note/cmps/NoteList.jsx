import { NotePreview } from '../cmps/NotePreview.jsx'

export function NoteList({
    notes,
    onRemoveNote,
    onDuplicateNote,
    onChangeBgnColorNote,
    onTogglePinNote,
    onToggleTodo,
}) {
    if (!notes) return <div>Loading...</div>
    return (
        <ul className="note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onDuplicateNote={onDuplicateNote}
                        onChangeBgnColorNote={onChangeBgnColorNote}
                        onTogglePinNote={onTogglePinNote}
                        onToggleTodo={onToggleTodo}
                    />
                </li>
            ))}
        </ul>
    )
}
