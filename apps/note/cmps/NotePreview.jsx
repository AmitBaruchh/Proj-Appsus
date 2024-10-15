const { useState } = React

export function NotePreview({ note, onRemoveNote, onDuplicateNote, onChangeBgnColorNote }) {
    let bgColor = 'white'
    if (note.style) bgColor = note.style.backgroundColor

    function handleColorChange(event) {
        const newColor = event.target.value
        onChangeBgnColorNote(note, newColor)
    }

    return (
        <article className="note-preview" style={{ backgroundColor: bgColor }}>
            <DynamicCmp note={note} />

            <section className="action-btns">
                {/* <span className="material-symbols-outlined pin-note-btn" onClick={() => onPinNote(note)}>
                    keep
                </span> */}
                <span className="material-icons-outlined remove-note-btn" onClick={() => onRemoveNote(note)}>
                    delete
                </span>
                <span className="material-icons-outlined duplicate-note-btn" onClick={() => onDuplicateNote(note)}>
                    file_copy
                </span>
                <label htmlFor={`fillColor-${note.id}`}>
                    <span className="material-icons-outlined bgn-color-note-btn">palette</span>
                </label>
                <input
                    type="color"
                    id={`fillColor-${note.id}`}
                    className="fillColor"
                    name="fillColor"
                    value={bgColor}
                    onChange={handleColorChange}
                    style={{ display: 'none' }}
                />
            </section>
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
