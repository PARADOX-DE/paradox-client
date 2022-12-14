import Window from "../../windows/window"
import player from "../../player/player"

class LoginWindow extends Window {
    constructor() {
        super("Login")
        this.forwardableEvents.add("status")
        this.setCurserVisible(true)
        this.setHudVisible(false)
        this.setChatVisible(false)
    }

    onEvent(name, ...args) {
        switch (name) {
            case "rank":                        
                player.rank = args[0]
                return
        }
    }

    onReady() {
        mp.game.graphics.transitionToBlurred(250);
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onClose() {
        mp.game.graphics.transitionFromBlurred(250);
        mp.game.ui.displayHud(true);
        mp.game.ui.displayRadar(true);
    }
}

export default new LoginWindow()
