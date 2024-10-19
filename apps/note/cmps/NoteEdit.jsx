import { noteService } from '../services/note.service.js'
import { NoteCanvas } from './NoteCanvas.jsx'

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function NoteEdit() {
    const { noteId } = useParams()
    const [note, setNote] = useState(null)
    const [canvasDataURL, setCanvasDataURL] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadNote()
    }, [noteId])

    function loadNote() {
        noteService.get(noteId).then(note => {
            setNote(note)
        })
    }

    function handleChange({ target }) {
        const { name, value } = target
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, [name]: value } }))
    }

    function handleTodoChange(idx, event) {
        const newTodos = [...note.info.todos]
        newTodos[idx].txt = event.target.value
        setNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, todos: newTodos } }))
    }

    function handleSaveCanvas(dataURL) {
        setCanvasDataURL(dataURL)
    }

    function onSaveNote() {
        if (note.type === 'NoteCanvas' && canvasDataURL) {
            note.info.url = canvasDataURL
        }
        noteService.save(note).then(() => {
            navigate('/note?updated=true')
        })
    }

    if (!note) return <div>Loading...</div>

    return (
        <section className="note-edit-modal">
            <div className="modal-overlay">
                <div className="modal-content">
                    <input
                        type="text"
                        name="title"
                        value={note.info.title || ''}
                        onChange={handleChange}
                        placeholder="Title"
                    />

                    {note.type === 'NoteTxt' && (
                        <textarea
                            name="txt"
                            value={note.info.txt || ''}
                            onChange={handleChange}
                            placeholder="Enter your text here"
                        />
                    )}

                    {note.type === 'NoteTodos' && (
                        <ul>
                            {note.info.todos.map((todo, idx) => (
                                <li key={idx}>
                                    <input
                                        type="text"
                                        value={todo.txt}
                                        onChange={event => handleTodoChange(idx, event)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    {note.type === 'NoteCanvas' && (
                        <div>
                            <NoteCanvas note={note} readOnly={false} onSaveCanvas={handleSaveCanvas} />
                        </div>
                    )}

                    <button
                        className="close-edit-modal"
                        onClick={onSaveNote}
                        title={note.type === 'NoteCanvas' ? "Don't forget to save before closing" : 'Close'}
                    >
                        Close
                    </button>
                </div>
            </div>
        </section>
    )
}
