import Window from '../../windows/window'
import Camera from '../../utils/bodyCamera'

class BarberWindow extends Window {
    constructor () {
        super('Barber')

        this.setCurserVisible(true)
        this.setChatVisible(false)
    }

    onEvent (name, ...args) {
        switch (name) {
            case 'setHairVariant':
                mp.players.local.setComponentVariation(2, args[0], 0, 0)
                return
            case 'setHairColor':
                mp.players.local.setHairColor(args[0].color1, args[0].color2)
                return
            case 'setBeard':
                mp.players.local.setHeadOverlay(1, args[0].variation, args[0].opacity, args[0].color, 0)
                return
            case 'setChestHair':
                mp.players.local.setHeadOverlay(10, args[0].variation, args[0].opacity, args[0].color, 0)
                return
            case 'moveCam':
                this.moveCam(args[0].offset)

                break
        }
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     */
    moveCam (heading) {
        Camera.rotateBodyCameraWithParams(heading, 2, 1, 0.5)
    }

    /**
     * Event if the window is loaded.
     */
    onReady () {
        this.toInitialZoom(true)
    }

    /**
     * Event if the window has been closed.
     */
    onClose () {
        Camera.resetBodyCamera()
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom (create = false) {
        let player = mp.players.local

        if (create) {
            Camera.createBodyCamera(player.position)
        }

        Camera.flyBodyCameraWithParams(0, 2, 1, 0.5)
    }
}

export default new BarberWindow()
