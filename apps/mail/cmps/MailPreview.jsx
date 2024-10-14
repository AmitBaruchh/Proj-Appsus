export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">
            <h2>subject: {mail.subject}</h2>
        </article>
    )
}