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
    getDefaultFilter
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

function getEmptyMail(subject = 'subject', isRead = false) {
    return { subject, isRead }
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
            _createMail('New jobs posted from careers.sapiens.com'),
            _createMail(`Last week's updates in your shared folders`),
            _createMail('Dana reacted to a new post'),
            _createMail('This is why you’re not landing interviews')
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, isRead) {
    const mail = {
        id: makeId(),
        createdAt: Date.now(),
        subject: subject || 'subject',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: Date.now() + 30,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
    return mail
}
