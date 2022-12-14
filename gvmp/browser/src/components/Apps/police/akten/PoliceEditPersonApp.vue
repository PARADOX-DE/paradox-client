<template>
    <v-ons-page>
        <section style="margin: 20px;">
            <div>
                <v-ons-list>
                    <v-ons-button
                        modifier="toolbar"
                        style="margin-left: 42rem"
                        class="color-background blue"
                        v-on:click="save()"
                    >Speichern
                    </v-ons-button>
                    <v-ons-list-header>Informationen zur Person</v-ons-list-header>
                    <v-ons-list-item>
                        Wohnort<input
                        type="text"
                        v-model="person.address"
                        style="margin-left: 5rem;margin-right: 4rem;"
                        maxlength="64"
                        class="margin-left-right"
                    /><!--input mit textarea gleich stellen, buttons save address, show addr-->
                        Telefonnummer<input
                        type="text"
                        v-model="person.phone"
                        style="margin-left: 1rem"
                        maxlength="64"
                        class="margin-left-right"
                    />
                    </v-ons-list-item>
                    <v-ons-list-item>
                        Zugeh&ouml;rigkeit<input
                        type="text"
                        v-model="person.membership"
                        style="margin-left: 2rem"
                        maxlength="64"
                        class="margin-left-right"
                    /><!--input mit textarea gleich stellen, buttons save address, show addr-->
                    </v-ons-list-item>
                    <v-ons-list-item>
                        {{ person.note }}<!--input mit textarea gleich stellen, buttons save address, show addr-->
                    </v-ons-list-item>
                    <v-ons-list-item>Bemerkungen<textarea
                        v-model="person.info"
                        style="margin-left: 2rem; background-color: #2f2f2f; color: white;"
                        maxlength="512"
                        class="margin-left-right"
                        rows="3"
                        cols="100"
                    ></textarea></v-ons-list-item>
                    <v-ons-list-header>Lizenzen der Person</v-ons-list-header>
                    <v-ons-list-item modifier="longdivider" v-for="license in licenses" :key="license">
                        <div class="center">
                            {{ license.name }}:
                            <span class="color-text green" v-if="license.value == 1"> Vorhanden</span>
                            <!--icon grüner harken-->
                            <span class="color-text red" v-else-if="license.value == 0"> Nicht eingetragen</span>
                            <span class="color-text red" v-else> Sperre ({{ formatSeconds(license.value) }})</span>
                        </div>
                    </v-ons-list-item>
                    <v-ons-list-header>Übersicht der offenen Verbrechen</v-ons-list-header>
                    <v-ons-list-item modifier="longdivider" v-if="wanteds.crimes.length == 0">
                        <div class="left">Person hat aktuell keine Verbrechen begangen</div>
                    </v-ons-list-item>
                    <v-ons-list-item modifier="longdivider" v-if="wanteds.crimes.length >= 1">
                        <div class="left">Kosten für den Aufenthalt: {{ wanteds.sumjailcosts }}$</div>
                        <div class="center" style="margin-left: 2rem">Gef&auml;ngniszeit: {{ wanteds.sumjailtime }}
                                                                      Hafteinheiten
                        </div>
                        <div class="right">
                            <v-ons-icon
                                style="color: red;"
                                icon="ion-trash-a, material:md-delete"
                                class="list-item__icon"
                                v-on:click="removeAllCrimes()"
                            ></v-ons-icon>
                        </div>
                    </v-ons-list-item>
                    <v-ons-list-item modifier="longdivider" v-for="wanted in wanteds.crimes" :key="wanted">
                        <div class="left">
                            <span>{{ wanted.name }}</span>
                            <span style="margin-left: 1rem">{{ wanted.description }}</span>
                        </div>
                        <div class="right">
                            <v-ons-icon
                                icon="ion-trash-a, material:md-delete"
                                class="list-item__icon"
                                v-on:click="removeCrime(wanted.id)"
                            ></v-ons-icon>
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </div>
        </section>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import Store from './Store'

export default {
    name   : 'PoliceEditPersonApp',
    extends: BaseApp,
    data () {
        return {
            wanteds   : Store.wanteds,
            person    : Store.person,
            licenses  : Store.person.licenses,
            playerName: '',
            acts      : Store.acts.list,
        }

    },
    methods: {
        save () {
            this.triggerServer('savePersonData', Store.person.name, this.person.address, this.person.membership, this.person.phone, this.person.info)
        },
        removeAllCrimes () {
            this.triggerServer('removeAllCrimes', Store.person.name)
            this.wanteds.crimes = []
        },
        responsePersonData (response) {
            this.person = JSON.parse(response)
        },
        removeCrime (id) {
            this.triggerServer('removePlayerCrime', Store.person.name, id)
            this.triggerServer('requestOpenCrimes', Store.person.name)
            this.triggerServer('requestJailTime', Store.person.name)
            this.triggerServer('requestJailCosts', Store.person.name)
        },
        responseOpenCrimes (response) {
            this.wanteds.crimes = JSON.parse(response)
        },
        responseJailTime (response) {
            this.wanteds.sumjailtime = response
        },
        responseJailCosts (response) {
            this.wanteds.sumjailcosts = response
        },
        formatSeconds (time) { //find js way to format
            var seconds = parseInt(time, 10)
            var days    = Math.floor(seconds / (3600 * 24))
            seconds -= days * 3600 * 24
            var hrs     = Math.floor(seconds / 3600)
            seconds -= hrs * 3600
            var mnts    = Math.floor(seconds / 60)
            seconds -= mnts * 60

            return days + ' Tage, ' + hrs + ' Stunden, ' + mnts + ' Minuten, ' + seconds + ' Sekunden'
        },
        responseAkte (response) {
            Store.act         = JSON.parse(response)
            Store.act.created = Store.act.created.split('T', 1).toString()
            Store.act.closed  = Store.act.closed.split('T', 1).toString()
        },
        responseAktenList (response) {
            Store.acts.list = JSON.parse(response)

            Store.acts.forEach(function (item, i) {
                item[i].created = item[i].created.split('T', 1).toString()
                item[i].closed  = item[i].created.split('T', 1).toString()
            })
        },
        responseLicenses (response) {
            this.licenses = []
            this.licenses = JSON.parse(response)
        },
    },
    mounted () {
        this.triggerServer('requestPersonData', Store.person.name)
        this.triggerServer('requestJailTime', Store.person.name)
        this.triggerServer('requestJailCosts', Store.person.name)
        this.triggerServer('requestOpenCrimes', Store.person.name)
        this.triggerServer('requestLicenses', Store.person.name)
        this.triggerServer('requestAkte', Store.person.name)
        this.triggerServer('requestAktenList', Store.person.name)
    },
}
</script>

<style scoped>
input[type="text"],
input[type="number"] {
    color: white !important;
}
</style>
