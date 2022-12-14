class Utils {
    getDistance(pos1, pos2, useZ) {
        return mp.game.gameplay.getDistanceBetweenCoords(pos1.x, pos1.y, pos1.z, pos2.x, pos2.y, pos2.z, useZ);
    }

    calculateVectorDistance(pos1, pos2) {
        let x = pos1.x - pos2.x
        let y = pos1.y - pos2.y
        let z = pos1.z - pos2.z
        return new mp.Vector3(x<0?x*-1:x, y<0?y*-1:y, z<0?z*-1:z)
    }

    pointCameraAtFace() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 1, 0.7), 0, 40)
        const head = mp.players.local.getBoneCoords(31086, 0, 0, 0)
        camera.pointAtCoord(head.x, head.y, head.z)
        mp.game.cam.renderScriptCams(true, false, 0, true, false)
    }

    pointCameraAtBody() {
        const camera = mp.cameras.new("camera", mp.players.local.getOffsetFromInWorldCoords(0, 3, 1), 0, 40)
        const pos = mp.players.local.position
        camera.pointAtCoord(pos.x, pos.y, pos.z)
        mp.game.cam.renderScriptCams(true, false, 0, true, false)
    }

    disableCamera() {
        mp.game.cam.renderScriptCams(false, false, 0, false, false)

    }
    calcDist(v1, v2) {
        v1.x,
        v1.y,
        v1.z,
        v2.x,
        v2.y,
        v2.z
    }

    async loadAnimation(animation) {
        mp.game.streaming.requestAnimDict(animation);

        while (!mp.game.streaming.hasAnimDictLoaded(animation)) {
            await mp.game.waitAsync(5);
        }
    }
}

export default new Utils()
