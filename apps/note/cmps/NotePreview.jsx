export function NotePreview({ note, onRemoveNote, onDuplicateNote }) {
    return (
        <article className="note-preview">
            <DynamicCmp note={note} />
            <button className="remove-note-btn" onClick={() => onRemoveNote(note)}>
                🗑
            </button>
            <button className="duplicate-note-btn" onClick={() => onDuplicateNote(note)}>
                📄
            </button>
        </article>
    )
}

function DynamicCmp(props) {
    switch (props.note.type) {
        case 'NoteTxt':
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />
        case 'NoteTodos':
            return <NoteTodos {...props} />
        case 'NoteVideo':
            return <NoteVideo {...props} />
        default:
            return null
    }
}

function NoteTxt({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <p>{note.info.txt}</p>
        </div>
    )
}

function NoteImg({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <img src={note.info.url} alt={note.info.title} />
        </div>
    )
}

function NoteTodos({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}

            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={!!todo.doneAt} />
                        {todo.txt}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function NoteVideo({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <video width="320" height="240" controls>
                <source src={note.info.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
