

export function MailFolderList() {
    return (
        <div className="mail-folder-list">
            <div className='categories'>
                <span class="material-symbols-outlined side-icon">inbox</span>
                <span>Inbox</span>
            </div>
            <div className='categories'>
                <span class="material-symbols-outlined side-icon">star</span>
                <span>Starred</span>
            </div>
            <div className='categories'>
                <span class="material-symbols-outlined side-icon">send</span>
                <span>Sent</span>
            </div>
            <div className='categories'>
                <span class="material-symbols-outlined side-icon">draft</span>
                <span>Drafts</span>
            </div>
            <div className='categories'>
                <span class="material-symbols-outlined side-icon">delete</span>
                <span>Trash</span>
            </div>
        </div>
    )
}