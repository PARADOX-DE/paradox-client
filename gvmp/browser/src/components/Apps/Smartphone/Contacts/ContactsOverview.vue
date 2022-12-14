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
            <section>
                <v-ons-row>
                    <v-ons-col style="text-align: center">
                        <v-ons-icon
                            icon="ion-md-contact"
                            style="font-size: 7vh !important; color: #5e5e5e"
                        ></v-ons-icon>
                    </v-ons-col>
                </v-ons-row>

                <v-ons-row style="margin-top: 1vh">
                    <v-ons-col style="text-align: center">
                        <span style="font-size: 2vh">
                            {{ cleanUpName(contactName) }}
                        </span>
                    </v-ons-col>
                </v-ons-row>

                <v-ons-row style="margin-top: 1vh">
                    <v-ons-col style="text-align: center">
                        <v-ons-button class="icon-button grey" @click="callUser">
                            <v-ons-icon
                                icon="ion-md-call"
                            ></v-ons-icon>
                        </v-ons-button>
                    </v-ons-col>

                    <v-ons-col style="text-align: center">
                        <v-ons-button class="icon-button grey" @click="sendSms">
                            <v-ons-icon
                                icon="ion-md-chatboxes"
                            ></v-ons-icon>
                        </v-ons-button>
                    </v-ons-col>

                    <v-ons-col style="text-align: center">
                        <v-ons-button class="icon-button grey" @click="goToEditContact">
                            <v-ons-icon
                                icon="ion-md-create"
                            ></v-ons-icon>
                        </v-ons-button>
                    </v-ons-col>

                    <v-ons-col style="text-align: center">
                        <v-ons-button class="icon-button grey" @click="setFav">
                            <v-ons-icon
                                :style="{color: contactName.indexOf('000FAV') >= 0 ? '#ffc541' : null}"
                                icon="ion-ios-star"
                            ></v-ons-icon>
                        </v-ons-button>
                    </v-ons-col>
                </v-ons-row>
            </section>

            <v-ons-list>
                <v-ons-list-item
                    modifier="longdivider"
                >
                    <div class="left">
                        <v-ons-icon
                            style="color: #5e5e5e"
                            icon="ion-md-call"
                            class="list-item__icon"
                        ></v-ons-icon>
                    </div>

                    <div class="center">
                        <span class="list-item__title">{{ contactNumber }}</span>
                        <span class="list-item__subtitle">Mobilfunknummer</span>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item
                    modifier="longdivider chevron"
                >
                    <div class="center" @click="sendGPS">
                        Standort teilen
                    </div>
                </v-ons-list-item>

                <v-ons-list-item
                    modifier="longdivider chevron"
                >
                    <div class="center" @click="sendContact">
                        Kontakt teilen
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button style="background-color: red" modifier="large" @click="deleteContact">
                    Kontakt Löschen
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import ContactsEdit from './ContactsEdit'
import MessageOverviewApp from '../Messenger/MessageOverviewApp'
import MessengerContactsApp from '../Messenger/MessengerContactsApp'
import MessengerApp from '../Messenger/MessengerApp'

export default {
    name: 'ContactsOverview',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            contactName  : '',
            contactNumber: null,
        }
    },

    methods: {
        goToEditContact () {
            let fav    = false,
                name   = this.contactName,
                number = this.contactNumber

            // Preserve favorite status.
            if (this.contactName.indexOf('000FAV') >= 0) {
                fav  = true
                name = name.split('00FAV')[1]
            }

            this.pageStack.push({
                extends: ContactsEdit,

                data () {
                    return {
                        editName   : name,
                        editNumber : number,
                        originalNumber: number,
                        favorite   : fav,
                    }
                },
            })
        },

        callUser () {
            this.triggerServer('callUserPhone', this.contactNumber)
        },

        sendSms () {
            let _this = this

            this.pageStack.push({
                extends: MessageOverviewApp,
                data () { return { msgPartner: _this.contactName, msgPartnerNumber: _this.contactNumber } },
            })
        },

        sendContact () {
            let _this = this

            this.pageStack.push({ extends: MessengerContactsApp, data () { return { receiverNumber: _this.contactNumber } } })
        },

        sendGPS () {
            this.trigger('getLocation', JSON.stringify({ x: 0, y: 0 }))
        },

        setGPSdata (x, y) {
            this.triggerServer('sendPhoneMessage', this.contactNumber, 'GPS$$' + x + '$$' + y)
            this.pageStack.pop()
            this.pageStack.pop()
            this.pageStack.push(MessengerApp)
        },

        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },

        setFav () {
            if (this.contactName.indexOf('000FAV') >= 0) {
                let contact = this.contactName.split('00FAV')

                this.trigger('updateContact', JSON.stringify({
                    storeNumber: this.contactNumber,
                    editNumber : this.contactNumber,
                    editName   : contact[1],
                }))

                this.contactName = contact[1]
            } else {
                this.contactName = '000FAV' + this.contactName

                this.trigger('updateContact', JSON.stringify({
                    storeNumber: this.contactNumber,
                    editNumber : this.contactNumber,
                    editName   : this.contactName,
                }))
            }
        },

        deleteContact() {
            if (this.contactNumber == null) return

            this.trigger("removeContact", JSON.stringify({ number: this.contactNumber }))
            this.pageStack.pop()
        }
    },
}
</script>
