const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

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

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { title, price } = filterByToEdit


    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}
