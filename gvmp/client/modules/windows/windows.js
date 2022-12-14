import browser from "../browser/browser"

class Windows {
    constructor() {
        this.windows = new Map()
        this.visibleWindow = null
        mp.events.add("openWindow", (name, args) => {
            console.log(`window opening; ${name} with ${args} args.`)
            // Check if an window with this name is registered
            if (!this.windows.has(name)) return
            let window = this.windows.get(name)
            window.show(args)
            //this.show(name, args)
        })
        mp.events.add("onWindowClosed", (name) => {
            console.log(`window closed from client; ${name}`)
            if (!this.windows.has(name)) return
            let window = this.windows.get(name)
            window.close(true)
        })
        mp.events.add("closeWindow", (name) => {
            console.log(`window closed from server; ${name}`)
            if (!this.windows.has(name)) return
            let window = this.windows.get(name)
            window.close()
        })
    }

    show(name, args) {
        this.visibleWindow = name
        if (args && args.length > 0) {
            browser.execute("Windows", `show("${name}", '${args}')`)
        } else {
            browser.execute("Windows", `show("${name}")`)
        }
    }

    close(name) {
        if (this.visibleWindow === name) {
            this.visibleWindow = null
        }
    }
}

export default new Windows()
