import App from "../../app/app"

class VehicleOverviewApp extends App {
    constructor() {
        super("FahrzeugUebersichtApp")
        this.forwardableEvents.add("responseVehicleOverview")
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new VehicleOverviewApp()
