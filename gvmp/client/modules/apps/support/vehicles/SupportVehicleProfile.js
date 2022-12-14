import App from "../../../app/app"

class SupportVehicleProfile extends App {
    constructor() {
        super("SupportVehicleProfile")
        this.forwardableEvents.add("responseVehicleData")
    }
}

export default new SupportVehicleProfile()