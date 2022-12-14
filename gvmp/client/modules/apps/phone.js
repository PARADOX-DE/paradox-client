import App from "../app/app"

class PhoneMainScreen extends App {
    constructor() {
        super("PhoneMainScreen")
    }

    getHomeScreen(){
        this.callOnBrowser(`getHomeScreen()`)
    }

    getHomeScreenCall(){
        this.callOnBrowser(`getHomeScreenCall()`)
    }
}

export default new PhoneMainScreen()
