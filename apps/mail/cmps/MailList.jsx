import { MailPreview } from "./MailPreview.jsx";

export function MailList({ emails, onRemoveMail }) {

    return (
        <ul className="mail-list">
            {emails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)}>Remove</button>
                    </section>
                </li>
            )}
        </ul>
    )
}
