const { useState, useEffect } = React

export function NoteFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="note-filter">
            <form>
                <span className="material-symbols-outlined pin-note-btn" onClick={() => onTogglePinNote(note)}>
                    search
                </span>
                <label htmlFor="search"></label>
                <input
                    onChange={handleChange}
                    value={filterByToEdit.search || ''}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search notes..."
                />
            </form>
        </section>
    )
}
