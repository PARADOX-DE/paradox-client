import App from "../app/app"

class laptopDesktop extends App {
    constructor() {
        super("LaptopDesktopApp")
        this.forwardableEvents.add("responseLaptopApps")
    }
}

export default new laptopDesktop()