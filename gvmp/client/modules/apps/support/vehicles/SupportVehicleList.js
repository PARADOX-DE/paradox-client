import App from "../../../app/app"

class SupportVehicleList extends App {
    constructor() {
        super("SupportVehicleList")
        this.forwardableEvents.add("responseVehicleList")
    }
}

export default new SupportVehicleList()