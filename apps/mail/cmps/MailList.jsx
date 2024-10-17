import { MailPreview } from "./MailPreview.jsx";

export function MailList({ emails, onRemoveMail }) {

    return (
        <table className='mail-table' >
            <tbody className='mail-list'>

                {emails.map(mail =>
                    <tr className='email-row' key={mail.id}>
                        <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                    </tr>
                )}
            </tbody>
        </table>
    )
}
