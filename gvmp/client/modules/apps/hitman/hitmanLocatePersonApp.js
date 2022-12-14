import App from "../../app/app"

class HitmanLocatePersonApp extends App {
    constructor() {
        super("HitmanLocatePersonApp")
    }
    onEvent(name, ...args) {
        if (name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new HitmanLocatePersonApp()
