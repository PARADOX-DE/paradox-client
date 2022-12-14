import Window from "../../windows/window"

class ConfirmWindow extends Window {
    constructor() {
        super("Confirmation")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new ConfirmWindow()