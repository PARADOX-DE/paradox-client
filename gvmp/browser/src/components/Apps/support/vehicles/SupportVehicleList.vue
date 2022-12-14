<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fahrzeug Liste</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Fahrzeuge gefunden ({{ vehicleList.length }})</v-ons-list-header>

            <v-ons-list-item v-if="vehicleList.length == 0">
                <div class="center">Es konnten keine Fahrzeuge gefunden werden</div>
            </v-ons-list-item>

            <v-ons-list-item
                v-else
                modifier="longdivider"
                tappable
                v-for="vehicle in vehicleList"
                :key="vehicle.id"
                @click="push(vehicle.id)"
            >
                <div class="center">
                    <span class="list-item__title">{{
                            vehicle.vehiclehash
                                                   }} <small>{{ formatInGarageStatus(vehicle.inGarage) }}</small></span>
                    <span class="list-item__subtitle">Aktuelle Garage: {{ vehicle.garage }}</span>
                </div>
                <div class="right">
                    <v-ons-icon icon="md-chevron-right" class="list-item__icon"></v-ons-icon>
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import SupportVehicleProfile from './SupportVehicleProfile'

export default {
    name   : 'SupportVehicleList',
    extends: BaseApp,
    data () {
        return {
            owner      : null,
            vehicleList: [],
        }
    },
    methods: {
        responseVehicleList (response) {
            this.vehicleList = JSON.parse(response)
        },
        formatInGarageStatus (status) {
            return status ? 'Eingeparkt' : 'Ausgeparkt'
        },
        push (id) {
            this.pageStack.push({ extends: SupportVehicleProfile, data () { return { vehicleId: id }} })
        },
    },
    mounted () {
        this.triggerServer('requestSupportVehicleList', this.owner)
    },
    props: ['pageStack'],
}
</script>


<style lang="scss" scoped>

</style>