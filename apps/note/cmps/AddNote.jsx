import { NoteCanvas } from '../cmps/NoteCanvas.jsx'
const { useState } = React

export function AddNote({ onAddNote }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [noteType, setNoteType] = useState('NoteTxt')
    const [noteTitle, setNoteTitle] = useState('')
    const [noteTxt, setNoteTxt] = useState('')
    const [todos, setTodos] = useState([''])
    const [noteImgUrl, setNoteImgUrl] = useState('')
    const [noteVideoUrl, setNoteVideoUrl] = useState('')
    const [canvasDataUrl, setCanvasDataUrl] = useState('')
    const [bgColor, setBgColor] = useState('white')
    const [isPinned, setIsPinned] = useState(false)

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

    function handleAddCanvas() {
        setIsExpanded(true)
        setNoteType('NoteCanvas')
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

    function handleSaveCanvas(dataURL) {
        setCanvasDataUrl(dataURL)
    }

    function handleBgColorChange(ev) {
        setBgColor(ev.target.value)
    }

    function togglePin() {
        setIsPinned(!isPinned)
    }

    function isNoteEmpty() {
        return (
            !noteTitle.trim() &&
            !noteTxt.trim() &&
            todos.every(todo => !todo.trim()) &&
            !noteImgUrl.trim() &&
            !noteVideoUrl.trim() &&
            !canvasDataUrl.trim()
        )
    }

    function resetNote() {
        setNoteTitle('')
        setNoteTxt('')
        setTodos([''])
        setBgColor('white')
        setIsPinned(false)
        setIsExpanded(false)
        setNoteType('NoteTxt')
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        if (isNoteEmpty()) {
            alert('Cannot add an empty note!')
            onAddNote(null)
            setIsExpanded(false)

            return
        }

        let newNote = {}

        if (noteType === 'NoteCanvas') {
            newNote = {
                type: noteType,
                info: {
                    title: noteTitle,
                    url: canvasDataUrl,
                },
                style: { backgroundColor: bgColor },
                isPinned: isPinned,
            }
        } else {
            newNote = {
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
                        : noteType === 'NoteVideo'
                        ? { title: noteTitle, url: noteVideoUrl }
                        : { title: noteTitle },
                style: { backgroundColor: bgColor },
                isPinned: isPinned,
            }
        }

        onAddNote(newNote)
        resetNote()
    }

    return (
        <form onSubmit={handleSubmit} className="add-note-form" style={{ backgroundColor: bgColor }}>
            {!isExpanded && (
                <div className="note-input-wrapper">
                    <input
                        type="text"
                        placeholder="Take a note..."
                        onClick={handleExpand}
                        className="note-input-collapsed"
                        style={{ backgroundColor: bgColor }}
                    />
                    <section className="add-note-btns">
                        <span className="material-icons-outlined todo-list-btn" onClick={handleAddTodo}>
                            check_box
                        </span>
                        <span className="material-icons-outlined img-note-btn" onClick={handleAddImg}>
                            image
                        </span>
                        <span className="material-icons-outlined video-note-btn" onClick={handleAddVideo}>
                            videocam
                        </span>
                        <span className="material-symbols-outlined" onClick={handleAddCanvas}>
                            draw
                        </span>
                    </section>
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
                        style={{ backgroundColor: bgColor }}
                    />
                    {noteType === 'NoteTxt' && (
                        <input
                            type="text"
                            placeholder="Take a note..."
                            value={noteTxt}
                            onChange={handleTxtInputChange}
                            className="note-text-input"
                            style={{ backgroundColor: bgColor }}
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
                                        style={{ backgroundColor: bgColor }}
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
                            style={{ backgroundColor: bgColor }}
                        />
                    )}
                    {noteType === 'NoteVideo' && (
                        <input
                            type="text"
                            placeholder="Enter video URL..."
                            value={noteVideoUrl}
                            onChange={handleVideoUrlChange}
                            className="note-video-url-input"
                            style={{ backgroundColor: bgColor }}
                        />
                    )}
                    {noteType === 'NoteCanvas' && (
                        <div>
                            <p>Draw on the canvas:</p>
                            <NoteCanvas readOnly={false} noteTitle={noteTitle} onSaveCanvas={handleSaveCanvas} />
                        </div>
                    )}
                    <span
                        className={`material-symbols-outlined pin-note-btn ${isPinned ? 'pinned' : ''}`}
                        onClick={togglePin}
                        title={isPinned ? 'Unpin note' : 'Pin note'}
                    >
                        keep
                    </span>
                    <section className="action-btns">
                        <label>
                            <span
                                className="material-icons-outlined bgn-color-note-btn"
                                title="Change background color"
                            >
                                palette
                            </span>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={handleBgColorChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                        <span
                            className="material-icons-outlined remove-note-btn"
                            onClick={resetNote}
                            title="Delete note"
                        >
                            delete
                        </span>
                    </section>

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
