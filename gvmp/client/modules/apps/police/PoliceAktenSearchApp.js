import App from "../../app/app"

class PoliceAktenSearchApp extends App {
    constructor() {
        super("PoliceAktenSearchApp")
        this.forwardableEvents.add("responsePlayerResults")
    }
}

export default new PoliceAktenSearchApp()