import App from "../../app/app"
import player from "../../player/player"
import homeapp from "../home"

class SettingsApp extends App {
    constructor() {
        super("SettingsApp")
        this.forwardableEvents.add("responsePhoneSettings")
    }

    onEvent(name, ...args) {
        if (name == "lautlosStatus") {
            player.phonelautlos = args[0].status
            homeapp.mutemode()
        } else if (name == "flyStatus") {
            homeapp.flymode()
        } else if (name == "anrufAblehnen") {
            homeapp.anrufablehnen()
        }
    }
}

export default new SettingsApp()
