import Component from '../../components/component'
import PlayerPanel from '../hud/player-panel'

// @Deprecated
class Menu extends Component {
    constructor () {
        super('NativeMenu')

        this.forwardableEvents.add('createMenu')
        this.forwardableEvents.add('addItem')
        this.forwardableEvents.add('show')
        this.forwardableEvents.add('hide')
        this.forwardableEvents.add('showNativeMenu')

        this.visible = false
    }

    onEvent (name, ...args) {
        if (name === 'show') {
            this.visible = true

            PlayerPanel.executeDisplay(true)
        } else if (name === 'hide') {
            this.visible = false

            PlayerPanel.executeDisplay(false)
        } else if (name === 'activateCursor') {
            mp.gui.cursor.visible = true
        } else if (name === 'deactivateCursor') {
            mp.gui.cursor.visible = false
        }
    }
}

export default new Menu()