import Component from "../../components/component"
import player from "../../player/player"

class Progressbar extends Component {
    constructor() {
        super("Progressbar")

        mp.events.add("sendProgressbar", (duration) => {
            this.callOnBrowser(`setProgressbar('${duration}')`)
            player.progressbar = true;
        })
    }

    onEvent(name, ...args) {
        if (name == "StopProgressbar") {
            player.progressbar = false;
        }
    }
}

export default new Progressbar()