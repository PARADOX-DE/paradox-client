import Player from '../player/player'

class Components {
    constructor () {
        let _this = this

        this.components = new Map()

        mp.events.add('componentReady', function (componentName) {
            _this.onReady.call(_this, componentName)
        })

        mp.events.add('componentServerEvent', function (componentName, eventName, ...eventArgs) {
            _this.onIncomingServerEventCall.call(_this, componentName, eventName, ...eventArgs)
        })

        mp.events.add('componentEvent', function (componentName, eventName, eventArgsJson) {
            _this.onIncomingBrowserEventCall.call(_this, componentName, eventName, eventArgsJson)
        })

        mp.events.add('componentTriggerServerEvent', function (eventName, ...eventArgs) {
            _this.triggerServerEvent.call(_this, eventName, ...eventArgs)
        })

        mp.events.add('componentLog', function (...args) {
            mp.console.logInfo(JSON.stringify(args))
        })

        mp.events.add('componentLogSingle', function (arg) {
            mp.console.logInfo(arg)
        })
    }

    /**
     *
     *
     * @param componentName
     * @param eventName
     * @param eventArgs
     */
    onIncomingServerEventCall (componentName, eventName, ...eventArgs) {
        if (!this.components.has(componentName)) return

        this.components.get(componentName).handleIncomingServerEventCall(eventName, ...eventArgs)
    }

    /**
     *
     *
     * @param componentName
     */
    onReady (componentName) {
        if (!this.components.has(componentName)) return

        this.components.get(componentName).onReady()
    }

    /**
     * Call eventName on componentName.
     *
     * @param componentName
     * @param eventName
     * @param eventArgsJson Just one JSON string. // Don't ask, I dont know...
     */
    onIncomingBrowserEventCall (componentName, eventName, eventArgsJson) {
        if (!this.components.has(componentName)) return

        if (typeof eventArgsJson === 'undefined' || eventArgsJson === null) {
            this.components.get(componentName).handleIncomingBrowserEventCall(eventName)

            return
        }

        this.components.get(componentName).handleIncomingBrowserEventCall(eventName, JSON.parse(eventArgsJson))
    }

    /**
     * Call eventName on server.
     *
     * @param eventName
     * @param eventArgs
     */
    triggerServerEvent (eventName, ...eventArgs) {
        if (typeof eventArgs === 'undefined') {
            eventArgs = []
        }

        eventArgs.push(Player.remoteHashKey)

        mp.events.callRemote(eventName, ...eventArgs)
    }
}

export default new Components()
