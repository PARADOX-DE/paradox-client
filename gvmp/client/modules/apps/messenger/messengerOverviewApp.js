import App from '../../app/app'
import player from '../../player/player'

class MessengerOverviewApp extends App {
    constructor () {
        super('MessengerOverviewApp')

        this.forwardableEvents.add('updateChat')
    }

    onReady () {
        this.callOnBrowser(`setOwnNumber('${player.phone}')`)
    }

    onEvent (name, ...args) {
        if (name === 'setGpsCoordinates') {
            mp.game.ui.setNewWaypoint(args[0].x, args[0].y)
        } else if (name === 'getLocation') {
            const playerPos = mp.players.local.position

            let x = Math.round(playerPos.x),
                y = Math.round(playerPos.y)

            this.callOnBrowser(`setGpsData('${x}','${y}')`)
        }
    }
}

export default new MessengerOverviewApp()
