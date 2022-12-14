import App from "../../app/app"

class SettingsEditRingtonesApp extends App {
    constructor() {
        super("SettingsEditRingtonesApp")
        this.forwardableEvents.add("responseRingtoneList")
    }
}
export default new SettingsEditRingtonesApp()