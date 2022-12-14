import Window from "../../windows/window"
import player from "../../player/player"

class VoiceSettingsWindow extends Window {
    constructor() {
        super("VoiceSettings")
        this.setCurserVisible(true)
    }

    setTalking(state) {
        this.callOnBrowser(`updateTalking(${state})`)
    }
}

export default new VoiceSettingsWindow()
