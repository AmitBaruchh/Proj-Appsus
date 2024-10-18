export function NoteVideo({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <video width="240" height="160ש" controls>
                <source src={note.info.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
