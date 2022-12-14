import Component from "../../components/component"

class Hud extends Component {
    constructor() {
        super("Hud")
        this.windows = []
        mp.nametags.enabled = false
    }

    setVisible(visible) {
        this.callOnBrowser(`visible=${visible ? "true" : "false"}`)
    }

    addWindow(window, data) {
        this.windows.push({ name: window, data: data })
        this.callOnBrowser(`addWindow("${window}", '${data}')`)
    }

    removeWindow(window, dataFunction = null) {
        mp.gui.chat.push(JSON.stringify(this.windows))

        if (dataFunction == null) {
            this.callOnBrowser(`removeWindow("${window}")`)
        } else {
            this.callOnBrowser(
                `removeWindow("${window}", ${dataFunction.toString()})`
            )
        }

        for (var i = this.windows.length - 1; i >= 0; i--) {
            if (this.windows[i].name == window) {
                if (
                    dataFunction != null &&
                    !dataFunction(this.windows[i].data)
                ) {
                    continue
                }
                this.windows.splice(i, 1)
                return
            }
        }
    }
}

export default new Hud()
