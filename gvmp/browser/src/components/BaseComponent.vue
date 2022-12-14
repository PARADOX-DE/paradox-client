<script>
import global from './global'
import mp from '../mp'

if (global.components === undefined) {
    global.components = {}
}

export default {
    name: 'base-component',

    beforeMount () {
        if (this.$options.name === 'CalculatorApp') return

        global.components[this.$options.name] = this

        mp.trigger('componentReady', this.$options.name)
    },

    beforeUnmount () {
        delete global.components[this.$options.name]
    },

    methods: {
        /**
         * Trigger a client event for this component.
         *
         * @param eventName
         * @param eventArgsJson JSON string!
         */
        trigger (eventName, eventArgsJson = null) {
            if (eventArgsJson === null) {
                mp.trigger('componentEvent', this.$options.name, eventName)

                return
            }

            mp.trigger('componentEvent', this.$options.name, eventName, eventArgsJson)
        },

        /**
         * Trigger a server event for this component.
         *
         * @param eventName
         * @param eventArgs
         */
        triggerServer (eventName, ...eventArgs) {
            mp.trigger('componentTriggerServerEvent', eventName, ...eventArgs)
        },

        /**
         * Log to rage console.
         *
         * Args will be JSON.stringify.
         *
         * @param args
         */
        log (...args) {
            mp.trigger('componentLog', ...args)
        },

        /**
         * Log a single string to the rage console.
         *
         * @param arg
         */
        logSingle (arg) {
            mp.trigger('componentLogSingle', arg)
        },

        /**
         * Receive big data as single chunks sent by the client.
         *
         * @param {string} id Id of the actual send bucket.
         * @param {string} functionName Funktion which should be called after all chunks are received.
         * @param {string} chunk Actual chunk received.
         * @param {string} chunkIndex Actual index of the chunk received.
         * @param {string} bucketLength Length of the whole bucket.
         */
        responseBigData (id, functionName, chunk, chunkIndex, bucketLength) {
            if (typeof this[functionName] !== 'function') return

            if (!this.$bigDataChunkBucket.hasOwnProperty(id)) {
                this.$bigDataChunkBucket[id] = []
            }

            this.$bigDataChunkBucket[id].push({
                data : chunk,
                index: chunkIndex,
            })

            if (parseInt(bucketLength) !== this.$bigDataChunkBucket[id].length) return

            let _this = this

            // Handle rebuild of data.
            this.createDataStructure(this.$bigDataChunkBucket[id]).then(stringData => {
                _this[functionName](...stringData)
            }).catch((e) => {
                _this.log('Could not rebuild chunk data: ' + e)
            }).finally(() => {
                delete _this.$bigDataChunkBucket[id]
            })
        },

        /**
         * Rebuild data send via chunks.
         *
         * @param {[{data: string, index: string}]} chunkBucket
         *
         * @return {Promise<[]>}
         */
        createDataStructure (chunkBucket) {
            return new Promise(async (resolve, reject) => {
                let FinalDataString = ''

                try {
                    let BucketClone = chunkBucket

                    if (chunkBucket.length > 1) {
                        BucketClone = await this.sort(chunkBucket)
                    }

                    for (const chunk of BucketClone) {
                        FinalDataString += chunk.data
                    }

                    FinalDataString = FinalDataString.replace(/\$\$_\$\$_/g, '')

                    // Last chance to fail...
                    let returnData = JSON.parse(FinalDataString)

                    resolve(returnData)
                } catch (e) {
                    reject(e)
                }
            })
        },

        /**
         * Sort chunk bucket elements by index.
         *
         * @param {[{data: string, index: string}]} chunkBucket
         *
         * @return {Promise<[{data: string, index: string}]>}
         */
        sort (chunkBucket) {
            return new Promise((resolve, reject) => {
                try {
                    let sortedArray = [],
                        lastIndex   = -1

                    let BucketClone = chunkBucket

                    BucketClone.sort((a, b) => {
                        return parseInt(a.index) - parseInt(b.index)
                    })

                    // Check if everything is received
                    for (const arrayObject of BucketClone) {
                        if ((arrayObject.index - 1) === lastIndex) {
                            sortedArray.push(arrayObject)
                            lastIndex = BucketClone.indexOf(arrayObject)
                        } else {
                            reject('Array incomplete')

                            return
                        }
                    }

                    resolve(sortedArray)
                } catch (e) {
                    reject(e)
                }
            })
        },
    },
}
</script>
