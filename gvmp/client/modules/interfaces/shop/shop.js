import Window from "../../windows/window"

class ShopWindow extends Window {
    constructor() {
        super("Shop")
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

export default new ShopWindow()
