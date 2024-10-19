import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { AddNote } from '../cmps/AddNote.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { getTruthyValues } from '../../../services/util.service.js'
import { showErrorMsg, showSuccessMsg, showUserMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { Outlet, useSearchParams, useNavigate } = ReactRouterDOM

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams(true)
    const defaultFilter = noteService.getFilterFromSearchParams(searchParams)
    const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        if (searchParams.get('updated')) {
            loadNotes()
            navigate('/note')
        }
    }, [searchParams])

    function loadNotes() {
        noteService
            .query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Failed to load notes')
            })
    }

    function onAddNote(newNote) {
        if (!newNote) return

        noteService
            .save(newNote)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
                showSuccessMsg('Note added successfully')
            })
            .catch(err => {
                console.log('Error saving note:', err)
                showErrorMsg('Failed to save note')
            })
    }

    function onRemoveNote(note) {
        const isConfirmed = window.confirm('Are you sure you want to delete this review?')
        if (!isConfirmed) {
            showErrorMsg('Note deletion was canceled')
            return
        }
        const noteId = note.id
        noteService
            .remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note ${noteId} removed successfully`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg('Failed to remove note')
            })
    }

    function onDuplicateNote(note) {
        const duplicatedNote = { ...note, id: null, createdAt: Date.now() }
        onAddNote(duplicatedNote)
        showSuccessMsg('Note duplicated successfully')
    }

    function onChangeBgnColorNote(note, newColor) {
        const updatedNote = { ...note, style: { ...note.style, backgroundColor: newColor } }

        setNotes(prevNotes => prevNotes.map(currNote => (currNote.id === note.id ? updatedNote : currNote)))

        noteService
            .save(updatedNote)
            .then(showSuccessMsg('Background color updated'))
            .catch(err => {
                console.log('Problems saving note with new background color:', err)
                showErrorMsg('Failed to update background color')
            })
    }

    function onTogglePinNote(note) {
        const updatedNote = { ...note, isPinned: !note.isPinned }
        setNotes(prevNotes => prevNotes.map(currNote => (currNote.id === note.id ? updatedNote : currNote)))
        noteService
            .save(updatedNote)
            .then(showSuccessMsg('Pin status updated'))
            .catch(err => {
                console.log('Problems saving note with pin toggle:', err)
                showErrorMsg('Failed to update pin status')
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function onToggleTodo(note, idx) {
        const updatedTodos = [...note.info.todos]
        const todo = updatedTodos[idx]

        todo.doneAt = todo.doneAt ? null : Date.now()

        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }

        noteService
            .save(updatedNote)
            .then(() => {
                setNotes(prevNotes => prevNotes.map(n => (n.id === updatedNote.id ? updatedNote : n)))
                showSuccessMsg('Todo updated')
            })
            .catch(err => {
                console.log('Problems updating todo:', err)
                showErrorMsg('Failed to update todo')
            })
    }

    if (!notes) return <div>Loading...</div>

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)
    return (
        <section className="note-index">
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <AddNote
                onAddNote={onAddNote}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onChangeBgnColorNote={onChangeBgnColorNote}
            />
            <h3 className="note-section-title">PINNED</h3>
            <NoteList
                notes={pinnedNotes}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onChangeBgnColorNote={onChangeBgnColorNote}
                onTogglePinNote={onTogglePinNote}
                onToggleTodo={onToggleTodo}
            />

            <h3 className="note-section-title">OTHERS</h3>
            <NoteList
                notes={unpinnedNotes}
                onRemoveNote={onRemoveNote}
                onDuplicateNote={onDuplicateNote}
                onChangeBgnColorNote={onChangeBgnColorNote}
                onTogglePinNote={onTogglePinNote}
                onToggleTodo={onToggleTodo}
            />
            <Outlet />
        </section>
    )
}
