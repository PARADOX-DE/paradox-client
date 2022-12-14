import Window from "../../windows/window"

class FlyerWindow extends Window {
    constructor() {
        super("Flyer")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new FlyerWindow()
