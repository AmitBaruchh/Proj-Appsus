const { useState } = React

export function AddNote({ onAddNote }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [noteType, setNoteType] = useState('NoteTxt')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteTxt, setNoteTxt] = useState('')
    const [todos, setTodos] = useState([''])
    const [noteImgUrl, setNoteImgUrl] = useState('')
    const [noteVideoUrl, setNoteVideoUrl] = useState('')

    function handleTxtInputChange(ev) {
        setNoteTxt(ev.target.value)
    }

    function handleTitleInputChange(ev) {
        setNoteTitle(ev.target.value)
    }

    function handleAddTodo() {
        setIsExpanded(true)
        setNoteType('NoteTodos')
    }

    function handleAddImg() {
        setIsExpanded(true)
        setNoteType('NoteImg')
    }

    function handleAddVideo() {
        setIsExpanded(true)
        setNoteType('NoteVideo')
    }

    function handleExpand() {
        setIsExpanded(true)
    }

    function handleTodoChange(ev, idx) {
        const newTodos = [...todos]
        newTodos[idx] = ev.target.value
        setTodos(newTodos)
        if (ev.target.value.length === 1 && idx === todos.length - 1) {
            setTodos([...newTodos, ''])
        }
    }

    function handleImgUrlChange(ev) {
        setNoteImgUrl(ev.target.value)
    }

    function handleVideoUrlChange(ev) {
        setNoteVideoUrl(ev.target.value)
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        if (
            !noteTitle.trim() &&
            !noteTxt.trim() &&
            todos.every(todo => !todo.trim()) &&
            !noteImgUrl.trim() &&
            !noteVideoUrl.trim()
        ) {
            setIsExpanded(false)
            setNoteTitle('')
            setNoteTxt('')
            setTodos([''])
            setNoteType('NoteTxt')
            return
        }
        const newNote = {
            type: noteType,
            info:
                noteType === 'NoteTxt'
                    ? { title: noteTitle, txt: noteTxt }
                    : noteType === 'NoteTodos'
                    ? {
                          title: noteTitle,
                          todos: todos.filter(todo => todo.trim()).map(todo => ({ txt: todo, doneAt: null })),
                      }
                    : noteType === 'NoteImg'
                    ? { title: noteTitle, url: noteImgUrl }
                    : { title: noteTitle, url: noteVideoUrl },
        }
        onAddNote(newNote)
        setNoteTitle('')
        setNoteTxt('')
        setTodos([''])
        setIsExpanded(false)
        setNoteType('NoteTxt')
    }

    return (
        <form onSubmit={handleSubmit} className="add-note-form">
            {!isExpanded && (
                <div className="note-input-wrapper">
                    <input
                        type="text"
                        placeholder="Take a note..."
                        onClick={handleExpand}
                        className="note-input-collapsed"
                    />

                    <span className="material-icons-outlined todo-list-btn" onClick={handleAddTodo}>
                        check_box
                    </span>
                    <span className="material-icons-outlined img-note-btn" onClick={handleAddImg}>
                        <span class="material-symbols-outlined">image</span>
                    </span>
                    <span className="material-icons-outlined video-note-btn" onClick={handleAddVideo}>
                        videocam
                    </span>
                </div>
            )}
            {isExpanded && (
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={noteTitle}
                        onChange={handleTitleInputChange}
                        className="note-title-input"
                    />
                    {noteType === 'NoteTxt' && (
                        <input
                            type="text"
                            placeholder="Take a note..."
                            value={noteTxt}
                            onChange={handleTxtInputChange}
                            className="note-text-input"
                        />
                    )}
                    {noteType === 'NoteTodos' && (
                        <ul className="todo-list">
                            {todos.map((todo, idx) => (
                                <li key={idx}>
                                    <input
                                        type="text"
                                        placeholder={'+ List item'}
                                        value={todo}
                                        onChange={ev => handleTodoChange(ev, idx)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    {noteType === 'NoteImg' && (
                        <input
                            type="text"
                            placeholder="Enter image URL..."
                            value={noteVideoUrl}
                            onChange={handleImgUrlChange}
                            className="note-img-url-input"
                        />
                    )}
                    {noteType === 'NoteVideo' && (
                        <input
                            type="text"
                            placeholder="Enter video URL..."
                            value={noteVideoUrl}
                            onChange={handleVideoUrlChange}
                            className="note-video-url-input"
                        />
                    )}
                    <div className="close-btn-container">
                        <button className="close-new-note-btn" type="submit">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}
