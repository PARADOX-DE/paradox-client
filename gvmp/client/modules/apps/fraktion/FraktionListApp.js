import App from "../../app/app"

class FraktionListApp extends App {
    constructor() {
        super("FraktionListApp")
        this.forwardableEvents.add("responseMembers")
    }
}

export default new FraktionListApp()