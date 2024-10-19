export function NoteTodos({ note, onToggleTodo }) {
    return (
        <div className="todo-note">
            {note.info.title && <h3>{note.info.title}</h3>}

            <ul>
                {note.info.todos.map((todo, idx) => (
                    <li key={idx}>
                        <input type="checkbox" checked={!!todo.doneAt} onChange={() => onToggleTodo(note, idx)} />
                        {todo.txt}
                    </li>
                ))}
            </ul>
        </div>
    )
}
