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

function getEmptyMail(subject, from = 'user@appsus.com', isRead) {
    return {
        createdAt: Date.now(),
        subject,
        body: 'Would love to catch up sometimes',
        isRead: isRead || false,
        sentAt: formatTime(Date.now()),
        removedAt: null,
        from,
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
        mails = _generateMockMails(50);
        saveToStorage(MAIL_KEY, mails)
    }
}

// function _createMail(subject, isRead) {

//     const mail = getEmptyMail(subject, isRead)
//     mail.id = 
//     return mail
// }

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

function _generateMockMails(count) {
    const subjects = [
        'New jobs posted from careers.sapiens.com',
        'Meeting Tomorrow',
        'Invoice Due',
        'Weekend Plans',
        'Urgent: Update Required',
        'Party Invitation',
        'Newsletter Subscription',
        'Follow-up Required',
        'Congratulations!',
        'Appointment Reminder',
        'Holiday Discounts!',
        'Project Update',
        'Security Alert',
        'Password Reset Request',
        'Your Monthly Report',
        'Join us for a webinar',
        'Special Offer: 50% Off',
        'Your Order Has Shipped',
        'Survey Invitation',
        'Exclusive Event for Members',
        'System Maintenance Notification'
    ]


    const mockMails = [];

    for (let i = 0; i < count; i++) {
        const from = _getRandomEmail()
        const subject = subjects[Math.floor(Math.random() * subjects.length)]
        const isRead = Math.random() > 0.5 // Randomize isRead status
        const mail = getEmptyMail(subject, from, isRead)
        mail.id = makeId()
        let sentAt = _getRandomDate()
        mail.sentAt = sentAt
        mockMails.push(mail)
    }

    return mockMails
}

function _getRandomDate() {
    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    return new Date(Math.floor(Math.random() * (now - oneWeekAgo + 1)) + oneWeekAgo).getTime()
}

function _getRandomEmail() {
    const emailAddresses = [
        'alice@example.com',
        'bob@example.com',
        'charlie@example.com',
        'david@example.com',
        'eve@example.com',
        'frank@example.com',
        'grace@example.com',
        'heidi@example.com',
        'ivan@example.com',
        'judy@example.com'
    ]
    const from = emailAddresses[Math.floor(Math.random() * emailAddresses.length)]
    return from
}