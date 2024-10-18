export function NoteVideo({ note }) {
    return (
        <div>
            {note.info.title && <h3>{note.info.title}</h3>}
            <video width="210" height="130" controls>
                <source src={note.info.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
