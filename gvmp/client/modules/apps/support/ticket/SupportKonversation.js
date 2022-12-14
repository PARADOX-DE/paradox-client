import App from "../../../app/app"

class SupportKonversation extends App {
    constructor() {
        super("SupportKonversation")
        this.forwardableEvents.add("responseSupportKonversation")
        this.forwardableEvents.add("updateSupportKonversation")
    }
}

export default new SupportKonversation()