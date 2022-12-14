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
                    placeholder="Suchen..."
                    v-model="filter"
                    style="width: 100%;"
                    ref="searchInput"
                />

                <v-ons-list-item
                    modifier="longdivider chevron"
                    tappable
                    v-for="contact in filteredContacts"
                    :key="contact.number"
                    @click="goToOverview(contact.name, contact.number)"
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
                </v-ons-list-item>
            </v-ons-list>
        </div>

        <v-ons-fab modifier="mini" position="bottom right" @click="goToAdd">
            <v-ons-icon icon="md-plus"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import ContactsOverview from './ContactsOverview'
import ContactsAdd from './ContactsAdd'

export default {
    name: 'ContactsApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            contacts: [],

            filter: '',
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
        goToOverview (contactName, contactNumber) {
            this.pageStack.push({
                extends: ContactsOverview,
                data () { return { contactName: contactName, contactNumber: contactNumber }},
            })
        },

        goToAdd () {
            this.pageStack.push({ extends: ContactsAdd })
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
