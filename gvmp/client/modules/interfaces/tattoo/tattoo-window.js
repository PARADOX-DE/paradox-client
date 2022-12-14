import Window from '../../windows/window'
import Camera from '../../utils/bodyCamera'

class TattooWindow extends Window {
    constructor () {
        super('TattooShop')

        this.setCurserVisible(true)
        this.setChatVisible(false)

        this.forwardableEvents.add('responseTattooShopCategory')
    }

    onEvent (name, ...args) {
        switch (name) {
            case 'resetTattoos':
                this.resetTattoos()

                break
            case 'rotate':
                this.setHeading(args[0])

                break
            case 'zoneSelected':
                this.zoneSelected(args[0])

                break
        }
    }

    /**
     * Event if the window is loaded.
     */
    onReady () {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3)

        Camera.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z))
        Camera.pointBodyCameraAt(player.position)
    }

    /**
     * Event if the window has been closed.
     */
    onClose () {
        Camera.resetBodyCamera()
    }

    /**
     * Move the camera to a specific region according to zoneId.
     *
     * @param zoneId
     */
    zoneSelected (zoneId) {
        let player = mp.players.local,
            targetPositionFly, targetPositionPoint, offset

        switch (zoneId) {
            case 0: // TORSO
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, (player.position.z + 0.2))

                break
            case 1: // HEAD
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, (player.position.z + 0.5))

                break
            case 2: // LEFT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, (player.getHeading() + 90), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = player.position

                break
            case 3: // RIGHT ARM
                offset = this.offsetPosition(player.position.x, player.position.y, (player.getHeading() - 90), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = player.position

                break
            case 4: // LEFT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, (player.getHeading() + 90), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z - 0.6))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, (player.position.z - 0.6))

                break
            case 5: // RIGHT LEG
                offset = this.offsetPosition(player.position.x, player.position.y, (player.getHeading() - 90), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z - 0.6))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, player.position.z - 0.6)

                break
            // case 6: Not used.
            // case 7: Not used.
            case 8: // BACK
                offset = this.offsetPosition(player.position.x, player.position.y, (player.getHeading() + 180), 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, (player.position.z + 0.2))

                break
            case 9: // HAIR
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading() + 90, 1)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, (player.position.z + 0.5))
                targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, (player.position.z + 0.5))

                break
            default:
                offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3)

                targetPositionFly   = new mp.Vector3(offset.x, offset.y, player.position.z)
                targetPositionPoint = player.position
                break
        }

        Camera.flyBodyCameraTo(targetPositionFly)
        Camera.pointBodyCameraAt(targetPositionPoint)
    }

    /**
     * Reset player tattoos.
     */
    resetTattoos () {
        mp.players.local.clearDecorations()
    }

    /**
     * Set player heading.
     *
     * @param heading
     */
    setHeading (heading) {
        mp.players.local.setHeading(parseInt(heading))
    }

    /**
     * Get offset with rotation.
     *
     * @param x
     * @param y
     * @param rot
     * @param distance
     * @returns {{x: number, y: number}}
     */
    offsetPosition (x, y, rot, distance) {
        return {
            x: x + Math.sin(-rot * Math.PI / 180) * distance,
            y: y + Math.cos(-rot * Math.PI / 180) * distance,
        }
    }
}

export default new TattooWindow()