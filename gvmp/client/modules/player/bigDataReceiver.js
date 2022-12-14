import Player from './player'

class BigDataReceiver {
    constructor () {
        mp.events.add('cDataReceiver-init', (id, eventName, size) => {
            // If bucket already created, abort
            if (Player.bigDataChunkBucket.hasOwnProperty(id)) return

            Player.bigDataChunkBucket[id] = {
                isComponent: false,
                eventName  : eventName,
                chunkSize  : size,
                bucket     : [],
            }

            mp.events.callRemote('sDataSender-initSuccess', id, Player.remoteHashKey)
        })

        mp.events.add('cDataReceiverComponent-init', (id, eventName, componentName, size) => {
            // If bucket already created, abort
            if (Player.bigDataChunkBucket.hasOwnProperty(id)) return

            Player.bigDataChunkBucket[id] = {
                isComponent  : true,
                componentName: componentName,
                eventName    : eventName,
                chunkSize    : size,
                bucket       : [],
            }

            mp.events.callRemote('sDataSender-initSuccess', id, Player.remoteHashKey)
        })

        mp.events.add('cDataReceiver-receive', (id, data, end, idx) => {
            // If bucket not existing, abort
            if (!Player.bigDataChunkBucket.hasOwnProperty(id)) return

            let bigBucket = Player.bigDataChunkBucket[id]

            bigBucket.bucket.push({
                index: idx,
                data : data,
            })

            // Nothing to do if not last chunk
            if (bigBucket.bucket.length !== bigBucket.chunkSize) return

            this.createDataStructure(bigBucket.bucket).then(stringData => {
                mp.events.callRemote('sDataSender-end', id, Player.remoteHashKey)

                if (bigBucket.isComponent) {
                    mp.events.call('componentServerEvent', ...[bigBucket.componentName, bigBucket.eventName, ...stringData])

                    return
                }

                mp.events.call(bigBucket.eventName, ...stringData)
            }).catch(() => {
                mp.events.callRemote('sDataSender-failed', id, Player.remoteHashKey)
            })
        })
    }

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

                // Last chance to fail...
                let returnData = JSON.parse(FinalDataString)

                resolve(returnData)
            } catch (e) {
                reject(-1)
            }
        })
    }

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
                        reject(-1)

                        return
                    }
                }

                resolve(sortedArray)
            } catch (e) {
                reject(e)
            }
        })
    }
}

export default new BigDataReceiver()