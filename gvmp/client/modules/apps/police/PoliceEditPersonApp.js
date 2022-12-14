import App from "../../app/app"

class PoliceEditPersonApp extends App {
    constructor() {
        super("PoliceEditPersonApp")
        this.forwardableEvents.add("responsePersonData")
        this.forwardableEvents.add("responseOpenCrimes")
        this.forwardableEvents.add("responseJailTime")
        this.forwardableEvents.add("responseJailCosts")
        this.forwardableEvents.add("responseAkte")
        this.forwardableEvents.add("responseAktenList")
        this.forwardableEvents.add("responseLicenses")
    }
}

export default new PoliceEditPersonApp()