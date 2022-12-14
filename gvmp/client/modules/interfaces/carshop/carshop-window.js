import Window from "../../windows/window"

class CarshopWindow extends Window {
    constructor() {
        super("Carshop")
        this.forwardableEvents.add("responseVehicleList")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new CarshopWindow()
