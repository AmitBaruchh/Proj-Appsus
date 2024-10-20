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
    save, //* Update/Create
    getEmptyNote,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_DB).then(notes => {
        if (filterBy.search) {
            const regExp = new RegExp(filterBy.search, 'i')
            notes = notes.filter(
                note =>
                    regExp.test(note.info.title || '') ||
                    regExp.test(note.info.txt || '') ||
                    (note.info.todos && note.info.todos.some(todo => regExp.test(todo.txt)))
            )
        }
        return notes
    })
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

function getEmptyNote(title = '', isPinned = false) {
    return { title, isPinned, createdA: Date.now() }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function getDefaultFilter() {
    return { search: '' }
}

function _createNotes() {
    let notes = loadFromStorage(NOTE_DB)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#A2D2DF',
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
            {
                id: 'n104',
                createdAt: 1112225,
                type: 'NoteTodos',
                isPinned: true,
                info: {
                    title: 'Shopping List',
                    todos: [
                        { txt: 'Eggs', doneAt: null },
                        { txt: 'Milk', doneAt: null },
                        { txt: 'Cornflakes', doneAt: 187111561 },
                        { txt: 'Cheese', doneAt: null },
                        { txt: 'Vegetables', doneAt: null },
                    ],
                },
            },

            {
                id: 'n105',
                createdAt: 1112226,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'data:image/png;base64,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',
                    title: 'USA Flag',
                },
                style: {
                    backgroundColor: '#f4f4f4',
                },
            },
            {
                id: 'n106',
                createdAt: 1112227,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#CBD2A4',
                },
                info: {
                    title: 'Happy Birthday Dad!',
                    txt: `Dear Dad, 
                            Wishing you the happiest of birthdays! 
                             Love you so much! 🎉🎂`,
                },
            },
            {
                id: 'n107',
                createdAt: 1112228,
                type: 'NoteVideo',
                isPinned: false,
                info: {
                    title: 'My video note',
                    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
                },
                style: {
                    backgroundColor: '#FFE3E3',
                },
            },
            {
                id: 'n108',
                createdAt: 1112230,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#FFCCBC',
                },
                info: {
                    txt: 'Workout Plan',
                },
            },
            {
                id: 'n109',
                createdAt: 1112231,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://www.worldpaintings.co.il/pub/68717/Landscape%20painting/Seascape%20paintings/AF-LA02022.jpg?quality=65&width=&height=&mode=max',
                    title: 'Sunset at the Beach',
                },
                style: {
                    backgroundColor: '#FFD09B',
                },
            },
            {
                id: 'n110',
                createdAt: 1112232,
                type: 'NoteTodos',
                isPinned: true,
                info: {
                    title: 'Weekend To-do',
                    todos: [
                        { txt: 'Clean the house', doneAt: null },
                        { txt: 'Go grocery shopping', doneAt: null },
                        { txt: 'Finish coding project', doneAt: 187112000 },
                    ],
                },
                style: {
                    backgroundColor: '#C8E6C9',
                },
            },
            {
                id: 'n111',
                createdAt: 1112233,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Workout List',
                    todos: [
                        { txt: 'Push-ups', doneAt: null },
                        { txt: 'Squats', doneAt: null },
                        { txt: 'Lunges', doneAt: null },
                        { txt: 'Plank', doneAt: null },
                        { txt: 'Jumping Jacks', doneAt: null },
                    ],
                },
                style: {
                    backgroundColor: '#FFEB3B',
                },
            },
            {
                id: 'n112',
                createdAt: 1112234,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#E1BEE7',
                },
                info: {
                    txt: 'Reminder: Call Mom',
                },
            },
            {
                id: 'n113',
                createdAt: 1112235,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://plus.unsplash.com/premium_photo-1697809257939-4f9d1b878d1f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBhZHZlbnR1cmV8ZW58MHx8MHx8fDA%3D',
                    title: 'Mountain Adventure',
                },
                style: {
                    backgroundColor: '#BBDEFB',
                },
            },
            {
                id: 'n114',
                createdAt: 1112236,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#FFAB91',
                },
                info: {
                    title: 'Recommended Restaurants',
                    txt: [
                        `1. Pizza Paradise
                   2. Sushi World 
                   3. Burger House 
                   4. Italian Delight
                   5. Vegan Vibes`,
                    ],
                },
            },
            {
                id: 'n115',
                createdAt: 1112237,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Things to Pack for Vacation',
                    todos: [
                        { txt: 'Passport', doneAt: null },
                        { txt: 'Sunglasses', doneAt: null },
                        { txt: 'Sunscreen', doneAt: null },
                        { txt: 'Beach Towels', doneAt: null },
                        { txt: 'Travel Guide', doneAt: null },
                    ],
                },
                style: {
                    backgroundColor: '#80DEEA',
                },
            },
            {
                id: 'n116',
                createdAt: 1112238,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZfKRU9Ty9A7lj9XlLx6IfaWFXX3BpHNagmQ&s',
                    title: 'Hanging out with friends',
                },
                style: {
                    backgroundColor: '#FFF176',
                },
            },
            {
                id: 'n117',
                createdAt: 1112239,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#FFCDD2',
                },
                info: {
                    title: 'Grocery List',
                    txt: `- Apples 
                   - Bananas
                   - Orange Juice
                   - Chicken
                   - Bread`,
                },
            },
            {
                id: 'n118',
                createdAt: 1112240,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Books to Read',
                    todos: [
                        { txt: 'To Kill a Mockingbird', doneAt: null },
                        { txt: '1984 by George Orwell', doneAt: null },
                        { txt: 'The Great Gatsby', doneAt: null },
                        { txt: 'Moby Dick', doneAt: null },
                        { txt: 'War and Peace', doneAt: null },
                    ],
                },
                style: {
                    backgroundColor: '#FFECB3',
                },
            },
            {
                id: 'n119',
                createdAt: 1112241,
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'https://meet-thelocals.com/wp-content/uploads/2019/10/Eiffel-Tower-view-Paris.jpg',
                    title: 'Eiffel Tower View',
                },
                style: {
                    backgroundColor: '#B39DDB',
                },
            },
            {
                id: 'n120',
                createdAt: 1112234,
                type: 'NoteCanvas',
                isPinned: true,
                style: {
                    backgroundColor: '#f4f4f4',
                },
                info: {
                    title: 'Canvas Note',
                },
            },
        ]

        saveToStorage(NOTE_DB, notes)
    }
}
