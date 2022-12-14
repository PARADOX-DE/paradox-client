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
                        <v-ons-switch :checked="member.manage" v-model="member.manage"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Raffenerie
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.raffinery" v-model="member.raffinery"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Tankstelle
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.fuelstation" v-model="member.fuelstation"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Nightclub
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.nightclub" v-model="member.nightclub"></v-ons-switch>
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
                        Tätowierer
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="member.tattoo" v-model="member.tattoo"></v-ons-switch>
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-cash" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            type="number"
                            class="text-input"
                            placeholder="Gehalt eingeben..."
                            v-model="member.salary"
                        />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button style="background-color: green" modifier="large" @click="save">
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
    name: 'BusinessMemberEditApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            member: null,
            isVisible: false,
        }
    },

    methods: {
        save () {
            if (this.member.id == null) return

            this.triggerServer(
                'editBusinessMember',
                this.member.id,
                this.member.bank,
                this.member.manage,
                this.member.salary,
                this.member.raffinery,
                this.member.fuelstation,
                this.member.nightclub,
                this.member.tattoo,
            )

            this.pageStack.pop()
        },

        kickMember () {
            this.isVisible = false
            if (this.member.id == null) return

            this.triggerServer('kickBusinessMember', this.member.id)
            this.pageStack.pop()
        },
    },
}
</script>