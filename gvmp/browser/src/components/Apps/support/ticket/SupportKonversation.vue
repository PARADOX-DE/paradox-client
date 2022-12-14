<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Ticket Konversation</div>
            <div class="right">
                <span v-if="messages.status">Chat geöffnet</span>
                <span v-else>Chat nicht geöffnet</span>
                <ons-switch
                    v-on:change="toggleChat"
                    :checked="messages.status"
                    v-model="messages.status"
                    style="margin: 16px;"
                ></ons-switch>
            </div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Konversation mit {{ ticket.creator }}</v-ons-list-header>

            <v-ons-list-item v-if="messages.konversation.length == 0">
                <div class="center">
                    <span>Es wurden noch keine Nachrichten versendet</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item v-for="chat in messages.konversation" v-bind:key="chat.id" v-else>
                <div class="left">
                    <img class="list-item__thumbnail" :src="chat.receiver ? support_icon : user_icon">
                </div>
                <div class="center">
                    <span class="list-item__title">{{ chat.sender }}</span>
                    <span class="list-item__subtitle">{{ chat.message }}</span>
                </div>
                <div class="right">
                    <span class="dateStyle">{{ formatDateTimeString(chat.date) }}</span>
                </div>
            </v-ons-list-item>

        </v-ons-list>

        <v-ons-bottom-toolbar>
            <input
                class="messengerInput inputData"
                placeholder="Nachricht eingeben"
                v-model="supportMessage"
                @keyup.enter="sendSupportMessage"
            />
            <v-ons-button
                style="padding-top: 4px; height: 100%; border-radius: 0; color: #000; font-size: 12px;"
                modifier="quiet"
                @click="sendSupportMessage"
            >Nachricht senden
            </v-ons-button>
        </v-ons-bottom-toolbar>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name   : 'SupportKonversation',
    extends: BaseApp,
    data () {
        return {
            ticket        : [],
            messages      : [],
            supportMessage: '',
            'support_icon': require('@/assets/support_tickets.svg'),
            'user_icon'   : require('@/assets/man.svg'),
        }
    },
    methods: {
        responseSupportKonversation (messages) {
            this.messages = JSON.parse(messages)
        },
        updateSupportKonversation (data) {
            if (data == '' || data == undefined || data == null) return
            this.messages.konversation.push(JSON.parse(data))
        },
        sendSupportMessage () {
            this.triggerServer('supportMessageSent', this.ticket.creator, this.supportMessage)
            this.supportMessage = ''
        },
        formatDateTimeString (dateTime) {
            return new Date(dateTime).toLocaleString()
        },
        toggleChat () {
            this.messages.status = !this.messages.status
            this.triggerServer('allowTicketResponse', this.ticket.creator, this.messages.status)
        },
    },
    mounted () {
        this.triggerServer('requestSupportKonversation', this.ticket.creator)
    },
    props: ['pageStack'],
}
</script>

<style>
#chatmessage {
    margin-top: 5px;
}

.pointer {
    cursor: pointer !important;
}

.size {
    font-size: 15px;
}

.pointer {
    cursor: pointer;
}

.dateStyle {
    font-size: 12px;
}

input.messengerInput {
    margin-left:      0.2rem;
    width:            81%;
    color:            grey !important;
    padding:          10px;
    font-size:        12px;
    background-color: rgba(255, 255, 255, 0.35);
    border-radius:    0.3rem;
    border-bottom:    none;
}

.marvel-device.ipad .top-bar, .marvel-device.ipad .bottom-bar {
    display: inline !important;
}

.inputData {
    margin-top: 4px;
}
</style>