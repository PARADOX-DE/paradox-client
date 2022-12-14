<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Kontakte
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
                    v-if="filter !== '' && isFilterDigitsOnly"
                    @click="goToSendSmsUnknownContact"
                >
                    <div class="center">
                        {{ filter }}
                    </div>

                    <div class="right">
                        <v-ons-icon
                            icon="ion-md-send"
                            class="list-item__icon"
                            style="color: #f90"
                        ></v-ons-icon>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item
                    modifier="longdivider"
                    tappable
                    v-for="contact in filteredContacts"
                    :key="contact.number"
                    @click="goToSendSmsToContact(contact.number, cleanUpName(contact.name))"
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
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import MessageOverviewApp from './MessageOverviewApp'

export default {
    name: 'ContactsApp',

    extends: BaseApp,

    props  : ['pageStack'],

    data () {
        return {
            contacts: [],

            filter: '',
        }
    },

    computed: {
        isFilterDigitsOnly () {
            const digits_only = string => [...string].every(c => '0123456789'.includes(c))

            return digits_only(this.filter)
        },

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
        goToSendSmsUnknownContact () {
            let _this = this

            this.pageStack.push({
                extends: MessageOverviewApp,
                data () { return { msgPartnerNumber: _this.filter } },
            })
        },

        goToSendSmsToContact (number, name) {
            this.pageStack.push({
                extends: MessageOverviewApp,
                data () { return { msgPartnerNumber: number, msgPartner: name } },
            })
        },

        setContactListData (contacts) {
            this.contacts = JSON.parse(contacts)
        },

        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },
    }
}
</script>

<style scoped>
>>> .search-input--material {
    padding-left: 50px;
}
</style>
