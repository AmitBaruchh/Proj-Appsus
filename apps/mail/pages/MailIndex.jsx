const { useEffect, useState } = React

import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { mailService } from "../services/mail.service.js"
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'

export function MailIndex() {

    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setEmails)
            .catch(err => {
                console.log('problems getting mails:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setEmails(mails => mails.filter(mail => mail.id !== mailId))
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
            })
    }



    // function onSetFilterBy(filterBy) {
    //     setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    // }


    if (!emails || !emails.length) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <section className='side-bar'>
                <MailCompose />
                <MailFolderList />
            </section>

            <section className='filter-list-container'>
                <MailFilter />
                <MailList
                    emails={emails}
                    onRemoveMail={onRemoveMail}
                />
            </section>
        </section>
    )
}

