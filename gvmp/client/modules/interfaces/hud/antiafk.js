import Component from "../../components/component"

class AntiAFK extends Component {
    constructor() {
        super("AntiAFK")
        this.power = false
        this.timeLeft = 60
    }

    setVisible() {
        this.callOnBrowser(`power=${true}`)
        this.callOnBrowser(`timeLeft=${60}`)
        mp.gui.cursor.visible = true
        mp.game.graphics.transitionToBlurred(250)
        mp.game.ui.displayHud(false);
        mp.game.ui.displayRadar(false);
    }

    onEvent(name, ...args) {
        if(name == "disableAntiAFK") {
            mp.gui.cursor.visible = false
            mp.game.graphics.transitionFromBlurred(250)
            mp.game.ui.displayHud(true);
            mp.game.ui.displayRadar(true);
        }
    }
}

export default new AntiAFK()
