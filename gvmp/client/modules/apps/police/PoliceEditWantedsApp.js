import App from "../../app/app"

class PoliceEditWantedsApp extends App {
    constructor() {
        super("PoliceEditWantedsApp")
        this.forwardableEvents.add("responseCategories")
        this.forwardableEvents.add("responseOpenCrimes")
        this.forwardableEvents.add("responseCategoryReasons")
    }
}

export default new PoliceEditWantedsApp()