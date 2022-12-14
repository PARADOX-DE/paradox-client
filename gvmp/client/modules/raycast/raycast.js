class Raycast {
    constructor() {
        this.camera = mp.cameras.new("gameplay")
    }

    getCameraHitCoord() {
        let position = this.camera.getCoord()
        let direction = this.camera.getDirection()
        let farAway = new mp.Vector3(
            direction.x * 12 + position.x,
            direction.y * 12 + position.y,
            direction.z * 12 + position.z
        )
        let hitData = mp.raycasting.testPointToPoint(
            position,
            farAway,
            mp.players.local
        )

        if (hitData != undefined) {
            return hitData
        }
        return null
    }

    createRaycast() {
        let obj = this.getCameraHitCoord()
        if (obj == null) {
            mp.gui.chat.push("no obj found")
        } else {
            if (obj.entity == null || obj.entity == undefined) return null
            if (obj.entity.handle == null || obj.entity.handle == undefined) return null

            let entityCheck = mp.game.entity.isAnEntity(obj.entity.handle)
            if(entityCheck) {
                return obj
            }

            return null
        }
        return null
    }
}

export default new Raycast()
