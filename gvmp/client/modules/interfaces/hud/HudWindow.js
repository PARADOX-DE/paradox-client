import hud from "./hud"

class HudWindow {
    constructor(name, dataFunction = null) {
        this.name = name
        this.dataFunction = dataFunction
    }

    show(data) {
        hud.addWindow(this.name, data)
    }

    hide() {
        hud.removeWindow(this.name, this.dataFunction)
    }

    isVisible() {
        for (let window of hud.windows) {
            if (window.name != this.name) continue
            if (this.dataFunction(window.data)) return true
        }
        return false
    }
}

export default HudWindow
