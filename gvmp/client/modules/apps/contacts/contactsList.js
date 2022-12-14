import App from "../../app/app"
import player from "../../player/player"

class ContactsApp extends App {
    constructor() {
        super("ContactsApp")
    }

    onReady() {
        if (player.contacts.contacts == null) {
            player.contacts.request(() => {
                this.updateList()
            })
        } else {
            this.updateList()
        }
    }

    updateList() {
        this.callOnBrowser(`setContactListData('${player.contacts.toJson()}')`)
    }
}

export default new ContactsApp()