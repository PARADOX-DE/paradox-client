import App from "../../app/app"

class VehicleTaxApp extends App {
    constructor() {
        super("VehicleTaxApp")
        this.forwardableEvents.add("responseVehicleTax")
    }
}

export default new VehicleTaxApp()
