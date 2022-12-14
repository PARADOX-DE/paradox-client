import browser from "../browser/browser"
// let showCursor = () => mp.game.invoke("0xAAE7CE1D63167423")

class Apps {
    constructor() {
        this.apps = new Map()
        this.componentVisibleApp = new Map()
        this.SmartphoneApp = ""

        mp.events.add("openApp", (component, name, args) => {
            if (!this.apps.has(name)) return
            let app = this.apps.get(name)
            app.args = args
            this.show(component, name, args)
        })

        mp.events.add("openComputer", () => {
            this.show("Computer", "ComputerMainScreen")
        })

        mp.events.add("closeComputer", () => {
            this.show("Computer", null)
        })

        mp.events.add("openIpad", () => {
            this.show("Ipad", "IpadMainScreen")
        })

        mp.events.add("closeIpad", () => {
            this.show("Ipad", null)
        })

        mp.events.add("hatNudeln", (state) => {
            if(state) {
                this.show("Smartphone", "PhoneMainScreen")
            }else {
                this.show("Smartphone", null)
            }
        })
    }

    show(component = "Smartphone", name, args) {
        if (name == null) {
            this.componentVisibleApp[component] = name
            if(component == "Smartphone"){
                browser.execute(component, `invisible()`)

                // Make sure messenger app context menu is closed!
                browser.execute('MessengerOverviewApp', `hideActionSheet()`)
            }else{
                browser.execute(component, `show(null)`)
            }
            // mp.events.remove("render", showCursor)
            mp.gui.cursor.visible = false
        } else if(name == "CallManageApp") {
            this.SmartphoneApp = "PhoneScreen"
            mp.gui.cursor.visible = false
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                browser.execute(component, `show("${name}", '${args}')`)
            } else {
                browser.execute(component, `show("${name}")`)
            }

            // Make sure messenger app context menu is closed!
            browser.execute('MessengerOverviewApp', `hideActionSheet()`)
        } else {
            this.componentVisibleApp[component] = name
            if(component == "Smartphone"){
                if(this.SmartphoneApp == ""){
                    this.SmartphoneApp = "MainScreen"
                    mp.gui.cursor.visible = true
                }else if(this.SmartphoneApp == "MainScreen"){
                    mp.gui.cursor.visible = true
                }else if(this.SmartphoneApp == "PhoneScreen"){
                    mp.gui.cursor.visible = false
                }
            }else{
                mp.gui.cursor.visible = true
            }
            // mp.events.add("render", showCursor)
            if (args && args.length > 0) {
                browser.execute(component, `show("${name}", '${args}')`)
            } else {
                browser.execute(component, `show("${name}")`)
            }
        }
    }
}

export default new Apps()