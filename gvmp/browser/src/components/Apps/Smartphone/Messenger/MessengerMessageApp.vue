<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Nachrichten
            </div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>
                Nachricht senden
            </v-ons-list-header>

            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-call" class="list-item__icon"></v-ons-icon>
                </div>

                <div class="center">
                    <input type="number" class="text-input" placeholder="Nummer eingeben..." v-model="receiver" />
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-text" class="list-item__icon"></v-ons-icon>
                </div>

                <div class="center">
                    <input type="text" class="text-input" placeholder="Nachricht eingeben..." v-model="message" />
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <section>
            <v-ons-button
                modifier="large"
                @click="sendMessage"
            >
                Nachricht senden
            </v-ons-button>
        </section>

        <v-ons-list>
            <v-ons-list-header>
                Weiteres
            </v-ons-list-header>
        </v-ons-list>

        <section>
            <v-ons-button
                style="background-color: #808080"
                modifier="large"
                @click="sendGPS"
            >
                Standort senden
            </v-ons-button>
        </section>

        <section>
            <v-ons-button
                style="background-color: #808080;"
                modifier="large"
                @click="sendContact"
            >
                Kontakt senden
            </v-ons-button>
        </section>

        <audio
            v-for="x in sendCount"
            :key="x"
            volume="0.1"
            visibility="visible"
            currentTime="0"
            autoplay
            controls
            type="audio/ogg"
            preload="auto"
            :src="playSound('sendSMS')"
            style="display: none"
        />
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import MessengerApp from './MessengerApp'
import MessengerContactsApp from './MessengerContactsApp'
import Sounds from '../../../sounds'

export default {
    name: 'MessengerMessageApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            receiver  : null,
            message   : '',
            charAmount: 0,
            newMessage: '',
            sendCount : 0,
        }
    },

    methods: {
        sendMessage () {
            this.checkInput()

            this.triggerServer('sendPhoneMessage', this.receiver, this.message)
            this.sendCount = this.sendCount + 1

            this.pageStack.pop()
        },

        playSound (data) {
            if (data == 'sendSMS') {
                return Sounds.sendSMS()
            }
        },

        onKeyUp () {
            if (event.key == 'Enter' || event.key == 'enter') {
                this.sendMessage()
            }
        },

        checkInput () {
            for (this.charAmount = 0; this.charAmount < this.message.length; this.charAmount++) {
                if (
                    [
                        ' ', 'ä', 'ö', 'ü', 'ß', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
                        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u',
                        'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
                        '8', '9', ',', '.', '-', '_', '|', '§', '$', '%', '&', '#', ':',
                        '*', '+', '?', '!', '=',
                    ].indexOf(this.message[this.charAmount].toLowerCase()) === -1
                ) {
                    this.newMessage += '-'
                } else {
                    this.newMessage += this.message[this.charAmount]
                }
            }

            this.message    = ''
            this.message    = this.newMessage
            this.newMessage = ''
        },

        sendContact () {
            if (this.receiver == null) return

            this.pageStack.push({ extends: MessengerContactsApp, data () { return { receiverNumber: this.receiver } } })
        },

        sendGPS () {
            if (this.receiver == null) return

            this.trigger('getLocation', JSON.stringify({ x: 0, y: 0 }))
        },

        setGPSdata (x, y) {
            this.sendCount = this.sendCount + 1

            this.triggerServer('sendPhoneMessage', this.receiver, 'GPS$$' + x + '$$' + y)

            this.pageStack.pop()
            this.pageStack.pop()
            this.pageStack.push(MessengerApp)
        },
    },

    mounted () {
        window.addEventListener('keyup', this.onKeyUp)
    },

    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>
