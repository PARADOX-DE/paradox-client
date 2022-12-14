import App from "../../app/app"
import player from "../../player/player"
import contactList from "./contactsList"

class ContactsAdd extends App {
    constructor() {
        super("ContactsAdd")
    }

    onEvent(name, ...args) {
        if(name == "addContact") {
            player.contacts.addContact(args[0].number, args[0].name)
            contactList.updateList()
        }
    }
}

export default new ContactsAdd()