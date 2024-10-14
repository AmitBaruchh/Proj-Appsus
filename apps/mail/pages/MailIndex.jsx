const { useEffect, useState } = React

import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

export function MailIndex() {

    const [emails, setEmails] = useState(null)

    useEffect(() => {
        console.log('effect')
        loadMails()
    }, [emails])

    function loadMails() {
        // console.log('loadMails..')
        mailService.query()
            .then(setEmails)
            .catch(err => {
                console.log('problems getting mails:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setCars(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
            })
    }

    // function onSetFilterBy(filterBy) {
    //     setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    // }


    if (!emails) return <div>Loading...</div>
    return (<section className="mail-index">

        <MailList
            emails={emails}
            onRemoveMail={onRemoveMail}
        />

    </section>)
}

