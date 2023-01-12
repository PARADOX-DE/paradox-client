import Contact from './contact'
import player from '../../player/player'

class Contacts {
    constructor () {
        this.contacts = null
        this.callback = null

        mp.events.add('responsePhoneContacts', contactsString => {
            this.parseContacts(contactsString)

            if (mp.console) {
                // mp.console.logInfo(
                //     'Received contacts: ' + contactsString,
                // )
            }

            if (this.callback != null) {
                this.callback()
                this.callback = null
            }
        })
    }

    request (callback) {
        this.callback = callback

        mp.events.callRemote('requestPhoneContacts', player.remoteHashKey)
    }

    parseContacts (serverResponse) {
        this.contacts      = new Map()
        let serverContacts = JSON.parse(serverResponse)

        for (let data of serverContacts) {
            let number = Number(data['number'])
            this.contacts.set(number, new Contact(data['name'], number))
        }
    }

    updateContact (oldNumber, newNumber, name) {
        if (oldNumber !== newNumber) {
            this.contacts.delete(oldNumber)
            this.contacts.set(newNumber, new Contact(name, newNumber))
        } else {
            /*
            let contact = this.contacts.get(oldNumber)
            contact.name = name
            */
            this.contacts.delete(oldNumber)
            this.contacts.set(oldNumber, new Contact(name, oldNumber))
        }

        mp.events.callRemote('updatePhoneContact', oldNumber, newNumber, name, player.remoteHashKey)
        mp.events.callRemote('requestPhoneContacts', player.remoteHashKey)
    }

    addContact (number, name) {
        if (number == null) return
        if (this.contacts == null) this.contacts = new Map()

        if (this.contacts.has(number)) return
        this.contacts.set(number, new Contact(name, number))

        mp.events.callRemote('addPhoneContact', name, number, player.remoteHashKey)
        mp.events.callRemote('requestPhoneContacts', player.remoteHashKey)
    }

    removeContact (number) {
        this.contacts.delete(number)

        mp.events.callRemote('delPhoneContact', number, player.remoteHashKey)
        mp.events.callRemote('requestPhoneContacts', player.remoteHashKey)
    }

    getContact (number) {
      if (this.contacts == null) this.contacts = new Map()
        if (!this.contacts.has(number)) return null

        return this.contacts.get(number)
    }

    toJson () {
        var contacts = []
        for (let value of this.contacts.values()) {
            contacts.push(value)
        }

        return JSON.stringify(contacts)
    }
}

export default Contacts
