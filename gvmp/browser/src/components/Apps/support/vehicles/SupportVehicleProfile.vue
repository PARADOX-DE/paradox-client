<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fahrzeug Profil</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Fahrzeug Profil von ID: ({{ vehicleData.id }})</v-ons-list-header>

            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <span class="list-list-item__subtitle size">Fahrzeug ID: {{ vehicleData.id }}</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <span class="list-list-item__subtitle size">Fahrzeug Hash: {{ vehicleData.vehiclehash }}</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <span class="list-list-item__subtitle size">Fahrzeug Status: {{
                            formatInGarageStatus(vehicleData.inGarage)
                                                                }}</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <span class="list-list-item__subtitle size">Fahrzeug Garage: {{ vehicleData.garage }}</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <v-ons-button
                    class="pointer"
                    style="width: 48%; margin-right: 2%;"
                    modifier="large"
                    @click="setInGarage"
                >Fahrzeug einparken
                </v-ons-button>
                <v-ons-button
                    class="pointer"
                    style="width: 48%; mergin-right: 2%;"
                    modifier="large"
                    @click="goToVehicle"
                >Zu Fahrzeug teleportieren
                </v-ons-button>
            </v-ons-list-item>

        </v-ons-list>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name   : 'SupportVehicleProfile',
    extends: BaseApp,
    data () {
        return {
            vehicleId  : null,
            vehicleData: [],
        }
    },
    methods: {
        responseVehicleData (response) {
            this.vehicleData = JSON.parse(response)[0]
        },
        formatInGarageStatus (status) {
            return status ? 'Eingeparkt' : 'Ausgeparkt'
        },
        setInGarage () {
            this.triggerServer('SupportSetGarage', this.vehicleData.id)
        },
        goToVehicle () {
            this.triggerServer('SupportGoToVehicle', this.vehicleData.id)
        },
        toggleState () {
            this.toggle = !this.toggle
        },
    },
    mounted () {
        this.triggerServer('requestVehicleData', this.vehicleId)
    },
    props: ['pageStack'],
}
</script>


<style lang="scss" scoped>
.inputClass {
    width: 100%;
    font-size: 12px;
    margin-right: 15px;
}
</style>