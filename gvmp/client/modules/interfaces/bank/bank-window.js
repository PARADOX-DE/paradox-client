import Window from "../../windows/window"

class BankWindow extends Window {
    constructor() {
        super("Bank")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new BankWindow()
