<template>
    <v-ons-page>
        <section style="margin: 20px;">
            <v-ons-list>
                <v-ons-list-item>
                    <v-ons-button
                        modifier="toolbar"
                        style="margin-right: 1rem;"
                        class="color-background blue"
                        v-on:click="save()"
                    >Speichern
                    </v-ons-button>
                    <v-ons-button
                        modifier="toolbar"
                        style="margin-right: 1rem;"
                        class="color-background blue"
                        v-on:click="deletePersonAkte(act.number)"
                    >Löschen
                    </v-ons-button>
                    <v-ons-switch modifier="computer" style="margin-left: 2rem;" v-model="act.open"></v-ons-switch>
                    <span
                        class="margin-left-right"
                        v-if="act.number != 0"
                        style="margin-left: 4px;"
                    >Aktennummer {{ act.number }} </span>
                    <span
                        class="color-text blue margin-left-right"
                        style="margin-left: 6px"
                        v-text="act.open ? 'Offen' : 'Geschloßen'"
                    ></span>
                </v-ons-list-item>
                <v-ons-list-item>
                    Titel <input
                    type="text"
                    style="margin-left: 1rem;margin-right: 4rem;"
                    maxlength="64"
                    class="margin-left-right"
                    v-model="act.title"
                />
                    Bearbeitet von <input
                    type="text"
                    style="margin-left: 1rem;"
                    maxlength="64"
                    class="margin-left-right"
                    v-model="act.officer"
                />
                </v-ons-list-item>
                <v-ons-list-item>
                    Erstellt am <input
                    class="margin-left-right"
                    v-model="act.created"
                    style="margin-left: 1rem;margin-right: 2rem;border: none"
                    @click.prevent
                    type="date"
                />
                    Geschlossen am <input
                    class="margin-left-right"
                    v-model="act.closed"
                    style="margin-left: 1rem;border: none"
                    @click.prevent
                    type="date"
                />
                </v-ons-list-item>
                <v-ons-list-item>
                    Bericht<textarea v-model="act.text" rows="20" cols="125" style="background-color: #2f2f2f; color: white;"></textarea>
                </v-ons-list-item>
            </v-ons-list>
        </section>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import Store from './Store'
//import Computer from "../../../../../../client/modules/key"

//if new act number is null, if null set Neue Akte?

export default {
    name   : 'PoliceAddAktenApp',
    extends: BaseApp,
    data () {
        return {
            playerName: '',
            act       : Store.act,
        }
    },
    methods: {
        save () {
            if (this.act.created != null && this.act.closed != null && this.act.open != null && this.act.officer != null && this.act.title != null && this.act.text != null) {
                this.triggerServer('savePersonAkte', Store.person.name, JSON.stringify(this.act))
                this.triggerServer('closeComputer')
            }
        },
        deletePersonAkte (actID) {
            if (actID != 0) {
                this.triggerServer('deletePersonAkte', actID)
                this.triggerServer('closeComputer')
            }
        },
    },
    mounted () {
        setTimeout(function () {
            if (Store.person.change) {
                this.act            = Store.act
                Store.person.change = false
            }
        }, 1500)
    },
}
</script>

<style scoped>
input[type="text"],
input[type="date"],
input[type="number"] {
    color: white !important;
}
</style>
