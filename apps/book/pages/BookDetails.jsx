const { useParams, useNavigate, Link, Outlet } = ReactRouterDOM

import { bookService } from '../services/book.service.js'

const { useEffect, useState } = React

export function BookDetails() {
    const [book, setBook] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        loadBook()
        loadReviews()
    }, [bookId])

    function loadBook() {
        bookService
            .get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
                showErrorMsg('Failed to load the book details')
            })
    }

    function loadReviews() {
        bookService
            .getReviews(bookId)
            .then(reviews => {
                setReviews(reviews)
            })
            .catch(err => {
                console.log('Error loading reviews:', err)
            })
    }

    function onBack() {
        navigate('/book')
    }

    function onDeleteReview(reviewIdx) {
        const isConfirmed = window.confirm('Are you sure you want to delete this review?')
        if (!isConfirmed) {
            showErrorMsg('Review deletion was canceled')
            return
        }
        bookService
            .removeReview(bookId, reviewIdx)
            .then(() => {
                showSuccessMsg('Review deleted successfully!')
                loadReviews()
            })
            .catch(err => {
                console.error('Failed to delete review:', err)
                showErrorMsg('Failed to delete review')
            })
    }

    if (!book) return <div>Loading...</div>
    const {
        title,
        subtitle,
        authors,
        description,
        pageCount,
        categories,
        publishedDate,
        language,
        listPrice,
        thumbnail,
    } = book
    const { amount, currencyCode, isOnSale } = listPrice

    const readingType = bookService.getReadingType(pageCount)
    const publicationType = bookService.getPublicationType(publishedDate)
    const bookLanguage = bookService.getBookLng(language)
    const priceClass = amount > 150 ? 'price-red' : amount < 20 ? 'price-green' : ''

    return (
        <section className="book-details">
            <div className="book-details-titles">
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
            </div>
            <div className="book-details-content">
                <div className="text-content">
                    <h4>
                        Price:
                        <span className={priceClass}>
                            {' '}
                            {currencyCode} {amount}
                        </span>
                        {isOnSale && <span>(On Sale!)</span>}
                    </h4>
                    <div className="detail-item">
                        <h5>Authors:</h5>
                        <p>{authors.join(', ')}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Description:</h5>
                        <p>{description}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Page Count:</h5>
                        <p>
                            {pageCount} pages - {readingType}
                        </p>
                    </div>
                    <div className="detail-item">
                        <h5>Categories:</h5>
                        <p>{categories.join(', ')}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Published Date:</h5>
                        <p>{`${publishedDate} - ${publicationType}`}</p>
                    </div>
                    <div className="detail-item">
                        <h5>Language:</h5>
                        <p>{bookLanguage}</p>
                    </div>
                </div>
                <img src={thumbnail} alt={`Cover of ${title}`} />
            </div>

            <section className="review-list">
                <h4>Reviews:</h4>
                {reviews.length ? (
                    <table className="review-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Rating</th>
                                <th>Date Read</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((rev, idx) => (
                                <tr key={idx}>
                                    <td>{rev.fullname}</td>
                                    <td>{bookService.getStarRating(rev.rating)}</td>
                                    <td>{rev.readAt}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => onDeleteReview(idx)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No reviews yet</p>
                )}
            </section>

            <nav>
                <Link to={`/book/${bookId}/add-review`}>Add review</Link>
            </nav>
            <Outlet />
            <div className="book-details-buttons">
                <button>
                    <Link to={`/book/${book.prevBookId}`}>⬅ Prev Book</Link>
                </button>
                <button>
                    <Link to={`/book/${book.nextBookId}`}>Next Book ➡</Link>
                </button>
            </div>
            <div className="back-button-container">
                <button className="back-btn" onClick={onBack}>
                    Back
                </button>
            </div>
        </section>
    )
}
