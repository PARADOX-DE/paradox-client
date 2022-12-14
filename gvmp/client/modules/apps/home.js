import App from "../app/app"
import Smartphone from "../interfaces/hud/smartphone"

class HomeApp extends App {
    constructor() {
        super("HomeApp")
        this.forwardableEvents.add("responseApps")
        this.forwardableEvents.add("responsePhoneWallpaper")
    }

    declineCall(){
        this.callOnBrowser(`declineCall()`)
    }

    mutemode(){
        this.callOnBrowser(`changemute()`)
    }

    flymode(){
        this.callOnBrowser(`changefly()`)
    }

    anrufablehnen() {
        this.callOnBrowser(`changeanrufablehnen()`)
    }

    getHomeScreenCall(){
        this.callOnBrowser(`getHomeScreenCall()`)
    }

    onEvent(name, ...args) {
        if(name == "showCallScreen") {
            Smartphone.showCallScreen()
        }
    }
}

export default new HomeApp()