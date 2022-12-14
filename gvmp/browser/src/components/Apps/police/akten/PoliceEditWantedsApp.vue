<template>
    <v-ons-page>
        <section style="margin: 20px;">
            <v-ons-list>
                <v-ons-list-item>
                    <v-ons-button
                        modifier="toolbar"
                        class="color-background blue"
                        v-on:click="addPlayerWanteds(playerName)"
                    >Vergeben
                    </v-ons-button>
                    <v-ons-button
                        modifier="toolbar"
                        style="margin-left: 1rem;"
                        class="color-background blue"
                        v-on:click="removeAllWanteds"
                    >Alle löschen
                    </v-ons-button>
                </v-ons-list-item>
            </v-ons-list>
            <div style="width: 20rem; float: left; margin-right: 2rem">
                <v-ons-list v-if="showCategories">
                    <v-ons-list-header>Kategorien</v-ons-list-header>
                    <v-ons-list-item tappable v-for="categorie in wanteds.categories" :key="categorie">
                        <div class="center" v-on:click="selectCathegorie(categorie.id)">{{ categorie.name }}</div>
                    </v-ons-list-item>
                </v-ons-list>
                <v-ons-list v-else>
                    <v-ons-list-header>Gründe
                        <v-ons-icon @click="showCategories = true" icon="arrow-left" size="0.8rem"></v-ons-icon>
                    </v-ons-list-header>
                    <v-ons-list-item tappable v-for="reason in wanteds.reasons" :key="reason">
                        <div class="center" v-on:click="addNewWanted(reason,reason.id)">{{ reason.name }}</div>
                    </v-ons-list-item>
                </v-ons-list>
            </div>
            <v-ons-list>
                <v-ons-list-header v-if="newWanteds.length >= 0">Neue Wanteds</v-ons-list-header>
                <v-ons-list-item modifier="longdivider" v-for="(wanted, index) in newWanteds" :key="index">
                    <div class="left">{{ wanted.name }}</div>
                    <div class="center">
                        <i class="fas fa-minus" @click="removeNewWanted(wanted)"></i><!--dünner, trash icon?-->
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </section>
    </v-ons-page>
</template>

<script>

import BaseApp from '../../../BaseApp'
import Store from './Store'

export default {
    name   : 'PoliceEditWantedsApp',
    extends: BaseApp,
    data () {
        return {
            playerName    : '',
            showCategories: true,
            wanteds       : Store.wanteds,
            newWanteds    : [],
            newWantedID   : [],
            res           : [],
        }
    },
    methods: {
        responseCategories (response) {
            Store.wanteds.categories = JSON.parse(response)
            this.res                 = JSON.parse(response)
        },
        selectCathegorie (id) {
            this.showCategories = false
            this.triggerServer('requestCategoryReasons', id)
        },
        responseCategoryReasons (response) {
            Store.wanteds.reasons = JSON.parse(response)
            this.res              = JSON.parse(response)
        },
        addPlayerWanteds () {
            this.triggerServer('addPlayerWanteds', Store.person.name, JSON.stringify(this.newWantedID))
            this.triggerServer('closeComputer')
        },
        removeCrime (index, id) {
            this.triggerServer('removePlayerCrime', Store.person.name, id)
            this.playerWanteds.splice(index, 1)
        },
        removeAllWanteds () {
            this.newWanteds  = []
            this.newWantedID = []
        },
        addNewWanted (reason, id) {
            if (this.newWanteds.includes(reason)) return
            this.newWanteds.push(reason)
            this.newWantedID.push(id)
        },
        removeNewWanted (wanted) {
            const index = this.newWanteds.indexOf(wanted)
            if (index > -1) {
                this.newWanteds.splice(index, 1)
                this.newWantedID.splice(index, 1)
            }
        },
    },
    mounted () {
        this.triggerServer('requestWantedCategories')
        this.triggerServer('requestOpenCrimes', Store.person.name)
    },
}
</script>

<style>

</style>
