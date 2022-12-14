class BodyCameraSingleton {
    constructor () {
        //
    }

    /**
     * Create a new camera at given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    createBodyCamera (position) {
        if (this.camera) return

        this.camera = mp.cameras.new('default', position, new mp.Vector3(0, 0, 0), 40) // name, position, rotation, fov (field of view)
        this.camera.setActive(true)
        mp.game.cam.renderScriptCams(true, false, 500, true, false)
    }

    /**
     * Set the camera to a given position.
     *
     * @param {{x: number, y: number, z: number}} position
     */
    setBodyCameraPosition (position) {
        if (!this.camera) return

        this.camera.setCoord(position.x, position.y, position.z)
    }

    /**
     * Make the camera fly to a specific position.
     *
     * @param position
     */
    flyBodyCameraTo (position) {
        if (!this.camera) return

        // Set "default" camera to not active this will enable the in game camera.
        this.camera.setActive(false)
        this.resetRenderScriptCams()

        // Create new camera at "default" camera position.
        let interpCamera = mp.cameras.new(
            'inter',
            this.camera.getCoord(),
            this.camera.getRot(2),
            this.camera.getFov(),
        ) // name, position, rotation, fov (field of view)

        // Set "default" camera to new position.
        this.camera.setCoord(position.x, position.y, position.z)
        this.camera.stopPointing()

        // Translate between newly created camera and "default" camera.
        this.camera.setActiveWithInterp(interpCamera.handle, 500, 0, 0)
        mp.game.cam.renderScriptCams(true, false, 500, true, false)

        // CleanUp
        interpCamera.destroy()
        interpCamera = null
    }

    flyBodyCameraWithFixedParams (heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition    = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance)

        this.flyBodyCameraTo(
            new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ),
        )

        this.pointBodyCameraAt(
            new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ),
        )
    }

    flyBodyCameraWithParams (rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition    = this.offsetPosition(playerPosition.x, playerPosition.y, (playerRotation + rotation), distance)

        this.flyBodyCameraTo(
            new mp.Vector3(newPosition.x, newPosition.y, (playerPosition.z + heightCamera)),
        )

        this.pointBodyCameraAt(
            new mp.Vector3(playerPosition.x, playerPosition.y, (playerPosition.z + (heightPointAt || heightCamera))),
        )
    }

    rotateBodyCameraWithParams (rotation, distance, heightCamera, heightPointAt) {
        let playerPosition = mp.players.local.position,
            playerRotation = mp.players.local.getHeading(),
            newPosition    = this.offsetPosition(playerPosition.x, playerPosition.y, (playerRotation + rotation), distance)

        this.setBodyCameraPosition(
            new mp.Vector3(newPosition.x, newPosition.y, (playerPosition.z + heightCamera)),
        )

        this.pointBodyCameraAt(
            new mp.Vector3(playerPosition.x, playerPosition.y, (playerPosition.z + (heightPointAt || heightCamera))),
        )
    }

    rotateBodyCameraWithFixedParams (heading, distance, cameraPosZ, PointPosZ) {
        let playerPosition = mp.players.local.position,
            newPosition    = this.offsetPosition(playerPosition.x, playerPosition.y, heading, distance)

        this.setBodyCameraPosition(
            new mp.Vector3(newPosition.x, newPosition.y, cameraPosZ),
        )

        this.pointBodyCameraAt(
            new mp.Vector3(playerPosition.x, playerPosition.y, PointPosZ),
        )
    }

    /**
     * Make the camera point to a specific coordinate.
     *
     * @param position
     */
    pointBodyCameraAt (position) {
        this.camera.pointAtCoord(position.x, position.y, position.z)
    }

    /**
     * Destroy the camera and reset everything to normal.
     *
     */
    resetBodyCamera () {
        if (!this.camera) return

        this.camera.setActive(false)
        this.camera.destroy()
        this.resetRenderScriptCams()

        this.camera = null
    }

    resetRenderScriptCams () {
        mp.game.cam.renderScriptCams(false, false, 3000, true, true)
    }

    /**
     * Calculates from a given position and a given "rotation" the position that is "distance" away.
     *
     * @param x
     * @param y
     * @param rotation
     * @param distance
     *
     * @returns {{x: number, y: number}}
     */
    offsetPosition (x, y, rotation, distance) {
        return {
            x: x + Math.sin(-rotation * Math.PI / 180) * distance,
            y: y + Math.cos(-rotation * Math.PI / 180) * distance,
        }
    }
}

export default new BodyCameraSingleton()
