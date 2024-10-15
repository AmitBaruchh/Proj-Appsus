export function NotePreview({ note, onRemoveNote }) {
    return (
        <article className="note-preview">
            <DynamicCmp note={note} />
            <button className="remove-button" onClick={() => onRemoveNote(note)}>
                🗑
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
