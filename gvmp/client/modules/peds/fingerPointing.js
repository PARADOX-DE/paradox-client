import utils from "../utils/utils";
import player from "../player/player";
import peds from "../peds/peds";

class FingerPointing {
    constructor() {
        this.active = false
        this.camera = mp.cameras.new("gameplay")
        this.lastSent = 0
        this.interval = null

        mp.events.add("updatefingerPointing", async (netPlayer, camPitch, camHeading) => {
            if (netPlayer != null) {

                // Check Cuff states...
                if (netPlayer != mp.players.local) {
                    netPlayer.lastReceivedPointing = Date.now()
    
                    if (!netPlayer.pointingInterval) {
                        netPlayer.pointingInterval = setInterval((() => {
                            if ((Date.now() - netPlayer.lastReceivedPointing) > 1000) {
                                clearInterval(netPlayer.pointingInterval)
    
                                netPlayer.lastReceivedPointing = undefined
                                netPlayer.pointingInterval = undefined
    
                                mp.game.invoke("0xd01015c7316ae176", netPlayer.handle, "Stop")
    
                                if (!netPlayer.isInAnyVehicle(false)) {
                                    mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 1, 1, 1, 1)
                                }

                                netPlayer.setConfigFlag(36, false)
                            }
                        }).bind(netPlayer), 500)

                        await utils.loadAnimation("anim@mp_point")
                        mp.game.invoke("0x0725a4ccfded9a70", netPlayer.handle, 0, 1, 1, 1)
                        netPlayer.setConfigFlag(36, true)
                        netPlayer.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24)
                    }
    
                    mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Pitch", camPitch)
                    mp.game.invoke('0xd5bb4025ae449a4e', netPlayer.handle, "Heading", (camHeading * -1.0) + 1.0)
                    mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isBlocked", 0)
                    mp.game.invoke('0xb0a6cfd2c69c1088', netPlayer.handle, "isFirstPerson", 0)
                }
            }
        })
    }

    async start() {
        await utils.loadAnimation("anim@mp_point")
        mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 0, 1, 1, 1)
        mp.players.local.setConfigFlag(36, true)
        mp.players.local.taskMoveNetwork("task_mp_pointing", 0.5, false, "anim@mp_point", 24)
        //mp.game.streaming.removeAnimDict("anim@mp_point")
        this.interval = setInterval(this.show.bind(this), 0)
        this.active = true
    }

    stop() {
        mp.game.invoke("0xd01015c7316ae176", mp.players.local.handle, "Stop")
        if (!mp.players.local.isInAnyVehicle(false)) {
            mp.game.invoke("0x0725a4ccfded9a70", mp.players.local.handle, 1, 1, 1, 1)
        }
        mp.players.local.setConfigFlag(36, false)
        mp.players.local.clearTasks()
        clearInterval(this.interval)
        this.interval = null
        this.active = false
    }

    show() {
        mp.game.invoke("0x921ce12c489c4c41", mp.players.local.handle)

        const camRot = this.camera.getRot(2)
        let camPitch = camRot.x - mp.players.local.getPitch()

        if (camPitch < -70.0) {
            camPitch = -70.0
        }
        else if (camPitch > 42.0) {
            camPitch = 42.0
        }
        camPitch = (camPitch + 70.0) / 112.0

        let camHeading = mp.game.cam.getGameplayCamRelativeHeading()

        const cosCamHeading = mp.game.system.cos(camHeading)
        const sinCamHeading = mp.game.system.sin(camHeading)

        if (camHeading < -180.0) {
            camHeading = -180.0
        }
        else if (camHeading > 180.0) {
            camHeading = 180.0
        }
        camHeading = (camHeading + 180.0) / 360.0

        const coords = mp.players.local.getOffsetFromGivenWorldCoords((cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6)
        const blocked = (typeof mp.raycasting.testPointToPoint([coords.x, coords.y, coords.z - 0.2], [coords.x, coords.y, coords.z + 0.2], mp.players.local.handle, 7) !== 'undefined')

        camPitch = camPitch > 0.99999 ? 0.99999 : camPitch
        mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Pitch", camPitch)
        mp.game.invoke('0xd5bb4025ae449a4e', mp.players.local.handle, "Heading", camHeading * -1.0 + 1.0)
        mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isBlocked", blocked)
        mp.game.invoke('0xb0a6cfd2c69c1088', mp.players.local.handle, "isFirstPerson", mp.game.invoke('0xee778f8c7e1142e2', mp.game.invoke('0x19cafa3c87f7c2ff')) == 4)

        if ((Date.now() - this.lastSent) > 60) {
            this.lastSent = Date.now()
            mp.events.callRemote("updatefingerPointing", camPitch, camHeading, player.remoteHashKey)
        }
    }
}

export default new FingerPointing()