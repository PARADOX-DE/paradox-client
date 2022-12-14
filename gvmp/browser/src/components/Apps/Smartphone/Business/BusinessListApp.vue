<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Business
            </div>
        </v-ons-toolbar>

        <v-ons-list-title>
            Message Of The Day
        </v-ons-list-title>

        <v-ons-list>
            <v-ons-list-item>
                {{ businessInfo.messageOfTheDay }}
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list-title>
            Mitglieder online: {{ memberCount }}
        </v-ons-list-title>

        <v-ons-list>
            <v-ons-list-item
                modifier="longdivider"
                v-for="member in businessInfo.members.BusinessMemberList"
                :key="member.name"
            >
                <div class="center">
                    <div class="list-item__title">
                        {{ member.name }}

                        <span
                            style="margin-left: .5vh;"
                            v-if="member.owner"
                        >
                            <strong style="color: red; font-size: 1rem">I</strong>
                        </span>

                        <span
                            style="margin-left: .5vh;"
                            v-else-if="member.manage"
                        >
                            <strong style="color: orange; font-size: 1rem">M</strong>
                        </span>
                    </div>

                    <span class="list-item__subtitle">
                        Telefon: {{ member.number }}
                    </span>
                </div>

                <div class="right">
                    <v-ons-icon
                        icon="ion-md-call"
                        class="list-item__icon"
                        style="font-size: 1.6vh !important; color: lawngreen; margin-right: 0.5625vh !important"
                        @click="call(member.number)"
                    ></v-ons-icon>

                    <v-ons-icon
                        icon="ion-md-chatboxes"
                        class="list-item__icon"
                        style="font-size: 1.6vh !important; color: deepskyblue;"
                        @click="goToSms(member.number)"
                    ></v-ons-icon>

                    <v-ons-icon
                        v-if="parseInt(businessInfo.members.ManagePermission) === 1 || parseInt(businessInfo.members.ManagePermission) === 2"
                        icon="ion-md-settings"
                        class="list-item__icon"
                        style="font-size: 1.6vh !important; color: lightgrey; margin-left: 0.5625vh !important"
                        @click="goToEdit(member)"
                    ></v-ons-icon>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <section v-show="parseInt(businessInfo.members.ManagePermission) === 1 || parseInt(businessInfo.members.ManagePermission) === 2">
            <v-ons-button modifier="large" @click="goToInvite">
                Mitglied hinzufügen
            </v-ons-button>
        </section>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import BusinessMemberEditApp from './BusinessMemberEditApp'
import BusinessInviteApp from './BusinessInviteApp'
import MessengerMessageApp from '../Messenger/MessengerMessageApp'

export default {
    name: 'BusinessListApp',

    extends: BaseApp,

    props: ['pageStack', 'businessInfo'],

    computed: {
        memberCount () {
            return this.businessInfo.members.BusinessMemberList ? this.businessInfo.members.BusinessMemberList.length : 0
        },
    },

    methods: {
        goToEdit (member) {
            if (parseInt(this.businessInfo.members.ManagePermission) === 1 || parseInt(this.businessInfo.members.ManagePermission) === 2) {
                this.pageStack.push({ extends: BusinessMemberEditApp, data () { return { member: member } } })
            }
        },

        goToInvite () {
            this.pageStack.push({ extends: BusinessInviteApp })
        },

        goToSms (phoneNumber) {
            this.pageStack.push({ extends: MessengerMessageApp, data () { return { receiver: phoneNumber } } })
        },

        call (phoneNumber) {
            this.triggerServer('callUserPhone', phoneNumber)
        },
    },
}
</script>
