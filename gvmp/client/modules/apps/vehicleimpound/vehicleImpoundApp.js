import App from "../../app/app"

class VehicleImpoundApp extends App {
    constructor() {
        super("VehicleImpoundApp")
        this.forwardableEvents.add("responseVehicleImpound")
    }
}

export default new VehicleImpoundApp()
