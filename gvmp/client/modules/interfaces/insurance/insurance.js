import Window from "../../windows/window"

class InsuranceWindow extends Window {
    constructor() {
        super("Insurance")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

export default new InsuranceWindow()
