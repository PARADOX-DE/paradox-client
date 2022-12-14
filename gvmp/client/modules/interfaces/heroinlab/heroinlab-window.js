import Window from "../../windows/window"

class HeroinLaborWindow extends Window {
    constructor() {
        super("HeroinLabor")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new HeroinLaborWindow()
