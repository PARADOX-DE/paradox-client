import App from "../../app/app"

class MessengerApp extends App {
    constructor() {
        super("MessengerMessageApp")
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

export default new MessengerApp()
