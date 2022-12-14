import App from "../../app/app"

class TaxiListApp extends App {
    constructor() {
        super("TaxiListApp")
        this.forwardableEvents.add("responseTaxiList")
    }
}

export default new TaxiListApp()