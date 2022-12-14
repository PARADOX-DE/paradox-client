import Component from "../../components/component"
import player from "../../player/player"

class HelpPanel extends Component {
    constructor() {
        super("HelpPanel")
    }

    onReady() {
        if(player.level <= 3) {
          this.callOnBrowser(`showHelpPanel=true`)
        } else {
          this.callOnBrowser(`showHelpPanel=false`)
        }
    }
}

export default new HelpPanel()
