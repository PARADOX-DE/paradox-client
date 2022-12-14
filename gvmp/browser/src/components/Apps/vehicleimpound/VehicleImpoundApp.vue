<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Verwahrstelle</div>
        </v-ons-toolbar>
        <v-ons-row class="fRow">
            <v-ons-col>
                <div class="links">
                    <input
                        placeholder="Fahrzeug Nummer"
                        type="number"
                        @keydown.enter="handleSubmit"
                        v-model.number="searchString"
                        style="margin-right: 1rem"
                    />
                    <!--<input placeholder="Mitarbeiter" type="text" @keydown.enter="handleSubmit" v-model="searchStringMitarbeiter" style="margin-right: 1rem" />-->
                </div>
                <div class="rechts">
                    <v-ons-button
                        style="margin-top: 12px;"
                        class="searchButton pointerClass"
                        modifier="large"
                        @click="handleSubmit"
                    >Suchen
                    </v-ons-button>
                </div>
            </v-ons-col>
        </v-ons-row>
        <v-ons-row class="fRow" style="margin-top: 10px;">
            <table style="margin-left: 10px; margin-right: 20px;">
                <tr>
                    <th>Nummer</th>
                    <th>Model</th>
                    <th>Beamter</th>
                    <th>Info</th>
                    <th>Zeit</th>
                    <th>Verfügbar</th>
                </tr>
                <tr v-if="overview.length == 0">
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr v-else v-for="overviewData in overview" :key="overviewData.id">
                    <td>{{ overviewData.id }}</td>
                    <td>{{ overviewData.model }}</td>
                    <td>{{ overviewData.officer }}</td>
                    <td>{{ overviewData.reason }}</td>
                    <td>{{ convertTime(overviewData.date) }}</td>
                    <td>{{ calcTime(overviewData.release) }}</td>
                </tr>
            </table>
        </v-ons-row>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'VehicleImpoundApp',
    extends: BaseApp,
    data () {
        return {
            overview               : [],
            searchString           : null,
            searchStringMitarbeiter: '',
        }
    },
    methods: {
        responseVehicleImpound (overview) {
            this.overview = JSON.parse(overview)
        },
        convertTime (time) {
            var d          = new Date(time * 1000)
            var datestring = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear() + ' ' +
                d.getHours() + ':' + d.getMinutes()

            return datestring
        },
        handleSubmit () {
            if (this.searchString != null) {
                this.requestVehicleConfiscationById(this.searchString)
                this.searchString = null
            } else if (this.searchStringMitarbeiter != '') {
                this.triggerServer('requestVehicleImpoundMember', this.searchStringMitarbeiter)
                this.searchStringMitarbeiter = null
            }
        },
        requestVehicleConfiscationById (search) {
            if (search.toString().length > 10) return
            this.triggerServer('requestVehicleConfiscationById', search)
        },
        calcTime (time) {
            if (time >= 3600) { //Wenn über eine Stunde
                let min = Math.floor(time / 60 % 60)
                if (min < 10) min = '0' + min
                return `${Math.floor(time / 60 / 60)}:${min} std`
            } else {
                return `${Math.floor(time / 60)} min`
            }
        },
        isInImpound () {
            //Farben setzen
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