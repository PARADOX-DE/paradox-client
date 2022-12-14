import Window from "../../windows/window"

class GiveMoneyWindow extends Window {
    constructor() {
        super("GiveMoney")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new GiveMoneyWindow()
