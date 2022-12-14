import App from "../../app/app"

class EmailApp extends App {
    constructor() {
        super("EmailApp")
        this.forwardableEvents.add("responseEmails")
    }
}

export default new EmailApp()