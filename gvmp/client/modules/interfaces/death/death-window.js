import Window from "../../windows/window"

class DeathWindow extends Window {
    constructor() {
        super("Death")
        this.setCurserVisible(false)
        this.forwardableEvents.add("closeDeathScreen")
    }
}

export default new DeathWindow()