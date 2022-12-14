import Window from "../../windows/window"
import player from "../../player/player"

class ChatWindow extends Window {
    constructor() {
        super("Chat")
        this.setCurserVisible(true)
        this.lastCommands = []
    }

    onEvent(name, ...args) {
        if (name == "setChatFlag") {
            player.setPlayerChatFlag(args[0])
        } else if (name === "pushCommand") {
            this.lastCommands.unshift(args[0].message)
        }
    }

    onReady() {
        this.callOnBrowser(`responseLastCommands("${this.lastCommands}")`)
    }
}

export default new ChatWindow()
