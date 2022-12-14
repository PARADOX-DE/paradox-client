import App from "../../app/app"

class VehicleClawUebersichtApp extends App {
    constructor() {
        super("VehicleClawUebersichtApp")
        this.forwardableEvents.add("responseVehicleClawOverview")
    }
}

export default new VehicleClawUebersichtApp()
