import Window from "../../windows/window"
import player from "../../player/player"

class InputWindow extends Window {
    constructor() {
        super("TextInputBox")
        this.setCurserVisible(true)
        this.setChatVisible(false)
    }

    onEvent(name, ...args) {
        if(name == "setblur"){
            mp.game.graphics.transitionToBlurred(250);
        }
    }

    onReady() {
        this.callOnBrowser(`setProfile('${player.phone}','${player.money}')`)
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
    }
}

export default new InputWindow()
