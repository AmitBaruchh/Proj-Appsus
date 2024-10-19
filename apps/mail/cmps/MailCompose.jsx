const { useState } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose({ onNewMailAdded }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const [isFormVisible, setIsFormVisible] = useState(false)

    function onCompose() {
        setIsFormVisible(isFormVisible => !isFormVisible)
    }




    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(newMail)
            .then((newMail) => {
                onNewMailAdded(newMail)
                setNewMail(mailService.getEmptyMail()) // Reset the form after submission
                setIsFormVisible(false)
            })
            .catch(err => {
                console.log('err:', err)
            })
        loadMails()
    }

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
        setNewMail(prevMails => ({ ...prevMails, [field]: value }))
    }

    function onCloseForm() {
        setIsFormVisible(false)
    }

    return (
        <section className='mail-compose'>
            <button className='compose-button' onClick={onCompose}><i className="material-symbols-outlined icon">
                edit
            </i>Compose</button>
            {isFormVisible && (
                <section className='new-message-form'>
                    <section className='header'>
                        <h2>New Message</h2>
                        <i className="material-symbols-outlined icon close-icon" onClick={onCloseForm} >close</i>
                    </section>
                    <form className='add-form' onSubmit={onSendMail}>
                        <label htmlFor="to">To:</label>
                        <input value={newMail.to} onChange={handleChange} type="text" name="to" id="to" placeholder="To" />

                        <label htmlFor="subject">Subject:</label>
                        <input value={newMail.subject} onChange={handleChange} type="text" name="subject" id="subject" placeholder="Subject" />

                        <label htmlFor="body">Body:</label>
                        <textarea value={newMail.body} onChange={handleChange} name="body" id="body" placeholder="Write your message here..."></textarea>

                        {/* <label htmlFor="body">Body:</label>
                        <input className='body-input' value={newMail.body} onChange={handleChange} type="text" name="body" id="body" placeholder="Write your message here..." /> */}


                        <div className="toolbar">
                            <div className="actions">
                                <button type="submit">Send</button>
                            </div>
                            <div className="icons">
                                <i className="material-symbols-outlined icon">attach_file</i>
                                <i className="material-symbols-outlined icon">insert_link</i>
                                <i className="material-symbols-outlined icon">mood</i>
                            </div>
                        </div>
                    </form>
                </section>
            )}
        </section>

    )
} 