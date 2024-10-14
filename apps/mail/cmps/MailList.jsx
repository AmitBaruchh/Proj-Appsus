import { MailPreview } from "./MailPreview.jsx";

export function MailList({ emails, onRemoveMail }) {

    return (
        <tbody className='mail-list'>

            {emails.map(mail =>
                <tr key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                    </section>
                </tr>
            )}
        </tbody>

    )
}
