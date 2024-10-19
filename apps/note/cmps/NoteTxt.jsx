export function NoteTxt({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <p>{note.info.txt}</p>
        </div>
    )
}
