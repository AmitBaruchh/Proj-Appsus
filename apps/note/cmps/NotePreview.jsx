const { Link } = ReactRouterDOM

import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteVideo } from '../cmps/NoteVideo.jsx'
import { NoteCanvas } from '../cmps/NoteCanvas.jsx'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../../../services/event-bus.service.js'

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
        showSuccessMsg('Background color updated!')
    }

    const pinnedClass = note.isPinned ? 'pinned' : ''

    return (
        <article className="note-preview" style={{ backgroundColor: bgColor }}>
            <Link to={`/note/edit/${note.id}`}>
                <DynamicCmp note={note} onToggleTodo={onToggleTodo} readOnly={true} />
            </Link>

            <span
                className={`material-symbols-outlined pin-note-btn ${pinnedClass}`}
                onClick={() => onTogglePinNote(note)}
                title={note.isPinned ? 'Unpin note' : 'Pin note'}
            >
                keep
            </span>
            <section className="action-btns">
                <span
                    className="material-icons-outlined remove-note-btn"
                    onClick={() => onRemoveNote(note)}
                    title="Delete note"
                >
                    delete
                </span>
                <span
                    className="material-icons-outlined duplicate-note-btn"
                    onClick={() => onDuplicateNote(note)}
                    title="Duplicate note"
                >
                    file_copy
                </span>
                <label htmlFor={`fillColor-${note.id}`}>
                    <span className="material-icons-outlined bgn-color-note-btn" title="Change background color">
                        palette
                    </span>
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
        case 'NoteCanvas':
            return <NoteCanvas {...props} />
        default:
            return null
    }
}
