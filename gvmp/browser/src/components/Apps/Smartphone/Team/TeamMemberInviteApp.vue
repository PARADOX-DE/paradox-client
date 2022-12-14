<template>
    <v-ons-page>
        <v-ons-toolbar>
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
                    Mitglied einladen
                </v-ons-list-header>

                <v-ons-list-item modifier="longdivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-contact" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            type="text"
                            class="text-input"
                            placeholder="Name eingeben..."
                            v-model="playerName"
                        />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button modifier="large" @click="invitePlayerToTeam">
                    Einladen
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'TeamMemberInviteApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            playerName: '',
        }
    },

    methods: {
        invitePlayerToTeam () {
            if (this.playerName === '') {
                this.$ons.notification.toast('Name oder ID eingeben!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.triggerServer('addPlayer', this.playerName)

            this.pageStack.pop()
        },
    },
}
</script>
