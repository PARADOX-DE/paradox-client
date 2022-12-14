import App from "../../app/app"

class BusinessApp extends App {
    constructor() {
        super("BusinessApp")

        this.forwardableEvents.add("responseBusinessMembers")
        this.forwardableEvents.add("responseBusinessMOTD")
    }
}

export default new BusinessApp()