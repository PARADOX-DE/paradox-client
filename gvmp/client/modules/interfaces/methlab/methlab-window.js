import Window from "../../windows/window"

class MethLaborWindow extends Window {
    constructor() {
        super("MethLabor")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new MethLaborWindow()
