<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Haus</div>
        </v-ons-toolbar>
        <v-ons-list>
            <v-ons-list-item modifier="chevron" tappable @click="showHouseList()">Mietplätze</v-ons-list-item>
            <v-ons-list-item modifier="chevron" tappable @click="showHouseVehicles()">Fahrzeuge</v-ons-list-item>
            <v-ons-list-item modifier="chevron" tappable @click="editHouse()">Hauskasse</v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import HouseEdit from './HouseEdit'
import HouseList from './HouseList'
import HouseVehicleList from './HouseVehicleList'

export default {
    name   : 'HouseApp',
    extends: BaseApp,
    data () {
        return {}
    },
    methods: {
        editHouse () {
            this.pageStack.push({ extends: HouseEdit })
        },
        showHouseList () {
            this.pageStack.push({ extends: HouseList })
        },
        showHouseVehicles () {
            this.pageStack.push({ extends: HouseVehicleList })
        },
    },
    props  : ['pageStack'],
}
</script>