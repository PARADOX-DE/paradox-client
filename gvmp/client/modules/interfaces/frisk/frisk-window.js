import Window from "../../windows/window"

class FriskWindow extends Window {
    constructor() {
        super("Frisk")
        this.forwardableEvents.add("closeFriskWindow")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new FriskWindow()
