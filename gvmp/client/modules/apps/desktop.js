import App from "../app/app"

class DesktopApp extends App {
    constructor() {
        super("DesktopApp")
        this.forwardableEvents.add("responseComputerApps")
    }
}

export default new DesktopApp()