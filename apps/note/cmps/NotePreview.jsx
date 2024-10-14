export function NotePreview({ note }) {
    return (
        <article className="note-preview">
            <DynamicCmp note={note} />
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
    }
}

function NoteTxt({ note }) {
    return <p>{note.info.txt}</p>
}

function NoteImg({ note }) {
    return (
        <div>
            <p>{note.info.title}</p>
            <img src={note.info.url} alt={note.info.title} />
        </div>
    )
}

function NoteTodos({ note }) {
    return (
        <div>
            <h3>{note.info.title}</h3>
            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx}>{todo.txt}</li>
                ))}
            </ul>
        </div>
    )
}
