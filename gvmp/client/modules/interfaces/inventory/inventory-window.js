import Window from "../../windows/window"

class InventoryWindow extends Window {
    constructor(){
        super("Inventory")
        /*this.forwardableEvents.add("setInventoryItems")*/
        this.setCurserVisible(true)

        this.forwardableEvents.add('responseInventoryClothes')
    }
}

export default new InventoryWindow()