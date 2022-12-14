<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Kennzeichen Übersicht</div>
        </v-ons-toolbar>
        <v-ons-row class="fRow">
            <v-ons-col>
                <div class="links">
                    <input
                        placeholder="Fahrzeug ID"
                        type="number"
                        @keydown.enter="handleSubmit"
                        v-model="vehicleID"
                        style="margin-right: 1rem"
                    />
                    <!--<span style="margin-left: 20px; margin-right: 20px; font-size: 12px; font-weight: bold; color: #FF9800;">oder</span> -->
                    <input placeholder="Kennzeichen" type="text" @keydown.enter="handleSubmit" v-model="vehiclePlate" />
                </div>
                <div class="rechts">
                    <v-ons-button
                        style="margin-top: 12px;"
                        class="searchButton pointerClass"
                        modifier="large"
                        @click="handleSubmit"
                    >Fahrzeug suchen
                    </v-ons-button>
                </div>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row class="fRow" style="margin-top: 10px;">
            <table style="margin-left: 10px; margin-right: 20px;">
                <tr>
                    <th>Seriennummer</th>
                    <th>Angemeldet auf</th>
                    <th>Angemeldet von</th>
                    <th>Kennzeichen</th>
                    <th>Status</th>
                    <th>Datum</th>
                </tr>
                <tr v-if="plate.length == 0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr v-else v-for="plateData in plate" :key="plateData.id">
                    <td>{{ plateData.id }}</td>
                    <td>{{ plateData.owner }}</td>
                    <td>{{ plateData.officer }}</td>
                    <td>{{ plateData.plate }}</td>
                    <td>
                        <img
                            style="width: 24px; height: 24px; padding-top: 5px;"
                            :src="plateData.status ? icon_angemeldet : icon_abgemeldet"
                            alt="Icon"
                        >
                    </td>
                    <td>{{ plateData.timestamp }}</td>
                </tr>
            </table>
        </v-ons-row>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'KennzeichenUebersichtApp',
    extends: BaseApp,
    data () {
        return {
            plate          : [],
            vehicleID      : null,
            vehiclePlate   : '',
            icon_abgemeldet: require('@/assets/abgemeldet.svg'),
            icon_angemeldet: require('@/assets/angemeldet.svg'),
        }
    },
    methods: {
        responsePlateOverview (plate) {
            this.plate = JSON.parse(plate)
        },
        handleSubmit () {
            if (this.vehicleID == null) {
                if (this.vehiclePlate.trim() === '' || this.vehiclePlate.length >= 30) return
                this.requestVehicleOverviewByPlate(this.vehiclePlate.trim())
            } else {
                if (this.vehicleID.toString().trim() === '' || this.vehicleID.toString().length >= 30) return
                this.requestVehicleOverviewByVehicleId(this.vehicleID)
            }

            this.vehicleID    = null
            this.vehiclePlate = ''
        },
        requestVehicleOverviewByVehicleId (id) {
            this.triggerServer('requestVehicleOverviewByVehicleId', id)
        },
        requestVehicleOverviewByPlate (plate) {
            this.triggerServer('requestVehicleOverviewByPlate', plate)
        },
    },
    props  : ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.fRow {
    padding: 1rem 0 0 1rem;
}

.links {
    text-align: left;
    float: left;
    margin-left: 10px;
}

.rechts {
    text-align: left;
    float: right;
    margin-right: 20px;
}

.pointerClass {
    cursor: pointer;
}

.searchButton {
    background-color: #ff9800;
    box-shadow: none;
}

.searchButton:hover {
    background-color: rgb(233, 140, 0);
    border: none;
}

.searchButton:active {
    background-color: rgb(233, 140, 0);
    border: none;
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td, th {
    //border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
    font-size: 15px;
}

tr:nth-child(even) {
    background-color: #1d1d1d;
}

input[type="text"],
input[type="number"] {
    color: white !important;
}
</style>