import App from "../../app/app"

class TelefonSettings extends App {
    constructor() {
        super("TelefonSettings")
        this.forwardableEvents.add("responsePhoneData")
    }
}

export default new TelefonSettings()