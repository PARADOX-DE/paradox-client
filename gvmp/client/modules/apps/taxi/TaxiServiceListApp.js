import App from "../../app/app"

class TaxiServiceListApp extends App {
constructor() {
        super("TaxiServiceListApp")
        this.forwardableEvents.add("responseServiceList")
    }
}


export default new TaxiServiceListApp()