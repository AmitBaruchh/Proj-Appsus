

export function MailFolderList() {
    return (
        <div className="mail-folder-list">
            <div className='categories'>
                <i class="material-symbols-outlined side-icon">inbox</i>
                <i>Inbox</i>
            </div>
            <div className='categories'>
                <i class="material-symbols-outlined side-icon">star</i>
                <i>Starred</i>
            </div>
            <div className='categories'>
                <i class="material-symbols-outlined side-icon">send</i>
                <i>Sent</i>
            </div>
            <div className='categories'>
                <i class="material-symbols-outlined side-icon">draft</i>
                <i>Drafts</i>
            </div>
            <div className='categories'>
                <i class="material-symbols-outlined side-icon">delete</i>
                <i>Trash</i>
            </div>
        </div>
    )
}