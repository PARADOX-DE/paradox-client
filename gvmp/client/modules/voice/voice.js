import browser from "../browser/browser"
import player from "../player/player"
import apps from "../app/apps"
import callManage from "../apps/callManage"

class Voice {
    constructor() {
        this.radioChatPlayers = ''
        this.radioAirFunkPlayers = ''
        this.serverId = 1
        this.voiceChannel = ''
        this.voicePassword = ''
        this.streamingRangePlayer = []
        this.phonePartner = ''

        mp.events.add('setPhoneCallData', (data) => {
            if (browser.voice == null) return
            apps.show("Smartphone", "CallManageApp")
            callManage.setPhoneCallData(data)
        })

        mp.events.add('ConnectTeamspeak', () => {
            if (browser.voice == null) return
            browser.voice.reload(false);
        })

        mp.events.add('setVoiceData', (serverId, voiceChannel, voicePassword) => {
            this.serverId = serverId
            this.voiceChannel = voiceChannel
            this.voicePassword = voicePassword
        })

        mp.events.add('setRadioChatPlayers', (radioChatPlayers) => {
            this.radioChatPlayers = radioChatPlayers
        })

        mp.events.add('setAirFunkPlayers', (funkPlayers) => {
            this.radioAirFunkPlayers = funkPlayers
        })

        mp.events.add('setCallingPlayer', (phonePartner) => {
            this.phonePartner = phonePartner
        })

        mp.events.add('entityStreamIn', (entity) => {
            if (entity != null && entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                this.streamingRangePlayer.push(entity)
            }
        })

        mp.events.add('entityStreamOut', (entity) => {
            if (entity.type == "player" && mp.players.exists(entity) && entity.getVariable("voiceHash")) {
                let index = this.streamingRangePlayer.indexOf(entity)

                if (index > -1) {
                    this.streamingRangePlayer.splice(index, 1)
                }
            }
        })

        var voice = this

        setInterval(function () {
            let hash = player.voiceHash
            if (hash !== "" && browser) {
                let user = player.getPlayer()
                let playerRotation = mp.game.cam.getGameplayCamRot(0)
                let rotation = Math.PI / 180 * (playerRotation.z * -1)
                let voicePlayers = []

                if (voice.phonePartner && voice.phonePartner !== "") {
                    voicePlayers.push(voice.phonePartner + "~3~0~0~2")
                }

                if (voice.streamingRangePlayer != null) {
                    for (var i = 0; i < voice.streamingRangePlayer.length; i++) {

                        let streamedPlayer = voice.streamingRangePlayer[i]
                        if (streamedPlayer == null || !mp.players.exists(streamedPlayer) || streamedPlayer.type !== "player" || !streamedPlayer.getVariable("voiceHash")) continue

                        if (streamedPlayer.getVariable("isDead")) continue
                        if (!streamedPlayer.getVariable("voiceRange")) continue

                        let streamedPlayerPos = streamedPlayer.position
                        let distance = player.getDistance(streamedPlayerPos)

                        let voiceRange = streamedPlayer.getVariable("voiceRange")
                        let streamedPlayerHash = streamedPlayer.getVariable("voiceHash")

                        let volumeModifier = 4

                        if (voiceRange && voiceRange > 0 && distance < voiceRange) {
                            let subPos = player.calculateVectorDistance(streamedPlayerPos)

                            let x = subPos.x * Math.cos(rotation) - subPos.y * Math.sin(rotation)
                            let y = subPos.x * Math.sin(rotation) + subPos.y * Math.cos(rotation)

                            x = x * 10 / voiceRange
                            y = y * 10 / voiceRange

                            let percent = (voiceRange / 100) * distance
                            volumeModifier = volumeModifier - percent

                            if (voiceRange === 15) {
                                volumeModifier = volumeModifier * 1.3
                            }
                            else if (voiceRange === 5) {
                                volumeModifier = volumeModifier * 0.9
                            }
                            else if (voiceRange === 40) {
                                volumeModifier = volumeModifier * 1.8
                            }

                            let str = `${streamedPlayerHash}~${(Math.round(x * 1000) / 1000)}~${(Math.round(y * 1000) / 1000)}~0~${user.isInAnyVehicle(false) ? ((Math.round(volumeModifier * 1000) / 1000) / 1.5) : (Math.round(volumeModifier * 1000) / 1000)}`

                            voicePlayers.push(str)
                        }
                    }
                }

                let voiceAirFunk = "";
                if(voice.radioAirFunkPlayers.length > 0) {
                    voiceAirFunk = `${voice.radioAirFunkPlayers};`;
                }

                if(player.state == 0) {
                    browser.voice.url = (`http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voiceAirFunk}${voicePlayers.join(";")}/`)
                }
                else {

                    browser.voice.url = (`http://localhost:15338/player/${voice.voiceChannel}/${voice.voicePassword}/${hash}/${voice.radioChatPlayers};${voiceAirFunk}${voicePlayers.join(";")}/`)
                }
                browser.voice.execute(`document.body.style.display = "none";`);
            }
        }, 1575)
    }
}

export default new Voice()