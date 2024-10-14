export function NotePreview({ note }) {
    const { type, info } = note

    return (
        <article className="note-preview">
            {type === 'NoteTxt' && <p>{info.txt}</p>}
            {type === 'NoteImg' && (
                <div>
                    <p>{info.title}</p>
                    <img src={info.url} alt={info.title} />
                </div>
            )}
            {type === 'NoteVideo' && (
                <div>
                    <p>{info.title}</p>
                    <iframe src={info.url} width="100%" height="300"></iframe>
                </div>
            )}
            {type === 'NoteTodos' && (
                <div>
                    <h3>{info.title}</h3>
                    <ul>
                        {info.todos.map((todo, idx) => (
                            <li key={idx}>{todo.txt}</li>
                        ))}
                    </ul>
                </div>
            )}
        </article>
    )
}
