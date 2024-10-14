// note service

// import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { loadFromStorage, saveToStorage } from '../../../services/storage.service.js'

const NOTE_DB = 'noteDB'
_createNotes()

export const noteService = {
    query, //* List
    get, //* Read
    remove, //* Delete
    save, //* Update/Create = f
}

function query() {
    return storageService.query(NOTE_DB)
}

function get(noteId) {
    return storageService.get(NOTE_DB, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_DB, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_DB, note)
    } else {
        return storageService.post(NOTE_DB, note)
    }
}

function _createNotes() {
    let notes = loadFromStorage(NOTE_DB)
    if (!notes || !notes.length) {
        const notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d',
                },
                info: {
                    txt: 'Fullstack Me Baby!',
                },
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://www.shutterstock.com/image-photo/friends-senior-young-man-walking-260nw-2223478821.jpg',
                    title: 'Bobi and Me',
                },
                style: {
                    backgroundColor: '#00d',
                },
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 },
                    ],
                },
            },
        ]
        saveToStorage(NOTE_DB, notes)
    }
}
