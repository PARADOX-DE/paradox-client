import Component from "../../components/component"
import player from "../../player/player"

class PlayerNotification extends Component {
    constructor() {
        super("PlayerNotification")

        mp.events.add("sendPlayerNotification", (message, duration, color, title, bgcolor) => {
            if(player.phonelautlos == false){
                mp.game.audio.playSoundFrontend(1, "ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET", true)
            }
            this.callOnBrowser(`pushPlayerNotification('${message}', '${duration}', '${player.phonelautlos}', '${color}', '${title}', '${bgcolor}')`)
        })
    }
}

export default new PlayerNotification()