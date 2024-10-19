const { useState } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function AddReview() {
    const { bookId } = useParams()
    const [review, setReview] = useState(bookService.getEmptyReview())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        bookService
            .addReview(bookId, review)
            .then(() => {
                showSuccessMsg('Review added successfully!')
                setReview(bookService.getEmptyReview())
            })
            .catch(err => {
                console.error('Failed to add review:', err)
                showErrorMsg(`Failed to add the review ${review} to ${bookId}`)
            })
    }

    function onClose() {
        navigate(`/book/${bookId}`)
    }

    return (
        <section className="add-review">
            <form onSubmit={onSubmitReview}>
                <label>
                    <h6>Full Name:</h6>
                    <input type="text" name="fullname" value={review.fullname} onChange={handleChange} required />
                </label>

                <label>
                    <h6>Rating:</h6>
                    <select name="rating" value={review.rating} onChange={handleChange}>
                        <option value={0}></option>
                        <option value={1}>★</option>
                        <option value={2}>★★</option>
                        <option value={3}>★★★</option>
                        <option value={4}>★★★★</option>
                        <option value={5}>★★★★★</option>
                    </select>
                </label>
                <label>
                    <h6> Date Read:</h6>
                    <input type="date" name="readAt" value={review.readAt} onChange={handleChange} />
                </label>
                <section className="form-btns">
                    <button className="submit-btn" type="submit">
                        Submit Review
                    </button>
                    <button onClick={onClose} className="close-btn">
                        X
                    </button>
                </section>
            </form>
        </section>
    )
}
