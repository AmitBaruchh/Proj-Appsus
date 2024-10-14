import { storageService } from "../../../services/async-storage.service.js"
import { makeId } from "../../../services/util.service.js"
import { loadFromStorage, saveToStorage } from "../../../services/storage.service.js"

const MAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    formatTime
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = 'subject', isRead) {

    return {
        createdAt: Date.now(),
        subject: subject || 'subject',
        body: 'Would love to catch up sometimes',
        isRead: isRead || false,
        sentAt: Date.now() + 30,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}

function getDefaultFilter() {
    return {
        subject: '',
        isRead: false,
    }
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('New jobs posted from careers.sapiens.com', true),
            _createMail(`Last week's updates in your shared folders`),
            _createMail('Dana reacted to a new post', true),
            _createMail('This is why you’re not landing interviews')
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, isRead) {

    const mail = getEmptyMail(subject, isRead)
    mail.id = makeId()
    return mail
}

function formatTime(timestamp) {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

    // If the time difference is more than 24 hours, return the date (in "month day" format)
    if (timeDifference > oneDayInMilliseconds) {
        const date = new Date(timestamp)
        const options = { month: 'short', day: 'numeric' }
        return date.toLocaleDateString('en-US', options)
    } else {
        // If within 24 hours, return the hours in "hh:mm AM/PM" format
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${ampm}`;
    }
}
