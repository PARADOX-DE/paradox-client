import App from "../app/app"

class ipadDesktop extends App {
    constructor() {
        super("IpadDesktopApp")
        this.forwardableEvents.add("responseIpadApps")
    }
}

export default new ipadDesktop()