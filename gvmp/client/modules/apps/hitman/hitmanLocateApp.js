import App from "../../app/app"

class HitmanLocateApp extends App {
    constructor() {
        super("HitmanLocateApp")
        this.forwardableEvents.add("responseHitmanLocatedPpl")
    }
}

export default new HitmanLocateApp()
