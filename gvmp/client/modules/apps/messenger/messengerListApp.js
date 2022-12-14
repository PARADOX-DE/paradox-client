import App from "../../app/app"
import phone from "../phone"

class MessengerListApp extends App {
    constructor() {
        super("MessengerListApp")
        this.forwardableEvents.add("responseKonversations")
    }

    onEvent(name, ...args) {
        if(name == "getHomeScreen"){
            phone.getHomeScreen()
        }
    }
}
export default new MessengerListApp()