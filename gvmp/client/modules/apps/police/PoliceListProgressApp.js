import App from "../../app/app"

class PoliceListProgressApp extends App {
    constructor() {
        super("PoliceListProgressApp")
        this.forwardableEvents.add("responseCrimeProgress")
    }
}

export default new PoliceListProgressApp()