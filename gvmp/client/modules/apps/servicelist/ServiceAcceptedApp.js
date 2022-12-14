import App from "../../app/app"

class ServiceAcceptedApp extends App {
    constructor() {
        super("ServiceAcceptedApp")
        this.forwardableEvents.add("responseTeamServiceList")
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinatesAccepted") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new ServiceAcceptedApp()