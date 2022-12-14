import App from "../../app/app"

class GpsApp extends App {
    constructor() {
        super("GpsApp")
        this.forwardableEvents.add("gpsLocationsResponse")
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinates") {
          mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
      }
}

export default new GpsApp()