<template>
    <v-ons-page>
        <div class="content">
            <div v-if="accepted === false">
                <div style="text-align: center; font-size: 1.875vh; margin-top: 3.75vh;">
                    <p v-if="callData.method === 'incoming'">Eingehender Anruf</p>
                    <p v-else>Ausgehender Anruf</p>
                </div>

                <div style="text-align: center; font-size: 1.40625vh; margin-top: 0.46875vh;">
                    <span v-if="callData.name !== null">{{ cleanUpName(callData.name) }}</span>
                    <span v-else-if="callData.name === null">{{ callData.caller }}</span>
                </div>

                <v-ons-fab
                    v-if="callData.method === 'incoming'"
                    @click="declineCall"
                    position="bottom left"
                    style="background-color: red; color: white;"
                >
                    <v-ons-icon
                        icon="md-phone-end"
                    ></v-ons-icon>
                </v-ons-fab>

                <v-ons-row v-else style="position: absolute; top: auto; bottom: 2.8125vh">
                    <v-ons-col style="text-align: center">
                        <v-ons-fab @click="declineCall" style="background-color: red; color: white;">
                            <v-ons-icon
                                icon="md-phone-end"
                            ></v-ons-icon>
                        </v-ons-fab>
                    </v-ons-col>
                </v-ons-row>

                <v-ons-fab
                    v-if="callData.method === 'incoming'"
                    @click="acceptCall"
                    position="bottom right"
                    style="background-color: green; color: white;"
                >
                    <v-ons-icon
                        icon="md-phone"
                    ></v-ons-icon>
                </v-ons-fab>
            </div>

            <div v-else>
                <div style="text-align: center; font-size: 1.875vh; margin-top: 3.75vh;">
                    <p>Aktiver Anruf</p>
                </div>

                <div
                    v-if="callData.name !== null"
                    style="text-align: center; font-size: 1.40625vh; margin-top: 0.46875vh;"
                >
                    {{ cleanUpName(callData.name) }}
                </div>

                <div
                    v-else-if="callData.name === null"
                    style="text-align: center; font-size: 1.40625vh; margin-top: 0.46875vh;"
                >
                    {{ callData.caller }}
                </div>

                <div style="text-align: center; font-size: 1.875vh; margin-top: 2.8125vh; color: #fff;">
                    {{ time }}
                </div>

                <v-ons-row style="margin-top: 2.8125vh;">
                    <v-ons-col style="text-align: center">
                        <v-ons-fab modifier="mini" @click="changeMicMute">
                            <v-ons-icon
                                :icon="!mute ? 'md-mic' : 'md-mic-off'"
                            ></v-ons-icon>
                        </v-ons-fab>
                    </v-ons-col>
                </v-ons-row>

                <v-ons-row style="position: absolute; top: auto; bottom: 2.8125vh">
                    <v-ons-col style="text-align: center">
                        <v-ons-fab @click="hangupCall" style="background-color: red; color: white;">
                            <v-ons-icon
                                icon="md-phone-end"
                            ></v-ons-icon>
                        </v-ons-fab>
                    </v-ons-col>
                </v-ons-row>
            </div>

            <audio
                v-if="playIncoming"
                loop
                autoplay
                controls
                ref="media"
                :volume="1.0"
                currentTime="0"
                type="audio/ogg"
                preload="auto"
                :src="playSound('incomming')"
                style="display: none"
            />

            <audio
                v-if="playOutgoing"
                loop
                autoplay
                controls
                ref="media2"
                :volume="0.1"
                currentTime="0"
                type="audio/ogg"
                preload="auto"
                :src="playSound('outcomming')"
                style="display: none"
            />
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import Sounds from '../../sounds'

// Global var for timer interval is required here!
let timerInterval

export default {
    name: 'CallManageApp',

    extends: BaseApp,

    data () {
        return {
            callData: {},

            accepted: false,

            ringtone : 0,
            date     : null,
            sec      : 0,
            timerRuns: false,
            time     : '',
            clock    : new Date(),
            mute     : false,

            playIncoming: false,
            playOutgoing: false,
        }
    },

    methods: {
        playSound (data) {
            if (data === 'outcomming') {
                return Sounds.ringtoneOutcomming()
            } else if (data === 'incomming') {
                return require(`@/assets/smartphone/ringtones/${this.selectedRingtoneId}.mp3`)
            }
        },

        changeMicMute () {
            this.mute = !this.mute

            this.triggerServer('muteCall', this.mute)
        },

        cancelCall (data) {
            this.clock = new Date()
            this.clock = this.clock + '%'
            let clock  = this.clock.split(' ')

            this.clock = clock[4]
            if (this.time !== '') {
                this.clock = this.clock + ' (' + this.time + ')'
            }

            this.trigger('addCallToHistory', JSON.stringify({
                contact : this.callData.name,
                number  : this.callData.caller,
                time    : this.clock,
                accepted: this.accepted,
                method  : this.callData.method,
            }))

            this.callData = JSON.parse(data)
        },

        setCallData (data, ringtoneId, sound) {
            this.mute     = false
            this.callData = JSON.parse(data)
            this.ringtone = ringtoneId

            if (this.callData.method === 'incoming') {
                if (sound == 'false') {
                    this.playIncoming = true
                }
            } else if (this.callData.method === 'outgoing') {
                this.playOutgoing = true
            }
        },

        setTimer () {
            this.sec++

            let hrs     = Math.floor(this.sec / 3600),
                min     = Math.floor((this.sec - (hrs * 3600)) / 60),
                seconds = this.sec - (hrs * 3600) - (min * 60)

            seconds = Math.round(seconds * 100) / 100

            let result = (hrs < 10 ? '0' + hrs : hrs)

            result += ':' + (min < 10 ? '0' + min : min)
            result += ':' + (seconds < 10 ? '0' + seconds : seconds)

            this.time = result
        },

        declineCall () {
            this.triggerServer('callDeclined')

            this.playIncoming = false
            this.playOutgoing = false

            clearInterval(timerInterval)
        },

        declineCallSmartphone () {
            this.triggerServer('callDeclined')

            this.playIncoming = false
            this.playOutgoing = false
        },

        acceptCallSmartphone () {
            if (this.callData.method === 'incoming') {
                this.triggerServer('callAccepted')

                this.playIncoming = false
                this.playOutgoing = false
            }
        },

        acceptCall () {
            clearInterval(timerInterval)

            this.accepted     = true
            this.seconds      = 0
            this.playIncoming = false
            this.playOutgoing = false

            timerInterval = setInterval(this.setTimer, 1000)
        },

        hangupCall () {
            this.triggerServer('callDeclined')

            this.timerRuns    = false
            this.playIncoming = false
            this.playOutgoing = false

            clearInterval(timerInterval)
        },

        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },
    },

    mounted () {
        if (!window.document.onkeyup) {
            window.document.onkeyup = this.onKeyUp
        }
    },
}
</script>
