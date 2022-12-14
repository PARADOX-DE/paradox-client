import components from './components'
import browser from '../browser/browser'

const MAX_STRING_SIZE = 10024
const timer           = ms => new Promise(res => setTimeout(res, ms))

class Component {
    constructor (name) {
        this.name              = name
        this.forwardableEvents = new Set()
        this.isReady           = false

        components.components.set(name, this)
    }

    /**
     * Component events listener.
     *
     * @param name
     * @param args
     */
    onEvent (name, ...args) {
        //
    }

    /**
     * Component is ready listener.
     */
    onReady () {
        this.isReady = true
    }

    /**
     * Handle incoming event calls made by the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingBrowserEventCall (name, args = null) {
        this.onEvent(name, args)
    }

    /**
     * Handle incoming event calls made by the server.
     *
     * If the event is registered as forwardable event,
     * the call will be forwarded to the ui browser.
     *
     * Fowardable events with big data will automatically be split and sent
     * as chunks to the browser.
     *
     * @param name
     * @param args
     */
    handleIncomingServerEventCall (name, ...args) {
        // If the event is not forwardable, we call the onEvent listener on this component.
        if (!this.forwardableEvents.has(name)) {
            this.onEvent(name, args)

            return
        }

        // For forwardable events the JavaScript code to execute will be prepared and sent to the ui browser.
        let eventArgsString = args.map(a => {
            return a.length === 0 ? `' '` : `'${a}'`
        }).join(',')

        if (eventArgsString.length <= MAX_STRING_SIZE) {
            this.callOnBrowser(`${name}(${eventArgsString})`)

            return
        }

        // String is too big to send it directly to the browser. This is why we split the string in chunks.
        let id          = this.makeId(32),
            chunkBucket = this.chunkString(JSON.stringify(args), MAX_STRING_SIZE),
            _this       = this

        chunkBucket.forEach(async (chunkData, chunkIndex) => {
            /*
                It is absolutely necessary to replace single backslashes with double backslashes.
                Otherwise they will be stripped off by browser.execute()!

                In case a string ends with backslash, we add $$_$$_ at the end of the chunk.
                This will be striped off again on browser side.

                Receiver is located at: gvmp/browser/src/components/BaseComponent.vue
            */
            chunkData = chunkData.replace(/\\/g, '\\\\')

            _this.callOnBrowser(
                `responseBigData('${id}', '${name}', '${chunkData}$$_$$_', ${chunkIndex}, ${chunkBucket.length})`,
            )

            // Give the browser some time to breath...
            await timer(250)
        })
    }

    /**
     * Calls JavaScript code inside the ui browser.
     *
     * Component name will be added.
     * Call is made as `components.COMPONENT_NAME.EXECUTE`
     *
     * @param {string} execute
     */
    callOnBrowser (execute) {
        browser.execute(this.name, execute)
    }

    /**
     * Create a length long alphanumeric string.
     *
     * @param {number} length
     *
     * @return {string}
     */
    makeId (length) {
        let result           = '',
            characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charactersLength = characters.length

        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    /**
     * Chunk a string by length.
     *
     * @param {string} str
     * @param {number} size
     *
     * @return {string[]}
     */
    chunkString (str, size) {
        const numChunks = Math.ceil(str.length / size)
        const chunks    = new Array(numChunks)

        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
            chunks[i] = str.substr(o, size)
        }

        return chunks
    }
}

export default Component
