import Window from "../../windows/window"

class GarageWindow extends Window {
    constructor() {
        super("Garage")
        this.forwardableEvents.add("responseVehicleList")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new GarageWindow()
