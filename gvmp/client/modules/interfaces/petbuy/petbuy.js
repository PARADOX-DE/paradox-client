import Window from "../../windows/window"

class PetBuyWindow extends Window {
    constructor() {
        super("PetBuy")
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

export default new PetBuyWindow()
