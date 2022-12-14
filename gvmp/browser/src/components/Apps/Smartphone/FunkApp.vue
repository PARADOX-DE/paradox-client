<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Funkgerät
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list-title>
                Aktueller Funk: {{ voiceRoom }}
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item modifier="nodivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-wifi" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input class="text-input" v-model="voiceRoom" placeholder="Funkkanal eingeben..." />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button
                    modifier="large"
                    @click="joinVoice"
                >
                    Betreten
                </v-ons-button>
            </section>

            <v-ons-list>
                <v-ons-list-item
                    modifier="longdivider"
                    v-for="state in states"
                    :key="state.value"
                    @click="handle(state.value)"
                    tappable
                >
                    <label class="left">
                        <v-ons-radio
                            :input-id="'radio-' + state.value"
                            :value="state.value"
                            name="options"
                            v-model="active"
                        ></v-ons-radio>
                    </label>

                    <label :for="'radio-' + state.value" class="center">
                        {{ state.text }}
                    </label>
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'FunkApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            active: 0,

            states: [
                { text: 'Funk aus', value: 0 },
                { text: 'Funk PushToTalk', value: 1 },
                { text: 'Funk Dauersenden', value: 2 },
            ],

            voiceRoom: '',
            abuseTime: 20,
            timer    : null,
        }
    },

    methods: {
        handle (state) {
            this.triggerServer('changeSettings', state)

            this.trigger('setVoiceRadioActive', true)
            this.trigger('setVoiceRadioActiveType', state)
        },

        joinVoice () {
            if (isNaN(this.voiceRoom)) return

            if ((this.timer + 20000) >= Date.now()) {
                this.$ons.notification.toast('Funkfrequenz überlastet, bitte probieren Sie es in 20 Sekunden erneut.', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.timer = Date.now()
            this.triggerServer('changeFrequenz', this.voiceRoom)
        },

        responseVoiceSettings (response) {
            let voice = JSON.parse(response)

            this.voiceRoom = voice.Room
            this.active    = voice.Active
        },
    },

    mounted () {
        this.triggerServer('requestVoiceSettings')
    },
}
</script>
