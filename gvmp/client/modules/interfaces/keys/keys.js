import Window from "../../windows/window"

class Keys extends Window {
    constructor() {
        super("Keys")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }
}

export default new Keys()
