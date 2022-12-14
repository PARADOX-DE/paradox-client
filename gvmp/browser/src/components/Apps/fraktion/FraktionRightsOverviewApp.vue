<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fraktionsverwaltung</div>
        </v-ons-toolbar>
        <div class="table">
            <v-ons-row class="fRow" style="font-weight: bold;">
                <v-ons-col width="10%">Rang</v-ons-col>
                <v-ons-col>Name</v-ons-col>
                <v-ons-col>Bank</v-ons-col>
                <v-ons-col>Lager</v-ons-col>
                <v-ons-col>Verwaltung</v-ons-col>
            </v-ons-row>
            <v-ons-row class="fRow" v-for="member in members.list" :key="member.id" style="padding-bottom: 1.5rem;">
                <v-ons-col width="10%">{{ member.rang }}</v-ons-col>
                <v-ons-col>{{ member.name }}</v-ons-col>
                <v-ons-col>
                    <v-ons-checkbox style="margin-top: 7px;" v-model="member.rights_bank" disabled></v-ons-checkbox>
                </v-ons-col>
                <v-ons-col>
                    <v-ons-checkbox style="margin-top: 7px;" v-model="member.rights_storage" disabled></v-ons-checkbox>
                </v-ons-col>
                <v-ons-col>
                    <v-ons-checkbox style="margin-top: 7px;" v-model="member.rights_manage" disabled></v-ons-checkbox>
                </v-ons-col>
            </v-ons-row>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'FraktionRightsOverviewApp',
    extends: BaseApp,
    data () {
        return {
            members: [],
        }
    },
    methods: {},
    mounted () {

    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.fRow {
    padding: 1rem 0 0 1rem;
}

.mittig {
    text-align: center;
}

.pointerClass {
    cursor: pointer;
}
</style>