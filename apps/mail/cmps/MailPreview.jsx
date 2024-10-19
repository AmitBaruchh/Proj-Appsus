export function MailPreview({ mail, onRemoveMail }) {

    function onReadMail({ target }) {
        let value = target.value
        if (mail.isRead) value = target.checked
        else value = !target.checked
    }

    return (
        <section className='row-mail-list'>
            <section className='row-info'>
                <td><label htmlFor=""></label><input onChange={onReadMail} type="checkbox" id="scales" name="scales" checked={mail.isRead} /></td>
                <td className='info'><span>{mail.from}</span></td>
                <td className='info'><span>{mail.subject}</span></td>
                <td className='info'><span>{mail.body}</span></td>
                <td><span>{mail.sentAt}</span></td>
            </section>

            <section class="email-action">
                <td><i class="material-symbols-outlined side-icon" onClick={() => onRemoveMail(mail.id)}>delete</i></td>
                <td><i class="material-symbols-outlined side-icon" onClick={() => onRemoveMail(mail.id)}>archive</i></td>
                {/* <td class="email-action"><span><button class="action-button" onClick={() => onRemoveMail(mail.id)}>Remove</button></span></td> */}
            </section>


        </section>
    )
}