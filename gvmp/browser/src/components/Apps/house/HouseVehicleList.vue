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
            <v-ons-list-header>Fahrzeuge</v-ons-list-header>
            <v-ons-list-item modifier="longdivider" tappable v-for="vehicle in vehicles" :key="vehicle.id">
                <div class="left">
                    <span class="list-item__subtitle" style="float:left;">{{ vehicle.id }} - {{ vehicle.name }} - Besitzer: {{ vehicle.owner }}</span>
                </div>
                <div class="right">
                    <v-ons-icon
                        icon="fa-times"
                        style="color: red; cursor: pointer;"
                        class="list-item__icon"
                        @click="dropVehicle(vehicle)"
                    ></v-ons-icon>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'HouseVehicleList',
    extends: BaseApp,
    data () {
        return {
            vehicles: [],
        }
    },
    methods: {
        responseHouseVehicles (vehicles) {
            this.vehicles = JSON.parse(vehicles)
        },
        dropVehicle (vehicle) {
            if (vehicle.id == null) return
            this.triggerServer('dropHouseVehicle', vehicle.id)
            this.pageStack.pop()
        },
    },
    mounted () {
        this.triggerServer('requestHouseVehicles')
    },
    props: ['pageStack'],
}
</script>

<!-- components.get("Smartphone").app = "HouseList" -->
<!-- components.BusinessList.tenants = [{ "id": 1, "name": "person_abc"}, {"id": 2, "name": "person_abcd"}] -->