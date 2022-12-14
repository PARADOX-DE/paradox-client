<template>
    <div id="PlayerNotification">
        <transition-group name="fade">
            <div
                class="message"
                v-for="notify in list"
                :key="notify.id"
                :style="{ borderLeftColor: notify.color, backgroundColor: notify.bgcolor }"
            >
                <p :style="{ color: notify.color }">{{ notify.title }}</p>
                {{ notify.message }}
                <audio
                    v-if="notify.message.indexOf('eine SMS erhalten') >= 0 && notify.title.indexOf('OOC') == -1 && notify.title.indexOf('TEAMCHAT') == -1 || notify.message.indexOf('Neue SMS von') >= 0 && notify.title.indexOf('OOC') == -1 && notify.title.indexOf('TEAMCHAT') == -1"
                    autoplay
                    controls
                    type="audio/ogg"
                    preload="auto"
                    :src="playSound('SMS')"
                />

                <audio
                    v-if="notify.message.indexOf('Rufnummer ist derzeit') >= 0 && notify.title.indexOf('OOC') == -1 && notify.title.indexOf('TEAMCHAT') == -1"
                    autoplay
                    controls
                    type="audio/ogg"
                    preload="auto"
                    :src="playSound('busy')"
                />
            </div>

            <div
                class="message2"
                v-for="notify in list2"
                :key="notify.id"
                :style="{ borderLeftColor: notify.color, backgroundColor: notify.bgcolor }"
            >
                <audio
                    v-if="notify.message.indexOf('1337Allahuakbar') >= 0"
                    autoplay
                    controls
                    type="audio/ogg"
                    preload="auto"
                    :src="playSound(notify.message)"
                />
                <iframe
                    v-if="notify.message == '1337$LOTTOHabibi' && notify.title == '1337$LOTTOHabibi'"
                    style="display: none;"
                    :src="lottourl"
                    width="90%"
                    height="400"
                    name="iFrame"
                    title="Generische Beschreibung des Iframe-Inhalts"
                >
                    <!-- Textalternativen werden nicht unterstützt -->
                </iframe>
            </div>
        </transition-group>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'
import Sounds from '../sounds'

export default {
    name   : 'PlayerNotification',
    extends: BaseComponent,
    data () {
        return {
            list : [],
            list2: [],
            id   : 0,
            stumm: false,
        }
    },
    methods: {
        playSound (data) {
            if (data == 'SMS' && this.stumm == false) {
                return Sounds.ringtoneSMS()
            } else if (data == 'busy') {
                return Sounds.ringtoneBusy()
            } else if (data.indexOf('1337Allahuakbar') >= 0) {
                var split = data.split('$')
                return Sounds.adminhorn(split[1])
            }
        },
        remove (notify) {
            const index = this.list.indexOf(notify)
            this.list.splice(index, 1)
        },
        remove2 (notify) {
            const index = this.list2.indexOf(notify)
            this.list2.splice(index, 1)
        },
        pushPlayerNotification (message, duration, stumm, color = '', title = '', bgcolor = '') {
            if (stumm == 'true') {
                this.stumm = true
            } else {
                this.stumm = false
            }
            if (message.indexOf('eine SMS erhalten') >= 0 && title.indexOf('OOC') == -1 && title.indexOf('TEAMCHAT') == -1 || message.indexOf('Neue SMS von') >= 0 && title.indexOf('OOC') == -1 && title.indexOf('TEAMCHAT') == -1) {
                this.triggerServer('requestKonversations')
            }
            const notify = { message, color, title, bgcolor, id: this.id++ }
            if (message.indexOf('1337Allahuakbar') >= 0) {
                this.list2.push(notify)
                setTimeout(this.remove2.bind(null, notify), duration)
            } else {
                this.list.push(notify)
                setTimeout(this.remove.bind(null, notify), duration)
            }
        },
    },
}
</script>

<style lang="scss" scoped>
audio {
    display: none;
}

p {
    font-size: 1vh;
    text-transform: uppercase;
}

.fade-leave-active,
.fade-enter-active {
    transition: opacity 0.5s;
}

.fade-enter {
    opacity: 0;
}

.fade-leave-to {
    opacity: 0;
}

.message {
    width: 20vh;
    height: auto;
    color: white;
    /*border: 1px solid rgba(0,0,0,0.35);*/
    border-left: 0.46875vh solid rgba(51, 51, 51, 0.7);
    padding: 1.25vh;
    background-color: rgba(51, 51, 51, 0.7);
    font-size: 1.25vh;
    font-weight: normal;
}

.message:nth-child(1n+0) {
    margin: 2.5vh;
}

.message2 {
    margin-top: -200vh;
}
</style>