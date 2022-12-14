import App from "../../app/app"
import player from "../../player/player";

class Telefon extends App {
    constructor() {
        super("Telefon")
    }

    declineCall(){
        if(player.historys.historys != null){
            this.callOnBrowser(`responsePhoneCalls('${player.historys.toJson()}')`)
        }
    }

    onReady() {
        if(player.historys.historys != null){
            this.callOnBrowser(`responsePhoneCalls('${player.historys.toJson()}')`)
        }
    }
}

export default new Telefon()