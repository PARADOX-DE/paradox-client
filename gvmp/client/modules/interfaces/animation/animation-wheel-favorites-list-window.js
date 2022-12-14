import Window from '../../windows/window'
import nMenu from '../hud/n-menu'

class AnimationWheelFavoritesList extends Window {
    constructor () {
        super('AnimationWheelFavoritesList')

        this.setCurserVisible(true)

        this.setChatVisible(false)
    }

    onEvent (name, ...args) {
        if(name === 'getAnimationShortcuts') {
            this.callOnBrowser(`setDataItemsAnimation('${JSON.stringify(nMenu.getItems())}')`)
        }
    }
}

export default new AnimationWheelFavoritesList()