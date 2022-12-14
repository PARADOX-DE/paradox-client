import Window from "../../windows/window"

class CarshopWindow extends Window {
    constructor() {
        super("BuyCarShop")
        this.forwardableEvents.add("requestCarshopList")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new CarshopWindow()
