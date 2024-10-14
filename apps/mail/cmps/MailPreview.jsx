import { mailService } from "../services/mail.service.js"


export function MailPreview({ mail }) {

    function onReadMail({ target }) {
        let value = target.value
        if (mail.isRead) value = target.checked
        else value = !target.checked
    }

    return (
        <React.Fragment>
            <td><label htmlFor=""></label><input onChange={onReadMail} type="checkbox" id="scales" name="scales" checked={mail.isRead} /></td>
            <td><span>{mail.from}</span></td>
            <td><span>{mail.subject}</span></td>
            <td><span>{mail.body}</span></td>
            <td><span>{mailService.formatTime(mail.sentAt)}</span></td>
        </React.Fragment>
    )
}