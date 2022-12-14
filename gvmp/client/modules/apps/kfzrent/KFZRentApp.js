import App from "../../app/app"

class KFZRentApp extends App {
    constructor() {
        super("KFZRentApp")
        this.forwardableEvents.add("responsekfzrent")
    }
}

export default new KFZRentApp()