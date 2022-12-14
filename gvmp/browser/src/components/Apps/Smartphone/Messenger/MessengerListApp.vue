<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <div class="left">
                    <v-ons-toolbar-button>
                        <v-ons-back-button></v-ons-back-button>
                    </v-ons-toolbar-button>
                </div>
            </div>

            <div class="center">
                Nachrichten
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-item v-if="messages.length === 0">
                    <div class="center">Keine Nachrichten vorhanden!</div>
                </v-ons-list-item>

                <v-ons-list-item
                    modifier="longdivider chevron"
                    tappable
                    v-for="chat in messages"
                    :key="chat.id"
                    @click="goToConversation(chat)"
                >
                    <div class="left">
                        <v-ons-icon icon="ion-md-chatboxes" class="list-item__icon" style="color: #5e5e5e"></v-ons-icon>
                    </div>

                    <div class="center" v-if="chat.lastMessage && chat.lastMessage !== ''">
                        <span class="list-item__title">{{ cleanUpName(chat.messageSender) }}</span>
                        <span class="list-item__subtitle">{{ chat.lastMessage }}</span>
                    </div>

                    <div class="center" v-else>
                        {{ cleanUpName(chat.messageSender) }}
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>

        <v-ons-fab modifier="mini" position="bottom right">
            <v-ons-icon icon="md-plus" @click="goToStartNewConversation"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import MessageOverviewApp from './MessageOverviewApp'
import MessengerAddContactsApp from './MessengerAddContactsApp'

export default {
    name: 'MessengerListApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            messages: [],
        }
    },

    methods: {
        goToConversation (chat) {
            this.pageStack.push({
                extends: MessageOverviewApp,

                data () {
                    return {
                        messages        : chat.messages,
                        msgPartner      : chat.messageSender,
                        msgPartnerNumber: chat.messageSenderNumber,
                        msgId           : chat.messagesId,
                    }
                },
            })
        },

        goToStartNewConversation () {
            this.pageStack.push({ extends: MessengerAddContactsApp })
        },

        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },

        responseKonversations (response) {
            this.messages = JSON.parse(response)
        }
    },

    mounted () {
        this.triggerServer('requestKonversations')
    },
}
</script>
