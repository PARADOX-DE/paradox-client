<template>
    <v-ons-page>
        <v-ons-toolbar class="color-background dark-top">
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Team
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-header>
                    Mitglieder online: {{ anzMembers }}
                </v-ons-list-header>

                <v-ons-list-item
                    modifier="longdivider"
                    v-for="member in members.TeamMemberList"
                    :key="member.name"
                >
                    <div class="center">
                        <div class="list-item__title">
                            Rang: {{ member.rank }}

                            <span
                                style="margin-left: .5vh;"
                                v-if="parseInt(member.manage) === 1 || parseInt(member.manage) === 2"
                            >
                                <strong style="color: #f22; font-size: 1rem">L</strong>
                            </span>
                        </div>

                        <span class="list-item__subtitle">
                            {{ member.name }}
                        </span>

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
                            v-if="parseInt(members.ManagePermission) === 1 || parseInt(members.ManagePermission) === 2"
                            icon="ion-md-settings"
                            class="list-item__icon"
                            style="font-size: 1.6vh !important; color: lightgrey; margin-left: 0.5625vh !important"
                            @click="goToEdit(member)"
                        ></v-ons-icon>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section v-show="parseInt(members.ManagePermission) === 1 || parseInt(members.ManagePermission) === 2">
                <v-ons-button modifier="large" @click="goToInvite">
                    Mitglied hinzufügen
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import TeamMemberEditApp from './TeamMemberEditApp'
import TeamMemberInviteApp from './TeamMemberInviteApp'
import MessengerMessageApp from '../Messenger/MessengerMessageApp'

export default {
    name: 'TeamListApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            members   : {},
            anzMembers: 0,
        }
    },

    methods: {
        goToEdit (member) {
            if (parseInt(this.members.ManagePermission) === 1 || parseInt(this.members.ManagePermission) === 2) {
                this.pageStack.push({ extends: TeamMemberEditApp, data () { return { member: member }} })
            }
        },

        goToInvite () {
            if (parseInt(this.members.ManagePermission) === 1 || parseInt(this.members.ManagePermission) === 2) {
                this.pageStack.push({ extends: TeamMemberInviteApp })
            }
        },

        goToSms (contactData) {
            this.pageStack.push({ extends: MessengerMessageApp, data () { return { receiver: contactData } } })
        },

        call (contactData) {
            this.triggerServer('callUserPhone', contactData)
        },

        responseTeamMembers (teamMembersString) {
            this.members    = JSON.parse(teamMembersString)
            this.anzMembers = this.members.TeamMemberList.length
        },
    },
}
</script>
