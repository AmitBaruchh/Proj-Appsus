export function NoteImg({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <img src={note.info.url} alt={note.info.title} />
        </div>
    )
}
