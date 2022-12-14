import App from "../../app/app"

class BusinessDetail extends App {
    constructor() {
        super("BusinessDetailApp")
        this.forwardableEvents.add("responseBusinessDetailLinks")
        this.forwardableEvents.add("responseBusinessDetail")
    }

    onEvent(name, ...args) {
        if (name == "businessNotify") {
            mp.game.graphics.notify("Bitte warten Sie kurz.");
        }
    }
}

export default new BusinessDetail()