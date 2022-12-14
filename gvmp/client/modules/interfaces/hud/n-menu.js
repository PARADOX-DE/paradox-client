import Component from '../../components/component'
import player from '../../player/player'

class NMenu extends Component {
    constructor () {
        super('NMenu')
        this.visible = false
    }

    setItems (items) {
        if (items == null) {
            return
        }

        this.visible = items.length > 0
        this.callOnBrowser(`setDataItems('${JSON.stringify(items)}')`)

        mp.gui.cursor.visible = this.visible
    }

    getItems () {
        if (player.isInAnyVehicle(true)) {
            return
        }

        return player.animations
    }

    onEvent (name, ...args) {
        if (name === 'select') {
            if (player.isInAnyVehicle(true)) {
                return
            }

            mp.events.callRemote('REQUEST_ANIMATION_USE', args[0], player.remoteHashKey)
        }
    }
}

export default new NMenu()