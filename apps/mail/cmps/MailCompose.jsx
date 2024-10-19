const { useState, useEffect, useRef } = React

import { mailService } from "../services/mail.service.js"
import { useAutoSaveDraft } from "../hooks/useAutoSaveDraft.jsx"

export function MailCompose({ onNewMailAdded }) {

    const [newMail, setNewMail] = useState(mailService.getEmptyMail())

    const [isFormVisible, setIsFormVisible] = useState(false)

    useAutoSaveDraft(isFormVisible, newMail, saveDraft);

    function saveDraft() {
        // Skip saving empty drafts
        if (!newMail.to && !newMail.subject && !newMail.body) return

        if (newMail.id) {
            mailService.saveDraft(newMail)
                .then(() => {
                    console.log('Draft updated successfully')
                })
                .catch(err => {
                    console.error('Failed to update draft:', err)
                })

        } else {
            mailService.saveDraft(newMail)
                .then((savedMail) => {
                    // Set the newly created mail with the draft ID
                    setNewMail(savedMail)
                    console.log('Draft saved successfully')

                })
                .catch(err => {
                    console.error('Failed to save draft:', err)
                })

        }
    }


    function onCompose() {
        setIsFormVisible(isFormVisible => !isFormVisible)
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.removeDraft(newMail.id)
        mailService.saveMail(newMail)
            .then((newMail) => {
                onNewMailAdded(newMail)
                setIsFormVisible(false)
                console.log('newMail ', newMail);
                setNewMail(mailService.getEmptyMail())
            })
            .catch(err => {
                console.log('err:', err)
            })
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