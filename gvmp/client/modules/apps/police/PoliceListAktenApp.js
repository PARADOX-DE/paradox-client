import App from "../../app/app"

class PoliceListAktenApp extends App {
    constructor() {
        super("PoliceListAktenApp")
        this.forwardableEvents.add("responseAktenList")
    }
}

export default new PoliceListAktenApp()