class Browser {
    constructor () {
        let _this = this

        this.ui    = null
        this.voice = null

        mp.events.add('guiReady', function () {
            _this.createBrowsers.call(_this)
        })
    }

    /**
     * Create browser for ui and voice if not existing.
     */
    createBrowsers () {
        if (!this.ui) {
            this.ui = mp.browsers.new('package://gvmp/index.html')
        }

        if (!this.voice) {
            this.voice = mp.browsers.new('')
        }
    }

    /**
     * Calls JavaScript code inside the browser.
     *
     * Call is made as `components.COMPONENT.EXECUTE`
     *
     * @param component Component to call.
     * @param execute JavaScript code to call.
     */
    execute (component, execute) {
        if (!this.ui) return

        this.ui.execute(`components.${component}.${execute}`)
    }
}

export default new Browser()