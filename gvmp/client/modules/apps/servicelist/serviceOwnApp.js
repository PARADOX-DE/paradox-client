import App from "../../app/app"

class ServiceOwnApp extends App {
    constructor() {
        super("ServiceOwnApp")
        this.forwardableEvents.add("responseOwnServiceList")
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new ServiceOwnApp()