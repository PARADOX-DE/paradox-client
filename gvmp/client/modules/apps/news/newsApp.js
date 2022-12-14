import App from "../../app/app"
import Player from "../../player/player"

class NewsApp extends App {
    constructor() {
        super("NewsApp")
    }

    onReady() {
        this.setPlayerTeam()
    }

    setPlayerTeam(){
        this.callOnBrowser(`playerTeam=${Player.team}`)
    }
}

export default new NewsApp()
