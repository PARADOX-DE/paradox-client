<template>
    <v-ons-page id="messenger">
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Chat
            </div>

            <div class="right">
                <v-ons-toolbar-button @click="optionsActionSheetVisible = true">
                    <v-ons-icon icon="ion-md-more"></v-ons-icon>
                </v-ons-toolbar-button>
            </div>
        </v-ons-toolbar>

        <v-ons-action-sheet
            :visible.sync="optionsActionSheetVisible"
            cancelable
            title="Aktionen"
            class="ons-action-sheet-gvmp"
        >
            <v-ons-action-sheet-button icon="md-pin" @click="sendGps">
                Standort senden
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button icon="md-account-box" @click="sendContact">
                Kontakt senden
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button icon="md-plus" @click="addUser" v-if="!msgPartner">
                Nummer speichern
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button icon="md-phone" @click="callUser">
                Kontakt anrufen
            </v-ons-action-sheet-button>

            <v-ons-action-sheet-button icon="md-delete" @click="deleteChat">
                Nachrichten löschen
            </v-ons-action-sheet-button>
        </v-ons-action-sheet>

        <div class="content">
            <section>
                <div class="messages" id="messages">
                    <message
                        v-for="messageData in messages"
                        :key="messageData.id"
                        :message-data="messageData"
                        @gpsSelected="readGpsData"
                        @callContact="callReceivedContact"
                        @smsContact="smsReceivedContact"
                        @addContact="addReceivedContact"
                    ></message>
                </div>
            </section>
        </div>

        <v-ons-bottom-toolbar id="bottom-toolbar" style="overflow: visible !important;">
            <v-ons-row vertical-align="center" style="margin-top: 0.6937561942517344vh !important;">
                <v-ons-col vertical-align="center" style="width: 3vh !important;">
                    <twemoji-picker
                        :emojiData="emojiDataAll"
                        :emojiGroups="emojiGroups"
                        :skinsSelection="false"
                        :searchEmojisFeat="false"
                        :recentEmojisFeat="false"
                        recentEmojisStorage="none"
                        pickerWidth="#bottom-toolbar"
                        :pickerHeight="250"
                        pickerPlacement="top"
                        :pickerArrowEnabled="false"
                        isLoadingLabel="Lädt..."
                        :pickerPaddingOffset="0"
                        @emojiUnicodeAdded="onEmojiSelection"
                    ></twemoji-picker>
                </v-ons-col>

                <v-ons-col vertical-align="center" style="width: 19vh !important;">
                    <input
                        class="text-input"
                        type="text"
                        placeholder="Nachricht eingeben..."
                        v-model="answer"
                    />
                </v-ons-col>

                <v-ons-col vertical-align="center" style="width: 3vh !important;">
                    <v-ons-button modifier="quiet" class="icon-button no-padding" @click="sendMessage">
                        <v-ons-icon icon="ion-md-send" class="list-item__icon"></v-ons-icon>
                    </v-ons-button>
                </v-ons-col>
            </v-ons-row>
        </v-ons-bottom-toolbar>

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
import { TwemojiPicker } from '@kevinfaguiar/vue-twemoji-picker'
import EmojiAllData from '@kevinfaguiar/vue-twemoji-picker/emoji-data/de/emoji-all-groups.json'
import EmojiGroups from '@kevinfaguiar/vue-twemoji-picker/emoji-data/emoji-groups.json'

import BaseApp from '../../../BaseApp'

/* Partials */
import Message from './Partials/Message'

/* Other pages */
import MessengerContactsApp from './MessengerContactsApp'
import MessageOverviewApp from './MessageOverviewApp'
import ContactAdd from '../Contacts/ContactsAdd'

import Sounds from '../../../sounds'

export default {
    name: 'MessengerOverviewApp',

    extends: BaseApp,

    props: ['pageStack'],

    components: {
        'twemoji-picker': TwemojiPicker,
        'message'       : Message,
    },

    data () {
        return {
            optionsActionSheetVisible: false,

            // Set by messenger list app.
            msgId           : null,
            msgPartner      : null,
            msgPartnerNumber: null,
            messages        : [],

            answer   : '',
            ownNumber: null,

            sendCount: 0,
        }
    },

    computed: {
        emojiDataAll () {
            return EmojiAllData.filter(g => g.group !== 2)
        },

        emojiGroups () {
            return EmojiGroups.filter(g => g.description !== '🦲')
        },
    },

    methods: {
        hideActionSheet () {
            this.optionsActionSheetVisible = false
        },

        onEmojiSelection (emojiUnicode) {
            let replacement = this.$emojiConverter.replaceUnicode(emojiUnicode)

            // If the converter could not replace the emoji as expected show toast...
            if (emojiUnicode === replacement) {
                this.$ons.notification.toast('Dieses Emoji wird derzeit nicht unterstützt.', {
                    timeout: 1000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.answer = this.answer + replacement
        },

        readGpsData (data) {
            let gps  = data.message.split('$$'),
                gpsX = parseInt(gps[1]),
                gpsY = parseInt(gps[2])

            this.trigger('setGpsCoordinates', JSON.stringify({ x: gpsX, y: gpsY }))
        },

        onKeyUp (ev) {
            if (ev.key === 'Enter' || ev.key === 'enter') {
                this.sendMessage()
            }
        },

        scrollToBottom () {
            setTimeout(() => {
                const messages = document.getElementById('messages').childNodes
                const length   = this.messages.length - 1

                if (messages[length]) {
                    messages[length].scrollIntoView(true)
                }
            }, 500)
        },

        /**
         * Forwardable event used by the server to update chat messages.
         *
         * @param newMessage
         */
        updateChat (newMessage) {
            if (newMessage === '' || newMessage === undefined || newMessage === null) return
            let parsedMessage = JSON.parse(newMessage)

            if (parsedMessage.sender === this.msgPartner
                || parseInt(parsedMessage.sender) === parseInt(this.msgPartnerNumber)
                || parsedMessage.sender === 'Ich'
                || parseInt(parsedMessage.sender) === parseInt(this.ownNumber)
            ) {
                if (parseInt(parsedMessage.sender) === parseInt(this.ownNumber)) {
                    parsedMessage.receiver = true
                }

                this.messages.push(parsedMessage)

                this.scrollToBottom()
            }
        },

        setOwnNumber (number) {
            this.ownNumber = parseInt(number)
        },

        sendMessage () {
            if (this.answer === '') return
            let message = this.sanitizeInput(this.answer).trim()

            this.triggerServer('sendPhoneMessage', this.msgPartnerNumber, message)

            this.sendCount = this.sendCount + 1
            this.answer    = ''
        },

        playSound (data) {
            if (data === 'sendSMS') {
                return Sounds.sendSMS()
            }
        },

        sendGps () {
            this.optionsActionSheetVisible = false

            this.trigger('getLocation', JSON.stringify({ x: 0, y: 0 }))
        },

        setGpsData (x, y) {
            this.sendCount = this.sendCount + 1
            this.triggerServer('sendPhoneMessage', this.msgPartnerNumber, 'GPS$$' + x + '$$' + y)
        },

        addReceivedContact (data) {
            this.pageStack.push({ extends: ContactAdd, data () { return { name: data.name, number: data.number } } })
        },

        callReceivedContact (data) {
            this.triggerServer('callUserPhone', data.number)
        },

        smsReceivedContact (data) {
            this.pageStack.push({ extends: MessageOverviewApp, data () { return { msgPartnerNumber: data.number }} })
        },

        sendContact () {
            let _this                      = this
            this.optionsActionSheetVisible = false

            this.pageStack.push({
                extends: MessengerContactsApp,
                data () { return { receiverNumber: _this.msgPartnerNumber } },
            })
        },

        callUser () {
            this.optionsActionSheetVisible = false

            this.triggerServer('callUserPhone', this.msgPartnerNumber)
        },

        addUser () {
            let _this                      = this
            this.optionsActionSheetVisible = false

            this.pageStack.push({ extends: ContactAdd, data () { return { number: _this.msgPartnerNumber } } })
        },

        deleteChat () {
            this.optionsActionSheetVisible = false

            this.triggerServer('deletePhoneChat', this.msgId)
            this.pageStack.splice(1, this.pageStack.length - 1)
        },
    },

    mounted () {
        this.scrollToBottom()

        window.addEventListener('keyup', this.onKeyUp)
    },

    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>
