import App from "../../app/app"
import player from "../../player/player"
import contactList from "./contactsList"

class ContactsEdit extends App {
    constructor() {
        super("ContactsEdit")
    }

    onEvent(name, ...args) {
        if(name == "updateContact" && args[0]) {
            player.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName)
            contactList.updateList()
        }
        else if(name == "removeContact" && args[0]) {
            player.contacts.removeContact(args[0].number)
            contactList.updateList()
        }
    }
}

export default new ContactsEdit()
