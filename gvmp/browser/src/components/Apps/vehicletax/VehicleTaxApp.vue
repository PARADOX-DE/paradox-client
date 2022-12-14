<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fahrzeuginformation</div>
        </v-ons-toolbar>
        <v-ons-row class="fRow">
            <v-ons-col>
                <div class="links">
                    <input
                        placeholder="Fahrzeug Modell"
                        type="text"
                        @keydown.enter="handleSubmit"
                        v-model="searchString"
                        style="margin-right: 1rem"
                    />
                </div>
                <div class="rechts">
                    <v-ons-button
                        style="margin-top: 12px;"
                        class="searchButton pointerClass"
                        modifier="large"
                        @click="handleSubmit"
                    >Modell suchen
                    </v-ons-button>
                </div>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row class="fRow" style="margin-top: 10px;">
            <table style="margin-left: 10px; margin-right: 20px;">
                <tr>
                    <th>Modell Name</th>
                    <th>Steuern</th>
                    <th>Inventar</th>
                    <th>Slots</th>
                    <th>Tankvermögen</th>
                    <th>EK-Preis</th>
                    <th>Business</th>
                </tr>
                <tr v-if="overview.length == 0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr v-else v-for="overviewData in overview" :key="overviewData.model">
                    <td>{{ overviewData.model }}</td>
                    <td>{{ overviewData.tax }} $</td>
                    <td>{{ overviewData.inv_weight }} kg</td>
                    <td>{{ overviewData.inv_size }} Kofferraum</td>
                    <td>{{ overviewData.fuel }} L</td>
                    <td>{{ overviewData.price }} $</td>
                    <td>{{ (overviewData.biz ? 'Ja' : 'Nein') }}</td>
                </tr>
            </table>
        </v-ons-row>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'VehicleTaxApp',
    extends: BaseApp,
    data () {
        return {
            // overview: [{ "model": "test", "tax": 10000, "inv_weight": 400, "inv_size": 5, "fuel": 5000, "biz": 0 }],
            overview    : [],
            searchString: '',
        }
    },
    methods: {
        responseVehicleTax (overview) {
            this.overview = JSON.parse(overview)
        },
        handleSubmit () {
            this.requestVehicleTaxByModel(this.searchString)
            this.searchString = ''
        },
        requestVehicleTaxByModel (search) {
            if (search.trim() === '' || search.length >= 30) return
            this.triggerServer('requestVehicleTaxByModel', search.trim())
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
</style>