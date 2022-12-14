import Component from "../../components/component"
import apps from "../../app/apps"
import callManageApp from "../../apps/callManage"
import homeApp from "../../apps/home"
import phone from "../../apps/phone"

class Smartphone extends Component {
    constructor() {
        super("Smartphone")
    }

    showCallScreen(){
        this.callOnBrowser(`showCallScreen()`)
        apps.SmartphoneApp = "PhoneScreen"
        mp.gui.cursor.visible = false
    }

    refreshSmartphone(){
        this.callOnBrowser(`refreshSmartphone()`)
    }

    onEvent(name, ...args) {
        if(name == "activateCursor") {
            mp.gui.cursor.visible = true
        }else if(name == "cleanSmartphone") {
            apps.componentVisibleApp["Smartphone"] = null
        }else if(name == "callDeclined"){
            callManageApp.declineCall()
            homeApp.declineCall()
        }else if(name == "callAccepted"){
            callManageApp.acceptedCall()
        }else if(name == "micmute"){
            callManageApp.micmute()
        }else if(name == "getHomeScreen"){
            phone.getHomeScreen()
        }else if(name == "getHomeScreenCall"){
            apps.SmartphoneApp = "MainScreen"
            homeApp.getHomeScreenCall()
            phone.getHomeScreenCall()
            mp.gui.cursor.visible = true
        }
    }
}

export default new Smartphone()