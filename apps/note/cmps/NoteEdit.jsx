import { noteService } from '../services/note.service.js'
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function NoteEdit() {
    const { noteId } = useParams()
    const [note, setNote] = useState(null)
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

    function onSaveNote() {
        noteService.save(note).then(() => {
            navigate('/note')
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

                    <button onClick={onSaveNote}>Close</button>
                </div>
            </div>
        </section>
    )
}
