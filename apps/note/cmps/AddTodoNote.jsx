const { useState, useRef } = React

export function AddTodoNote({ onAddNote }) {
    const [noteTitle, setNoteTitle] = useState('')
    const [todos, setTodos] = useState([''])
    const inputRefs = useRef([])

    function handleTitleChange(ev) {
        setNoteTitle(ev.target.value)
    }

    function handleTitleKeyPress(ev) {
        if (ev.key === 'Enter') {
            ev.preventDefault()

            inputRefs.current[0].focus()
        }
    }

    function handleTodoChange(ev, idx) {
        const newTodos = [...todos]
        newTodos[idx] = ev.target.value
        setTodos(newTodos)

        if (ev.target.value.length === 1 && idx === todos.length - 1) {
            setTodos([...newTodos, ''])
        }
    }

    function handleKeyPress(ev, idx) {
        if (ev.key === 'Enter') {
            ev.preventDefault()
            if (idx < todos.length - 1) {
                inputRefs.current[idx + 1].focus()
            } else {
                setTodos([...todos, ''])
            }
        }
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        const newNote = {
            type: 'NoteTodos',
            info: {
                title: noteTitle || '',
                todos: todos.filter(todo => todo.trim()).map(todo => ({ txt: todo, doneAt: null })),
            },
        }
        onAddNote(newNote)
        setNoteTitle('')
        setTodos([''])
    }

    function setInputRef(el, idx) {
        inputRefs.current[idx] = el
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={noteTitle}
                onChange={handleTitleChange}
                onKeyDown={handleTitleKeyPress}
            />
            <div>
                {todos.map((todo, idx) => (
                    <div key={idx}>
                        <input
                            ref={el => setInputRef(el, idx)}
                            type="text"
                            placeholder={`Todo item #${idx + 1}`}
                            value={todo}
                            onChange={ev => handleTodoChange(ev, idx)}
                            onKeyDown={ev => handleKeyPress(ev, idx)}
                        />
                    </div>
                ))}
            </div>
            <button type="submit">Add Note</button>
        </form>
    )
}
