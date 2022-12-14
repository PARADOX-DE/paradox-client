import App from "../../app/app"
import Player from "../../player/player"

class NewsAddApp extends App {
    constructor() {
        super("NewsAddApp")
    }

    onReady() {
        this.callOnBrowser(`onReady('${Player.firstName}', '${Player.lastName}', '${Player.phone}', '${Player.teamRank}')`)
    }

    onEvent(name, ...args) {
        if(name == "getLocation"){
            const playerPos = mp.players.local.position;
            let x = Math.round(playerPos.x)
            let y = Math.round(playerPos.y)
            this.callOnBrowser(`setGPSdata('${x}','${y}')`)
        }
    }
}

export default new NewsAddApp()
