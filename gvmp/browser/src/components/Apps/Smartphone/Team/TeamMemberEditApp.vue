<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                {{ member.name }}
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-header>
                    Mitgliedsverwaltung
                </v-ons-list-header>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Verwaltungsrechte
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="manage" v-model="manage"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Bankrechte
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.bank" v-model="member.bank"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Inventarrechte
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.inventory" v-model="member.inventory"></v-ons-switch>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button modifier="large" @click="save" style="background-color: green">
                    Speichern
                </v-ons-button>
            </section>

            <v-ons-list>
                <v-ons-list-header>
                    Mitglied entlassen
                </v-ons-list-header>
            </v-ons-list>

            <section>
                <v-ons-button
                    style="background-color: red"
                    modifier="large"
                    @click="isVisible = true"
                >
                    Entlassen
                </v-ons-button>

                <v-ons-alert-dialog modifier="rowfooter"
                    :visible.sync="isVisible"
                >
                    <span slot="title">Bestätigen</span>

                    Soll {{ member.name }} wirklich Entlassen werden?

                    <template slot="footer">
                        <v-ons-alert-dialog-button @click="isVisible = false">Abbrechen</v-ons-alert-dialog-button>
                        <v-ons-alert-dialog-button @click="kickMember">Ja</v-ons-alert-dialog-button>
                    </template>
                </v-ons-alert-dialog>
            </section>
        </div>
        
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'TeamMemberEditApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            member: null,
            manage: false,
            rank  : 0,
            isVisible: false
        }
    },

    methods: {
        save () {
            if (this.member.id == null || this.member.rank == null) return

            this.triggerServer('editTeamMember', this.member.id, this.member.rank, this.member.bank, this.member.inventory, this.manage)
        },

        kickMember () {
            this.isVisible = false
            if (this.member.id == null) return
            
            this.triggerServer('kickMember', this.member.id)
        },
    },

    created () {
        this.manage = parseInt(this.member.manage) === 2
    },
}
</script>