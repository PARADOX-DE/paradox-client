<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Kontakt senden
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-search-input
                    placeholder="Name oder Nummer..."
                    v-model="filter"
                    style="width: 100%;"
                    ref="searchInput"
                />

                <v-ons-list-item
                    modifier="longdivider"
                    tappable
                    v-for="contact in filteredContacts"
                    :key="contact.number"
                    @click="sendContact(receiverNumber, cleanUpName(contact.name), contact.number)"
                >
                    <div class="left" v-if="contact.name.indexOf('000FAV') >= 0">
                        <v-ons-icon
                            icon="ion-md-star"
                            class="list-item__icon"
                            style="color: #fffd5d"
                        ></v-ons-icon>
                    </div>

                    <div class="center">
                        <span class="list-item__title">
                            {{ cleanUpName(contact.name) }}
                        </span>

                        <span class="list-item__subtitle">
                            {{ contact.number }}
                        </span>
                    </div>

                    <div class="right">
                        <v-ons-icon
                            icon="ion-md-send"
                            class="list-item__icon"
                            style="color: #f90"
                        ></v-ons-icon>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>

        <audio
            v-for="x in sendCount"
            v-bind:key="x"
            volume="0.1"
            visibility="visible"
            currentTime="0"
            autoplay
            controls
            type="audio/ogg"
            preload="auto"
            :src="playSound('sendSMS')"
            style="display: none;"
        />
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import MessengerApp from './MessengerApp'
import Sounds from '../../../sounds'

export default {
    name: 'ContactsApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            contacts: [],

            filter        : '',
            receiverNumber: null,

            sendCount: 0,
        }
    },

    computed: {
        filteredContacts () {
            let f = this.filter.trim().toLowerCase()

            if (f === '') return this.contacts

            return this.contacts.filter(function (s) {
                return (
                    s.name.toLowerCase().includes(f) ||
                    s.number.toString().toLowerCase().includes(f)
                )
            })
        },
    },

    methods: {
        sendContact (number, contactName, contactNumber) {
            this.triggerServer('sendPhoneMessage', number, 'CONTACT$$' + contactName + '$$' + contactNumber)
            this.sendCount = this.sendCount + 1

            this.pageStack.pop()
            this.pageStack.pop()
            this.pageStack.pop()
            this.pageStack.push(MessengerApp)
        },

        playSound (data) {
            if (data === 'sendSMS') {
                return Sounds.sendSMS()
            }
        },

        setContactListData (contacts) {
            this.contacts = JSON.parse(contacts)
        },

        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },
    },
}
</script>

<style scoped>
>>> .search-input--material {
    padding-left: 50px;
}
</style>
