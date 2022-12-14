import Window from '../../windows/window'
import Camera from '../../utils/bodyCamera'

class ClothingShop extends Window {
    constructor () {
        super('ClothingShop')

        this.setCurserVisible(true)
        this.setChatVisible(false)

        this.forwardableEvents.add('responseClothingShopCategories')
        this.forwardableEvents.add('responseClothingShopClothes')
    }

    onEvent (name, ...args) {
        switch (name) {
            case 'moveCam':
                this.moveCam(args[0].offset, args[0].slot, args[0].isX, args[0].isY)

                break
            case 'zoomToSlot':
                this.zoomToSlot(args[0].slot, args[0].isY)

                break
            case 'zoomOut':
                this.toInitialZoom()

                break
        }
    }

    /**
     * Calculates important movement data for given params.
     *
     * @param slot Which slot should be in focus?
     * @param isY  If true, right side will be in focus
     *
     * @returns {{distance: number, heading: number, camPos: {z: *}, pointPos: {z: *}}}
     */
    getMovementData (slot, isY) {
        let player = mp.players.local,
            data   = {
                heading : player.getHeading(),
                distance: 1,
                camPos  : {
                    z: player.position.z,
                },
                pointPos: {
                    z: player.position.z,
                },
            }

        switch (slot) {
            case '1': // Mask
                data.camPos.z += 0.5
                data.pointPos.z += 0.5

                break
            case '3': // Body
                data.distance = 3

                break
            case '4': // Legs
                data.camPos.z -= 0.6
                data.pointPos.z -= 0.6

                break
            case '5': // Backpack
                data.heading += 180
                data.camPos.z += 0.5
                data.pointPos.z += 0.2

                break
            case '6': // Shoes
                data.camPos.z -= 0.6
                data.pointPos.z -= 0.8

                break
            case '7': // Accessories
            case '8': // Undershirts
            case '11': // Tops
                data.camPos.z += 0.5
                data.pointPos.z += 0.2

                break
            case 'p-0': // Hat
                data.heading += 180
                data.distance = 2

                data.camPos.z += 1
                data.pointPos.z += 0.5

                break
            case 'p-1': // Glasses
                data.camPos.z += 0.5
                data.pointPos.z += 0.5

                break
            case 'p-2': // Ears
                data.heading = isY ? data.heading + 90 : data.heading - 90

                data.camPos.z += 0.5
                data.pointPos.z += 0.5

                break
            case 'p-6': // Watch
            case 'p-7': // Wrist
                data.heading = isY ? data.heading + 90 : data.heading - 90

                data.camPos.z += 0.3
                data.pointPos.z -= 0.1

                break
        }

        return data
    }

    /**
     * Moves the Camera to a given slot.
     *
     * @param slot Which slot should be in focus?
     * @param isY If true, right side will be used.
     */
    zoomToSlot (slot, isY) {
        let player              = mp.players.local,
            data                = this.getMovementData(slot, isY),
            offset              = this.offsetPosition(
                player.position.x, player.position.y, data.heading, data.distance,
            ),
            targetPositionFly   = new mp.Vector3(offset.x, offset.y, data.camPos.z),
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z)

        Camera.flyBodyCameraTo(targetPositionFly)
        Camera.pointBodyCameraAt(targetPositionPoint)
    }

    /**
     * Moves the cam around the player by a given heading offset.
     * It respects focused slots.
     *
     * @param heading Heading offset
     * @param slot Slot in focus
     * @param isX Is slot in focus?
     * @param isY Is slots right side in focus?
     */
    moveCam (heading, slot, isX, isY) {
        let player = mp.players.local,
            data, offset, targetPositionFly, targetPositionPoint

        if ((isX || isY) && slot !== null) {
            data   = this.getMovementData(slot, isY)
            offset = this.offsetPosition(
                player.position.x, player.position.y, (data.heading + heading), data.distance,
            )

            targetPositionFly   = new mp.Vector3(offset.x, offset.y, data.camPos.z)
            targetPositionPoint = new mp.Vector3(player.position.x, player.position.y, data.pointPos.z)

            Camera.flyBodyCameraTo(targetPositionFly)
            Camera.pointBodyCameraAt(targetPositionPoint)

            return
        }

        offset = this.offsetPosition(
            player.position.x, player.position.y, (player.getHeading() + heading), 3,
        )

        targetPositionFly   = new mp.Vector3(offset.x, offset.y, player.position.z)
        targetPositionPoint = player.position

        Camera.flyBodyCameraTo(targetPositionFly)
        Camera.pointBodyCameraAt(targetPositionPoint)
    }

    /**
     * Event if the window is loaded.
     */
    onReady () {
        this.toInitialZoom(true)
    }

    /**
     * Initial position if the player pressed E.
     *
     * @param create If true, a new cam will be created.
     */
    toInitialZoom (create = false) {
        let player = mp.players.local,
            offset = this.offsetPosition(player.position.x, player.position.y, player.getHeading(), 3),
            targetPositionFly,
            targetPositionPoint

        if (create) {
            Camera.createBodyCamera(new mp.Vector3(offset.x, offset.y, player.position.z))
            Camera.pointBodyCameraAt(player.position)
        }

        targetPositionFly   = new mp.Vector3(offset.x, offset.y, player.position.z)
        targetPositionPoint = player.position

        Camera.flyBodyCameraTo(targetPositionFly)
        Camera.pointBodyCameraAt(targetPositionPoint)
    }

    /**
     * Event if the window has been closed.
     */
    onClose () {
        Camera.resetBodyCamera()
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

export default new ClothingShop()
