const { useRef, useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailCompose() {
    const sectionRef = useRef()
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    // const isClicked = false

    useEffect(() => {
        sectionRef.current.classList.add('hide')
    }, [])

    function onCompose() {
        // console.log(sectionRef)
        sectionRef.current.classList.remove('hide')

    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(newMail)
            .then(setNewMail)
            .catch(err => {
                console.log('err:', err)
            }).then(
                sectionRef.current.classList.add('hide')
            )
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

    return (
        <section className='mail-compose'>
            <button className='compose-button' onClick={onCompose}><span class="material-symbols-outlined">
                edit
            </span>Compose</button>

            <section className='new-message-form hide' ref={sectionRef}>
                <h2>new message </h2>
                <form className='add-form' onSubmit={onSendMail}>

                    <label htmlFor="to">to:</label>
                    <input value={newMail.to} onChange={handleChange} type="text" name="to" id="to" />

                    <label htmlFor="subject">subject:</label>
                    <input type="text" onChange={handleChange} name="subject" id="subject" />

                    <label htmlFor="body">body:</label>
                    <input type="text" onChange={handleChange} name="body" id="body" placeholder="Write your message here..." />

                    <button>Send</button>
                </form>
            </section>

        </section>
    )
} 