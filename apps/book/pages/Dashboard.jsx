const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { bookService } from '../services/book.service.js'

export function Dashboard() {
    const [books, setBooks] = useState([])
    const [categoryStats, setCategoryStats] = useState([])
    useEffect(() => {
        bookService.query().then(setBooks)
        bookService.getCategoriesStats().then(setCategoryStats)
    }, [])
    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {books.length} books</h2>
            <h4>By category</h4>
            <Chart data={categoryStats} />
        </section>
    )
}
