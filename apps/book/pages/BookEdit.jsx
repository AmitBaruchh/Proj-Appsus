const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId).then(setBookToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        if (field === 'amount' || field === 'isOnSale') {
            setBookToEdit(prevBook => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
        } else {
            setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
        }
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService
            .save(bookToEdit)
            .then(book => {
                console.log('Book Saved')
                showSuccessMsg('Book updated successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Error updating book')
            })
            .finally(() => {
                navigate('/book')
            })
    }

    function onCancelEdit() {
        showErrorMsg('Edit cancelled')
        setBookToEdit(null)
        navigate('/book')
    }

    const { title, description, listPrice } = bookToEdit
    const { amount, isOnSale } = listPrice

    return (
        <section className="book-edit">
            <h2 className="edit-book-header">Edit Book</h2>
            <form onSubmit={onSaveBook}>
                <div className="book-details-info-row">
                    <label className="book-details-info-title">Title:</label>
                    <input
                        type="text"
                        placeholder="Enter New Title"
                        name="title"
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <div className="book-details-info-row">
                    <label className="book-details-info-title">Description:</label>
                    <textarea
                        type="text"
                        placeholder="Enter New Title"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>

                <div className="book-details-info-row">
                    <label className="book-details-info-title">Price:</label>
                    <input type="number" placeholder="Set Price" name="amount" onChange={handleChange} value={amount} />
                </div>

                <div className="book-details-info-row">
                    <label className="book-details-info-title">On Sale:</label>
                    <input
                        type="checkbox"
                        placeholder="Set Price"
                        name="isOnSale"
                        onChange={handleChange}
                        checked={isOnSale}
                    />
                </div>

                <div className="book-edit-actions-container">
                    <button className="save-edit-btn">Save ✔</button>
                    <button type="button" className="cancel-edit-btn" onClick={onCancelEdit}>
                        Cancel ✖
                    </button>
                </div>
            </form>
        </section>
    )
}
