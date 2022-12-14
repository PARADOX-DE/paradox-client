import App from "../../app/app"
import Smartphone from "../../interfaces/hud/smartphone"

class SettingsEditWallpaperApp extends App {
    constructor() {
        super("SettingsEditWallpaperApp")
        this.forwardableEvents.add("responseWallpaperList")
    }

    onEvent(name, ...args) {
        if(name == "saveWallpaper") {
            Smartphone.refreshSmartphone()
        }
    }
}
export default new SettingsEditWallpaperApp()