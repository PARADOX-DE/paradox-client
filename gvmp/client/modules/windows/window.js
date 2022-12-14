import windows from "./windows"
import Component from "../components/component"
import peds from "../peds/peds"
import browser from "../browser/browser"

/* Window lifecycle
    onCreate()
        ↓
    onShow()
        ↓
    onDismiss()
        ↓
    onDestroy()
*/
class Window extends Component {
    constructor(name, ...events) {
        super(name, ...events)
        // Register window in windows
        windows.windows.set(name, this)

        // Default values
        this.cursorVisible = false
        this.hudVisible = true
        //this.chatVisible = true
    }

    setCurserVisible(visible) {
        this.cursorVisible = visible
    }

    setHudVisible(visible) {
        this.hudVisible = visible
    }

    setChatVisible(visible) {
        this.chatVisible = visible
    }



    show(args) {
        console.log(`window opening; ${this.name} with ${args} args.`)
        this.args = args
        mp.gui.cursor.visible = this.cursorVisible
        mp.game.ui.displayHud(this.hudVisible)
        //mp.gui.chat.show(this.chatVisible)
        peds.disableAllControls(true)
        this.onShow()

        windows.show(this.name, args)
    }

    isVisible() {
        return windows.visibleWindow === this.name
    }

    onShow() {
    }

    close(clientClose = false) {
        if (!clientClose) {
            browser.execute("Windows", `show("")`)
        }
        if (this.cursorVisible) {
            mp.gui.cursor.visible = false
        }
        if (!this.hudVisible) {
            mp.game.ui.displayHud(true)
        }
        /*
        if (!this.chatVisible) {
            mp.gui.chat.show(true)
        }
        */
        peds.disableAllControls(false)
        this.onClose()

        windows.close(this.name)
    }

    onClose() {
    }
}

export default Window
