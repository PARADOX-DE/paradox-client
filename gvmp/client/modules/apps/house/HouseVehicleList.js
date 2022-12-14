import App from "../../app/app"

class HouseVehicleList extends App {
    constructor() {
        super("HouseVehicleList")
        this.forwardableEvents.add("responseHouseVehicles")
    }
}

export default new HouseVehicleList()