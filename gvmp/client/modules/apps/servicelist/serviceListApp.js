import App from "../../app/app"

class ServiceListApp extends App {
    constructor() {
        super("ServiceListApp")
        this.forwardableEvents.add("responseOpenServiceList")
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new ServiceListApp()