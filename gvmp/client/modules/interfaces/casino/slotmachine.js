import Window from "../../windows/window"

class SlotMachine extends Window {
    constructor() {
        super("SlotMachine")
        this.forwardableEvents.add("rollSlot")
        this.forwardableEvents.add("responseSlotInfo")
        this.forwardableEvents.add("responseRisiko")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new SlotMachine()
