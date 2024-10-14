const { useState } = React

export function AddTxtNote({ onAddNote }) {
    const [noteTxt, setNoteTxt] = useState('')

    function handleInputChange(ev) {
        setNoteTxt(ev.target.value)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!noteTxt) return
        const newNote = {
            type: 'NoteTxt',
            info: { txt: noteTxt },
        }
        onAddNote(newNote)
        setNoteTxt('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter text..." value={noteTxt} onChange={handleInputChange} />
            <button type="submit">Add Note</button>
        </form>
    )
}
