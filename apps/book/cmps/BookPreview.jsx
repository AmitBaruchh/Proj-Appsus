import { bookService } from '../services/book.service.js'

export function BookPreview({ book }) {
    const { title, listPrice, thumbnail, pageCount, publishedDate } = book
    const { amount, currencyCode, isOnSale } = listPrice

    const readingType = bookService.getReadingType(pageCount)
    const publicationType = bookService.getPublicationType(publishedDate)
    const priceClass = amount > 150 ? 'price-red' : amount < 20 ? 'price-green' : ''

    return (
        <article className="book-preview">
            {isOnSale && <div className="on-sale-sign">On Sale</div>}
            <h2> {title}</h2>
            <h4 className={priceClass}>
                {currencyCode} {amount}
            </h4>
            <img src={thumbnail} alt={`Cover of ${title}`} />
            <p>{readingType}</p>
            <p>{publicationType}</p>
        </article>
    )
}
