const { useState, useRef } = React

export function AddTxtNote({ onAddNote }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteTxt, setNoteTxt] = useState('')
    const txtInputRef = useRef(null)

    function handleTxtInputChange(ev) {
        setNoteTxt(ev.target.value)
    }

    function handleTitleInputChange(ev) {
        setNoteTitle(ev.target.value)
    }

    function handleTitleKeyPress(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            txtInputRef.current.focus()
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!noteTxt) return
        const newNote = {
            type: 'NoteTxt',
            info: {
                title: noteTitle || '',
                txt: noteTxt || '',
            },
        }
        onAddNote(newNote)
        setNoteTitle('')
        setNoteTxt('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter title..."
                value={noteTitle}
                onChange={handleTitleInputChange}
                onKeyDown={handleTitleKeyPress}
            />
            <input
                ref={txtInputRef}
                type="text"
                placeholder="Enter text..."
                value={noteTxt}
                onChange={handleTxtInputChange}
            />
            <span className="material-icons-outlined">check_box</span>
            <button type="submit">Add Note</button>
        </form>
    )
}
