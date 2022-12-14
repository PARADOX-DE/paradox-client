import App from "../../app/app"
import Player from "../../player/player"

class NewsListApp extends App {
    constructor() {
        super("NewsListApp")
        this.forwardableEvents.add("updateNews")
    }
    onReady() {
        this.callOnBrowser(`onReady('${Player.team}','${Player.firstName}', '${Player.lastName}', '${Player.teamRank}')`)
    }

    onEvent(name, ...args) {
        if(name == "setGpsCoordinates") {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        }
    }
}

export default new NewsListApp()


