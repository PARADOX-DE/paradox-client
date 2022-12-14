import App from "../../app/app"
import player from "../../player/player"
import contactList from "./contactsList"

class ContactsOverview extends App {
    constructor() {
        super("ContactsOverview")
    }

    onEvent(name, ...args) {
        if(name == "getLocation"){
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x)
            let y = Math.round(playerPos.y)
            this.callOnBrowser(`setGPSdata('${x}','${y}')`)
        }
        else if(name == "updateContact" && args[0]) {
            player.contacts.updateContact(args[0].storeNumber, args[0].editNumber, args[0].editName)
            contactList.updateList()
        }
        else if(name == "removeContact" && args[0]) {
            player.contacts.removeContact(args[0].number)
            contactList.updateList()
        }
    }
}

export default new ContactsOverview()