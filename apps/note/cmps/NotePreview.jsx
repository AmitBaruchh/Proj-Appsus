const { Link } = ReactRouterDOM

import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteVideo } from '../cmps/NoteVideo.jsx'

export function NotePreview({
    note,
    onRemoveNote,
    onDuplicateNote,
    onChangeBgnColorNote,
    onTogglePinNote,
    onToggleTodo,
}) {
    let bgColor = 'white'
    if (note.style) bgColor = note.style.backgroundColor

    function handleColorChange(event) {
        const newColor = event.target.value
        onChangeBgnColorNote(note, newColor)
    }
    const pinnedClass = note.isPinned ? 'pinned' : ''
    return (
        <article className="note-preview" style={{ backgroundColor: bgColor }}>
            <Link to={`/note/edit/${note.id}`}>
                <DynamicCmp note={note} onToggleTodo={onToggleTodo} />
            </Link>

            <section className="action-btns">
                <span
                    className={`material-symbols-outlined pin-note-btn ${pinnedClass}`}
                    onClick={() => onTogglePinNote(note)}
                >
                    keep
                </span>
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
