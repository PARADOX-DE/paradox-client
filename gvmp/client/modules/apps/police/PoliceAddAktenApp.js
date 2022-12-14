import App from "../../app/app"

class PoliceAddAktenApp extends App {
    constructor() {
        super("PoliceAddAktenApp")
        this.forwardableEvents.add("responseAkte")
    }
}

export default new PoliceAddAktenApp()