import App from "../app/app"

class LifeInvaderApp extends App {
    constructor() {
        super("LifeInvaderApp")
        this.forwardableEvents.add("updateLifeInvaderAds")
    }
}

export default new LifeInvaderApp()
