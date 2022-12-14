import App from "../app/app"
import Apps from "../app/apps"
import windows from "../windows/windows"
import player from "../player/player"
import browser from "../browser/browser"
import homeApp from "./home"
import callhistory from "./telefon/telefon"

class CallManageApp extends App {
    constructor() {
        super("CallManageApp")
        this.forwardableEvents.add("acceptCall")
        
        mp.events.add("cancelCall", () => {
            this.callOnBrowser(`cancelCall("[]")`)
            homeApp.declineCall()
            browser.execute("Smartphone", `change()`)
            Apps.SmartphoneApp = "MainScreen"
        })
    }

    declineCall(){
        this.callOnBrowser(`declineCallSmartphone()`)
    }

    micmute(){
        this.callOnBrowser(`changeMicMute()`)
    }

    acceptedCall(){
        this.callOnBrowser(`acceptCallSmartphone()`)
    }

    setPhoneCallData(data) {
        this.callOnBrowser(`setCallData('${data}', '${player.activeRingtone}', '${player.phonelautlos}')`)
        if (windows.visibleWindow != null) mp.gui.cursor.visible = true
    }

    onEvent(name, ...args) {
        if(name == "addCallToHistory"){
            player.historys.addCallToHistory(args[0].contact,args[0].number,args[0].time,args[0].accepted,args[0].method)
            callhistory.declineCall()
        }
    }
}

export default new CallManageApp()