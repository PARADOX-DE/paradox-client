import Component from "../../components/component"

class GlobalNotification extends Component {
    constructor() {
        super("GlobalNotification")

        mp.events.add("sendGlobalNotification", (message, duration, color, icon) => {
            this.callOnBrowser(`setGlobalNotification('${message}', '${duration}', '${color}', '${icon}')`)
        })
    }
}

export default new GlobalNotification()