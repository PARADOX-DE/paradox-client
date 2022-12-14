import Window from "../../windows/window"

class CannabisLaborWindow extends Window {
    constructor() {
        super("CannabisLabor")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new CannabisLaborWindow()
