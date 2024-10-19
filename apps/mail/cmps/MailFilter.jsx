const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name

        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const handleIsReadChange = (ev) => {
        const newIsRead = ev.target.value
        onSetFilterBy({ isRead: newIsRead === '' ? '' : newIsRead === 'true' })
    }

    const { subject, isRead } = filterBy

    return (
        <section>
            <section className="mail-filter" >
                <i className="material-symbols-outlined icon">search</i>
                <input value={subject || ""} onChange={handleChange} name="subject" className='mail-input' type="text" placeholder="Search mail" />
                <i className="material-symbols-outlined icon">tune</i>
            </section>
            <select value={isRead || ""} onChange={handleIsReadChange}>
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </section>
    )
}