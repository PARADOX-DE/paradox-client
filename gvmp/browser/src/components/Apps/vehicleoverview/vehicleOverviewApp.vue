<template>
    <v-ons-page>
        <v-ons-toolbar class="color-background dark-top">
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center" style="color: white;">Fahrzeugübersicht</div>
        </v-ons-toolbar>
        <div class="left-nav color-background heading">
            <v-ons-list class="color-background heading nav">
                <v-ons-list-item
                    modifier="longdivider"
                    v-on:click="requestVehicleOverviewByCategory(0)"
                    class="nav-element"
                    tappable
                >
                    <div class="left">
                        <ons-icon icon="fa-car" class="list-item__icon"></ons-icon>
                    </div>
                    <div class="center">
                        Eigene Fahrzeuge
                    </div>
                </v-ons-list-item>
                <v-ons-list-item
                    modifier="longdivider"
                    v-on:click="requestVehicleOverviewByCategory(2)"
                    class="nav-element"
                    tappable
                >
                    <div class="left">
                        <ons-icon icon="fa-money" class="list-item__icon"></ons-icon>
                    </div>
                    <div class="center">
                        Business Fahrzeuge
                    </div>
                </v-ons-list-item>
                <v-ons-list-item
                    modifier="longdivider"
                    v-on:click="requestVehicleOverviewByCategory(3)"
                    class="nav-element"
                    tappable
                >
                    <div class="left">
                        <ons-icon icon="fa-sticky-note" class="list-item__icon"></ons-icon>
                    </div>
                    <div class="center">
                        Gemietete Fahrzeuge
                    </div>
                </v-ons-list-item>
                <v-ons-list-item
                    modifier="longdivider"
                    v-on:click="requestVehicleOverviewByCategory(1)"
                    class="nav-element"
                    tappable
                >
                    <div class="left">
                        <ons-icon icon="fa-key" class="list-item__icon"></ons-icon>
                    </div>
                    <div class="center">
                        Schlüssel
                    </div>
                </v-ons-list-item>
                <v-ons-list-item>
                    <div class="left">
                        <input type="text" id="site-search" name="q" placeholder="Suchbegriff" v-model="filter">
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
        <div class="key-content color-background dark-secondary">
            <div align="center">
                <div class="content-box">
                    <v-ons-button
                        v-for="vehicle in displayResults"
                        :key="vehicle.id"
                        modifier="row-element"
                        v-on:click="getGpsGarage(vehicle)"
                    >
                        <div class="btn-icon">
                            <img
                                v-if="vehicle.garage == 'Kein GPS Signal...'"
                                :src="nogps_icon"
                                alt="Kein GPS Icon gefunden!"
                            >
                            <img v-else-if="vehicle.inGarage" :src="garage_icon" alt="Garage Icon">
                            <img v-else :src="vehicle_icon" alt="Vehicle Icon">
                        </div>
                        <div class="btn-content">
                            {{ vehicle.vehiclehash }}<br>
                            ID: {{ vehicle.id }}<br>
                            {{ vehicle.garage }}
                        </div>
                    </v-ons-button>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'FahrzeugUebersichtApp',
    extends: BaseApp,
    data () {
        return {
            vehicles    : [],
            nogps_icon  : require('@/assets/nogps.svg'),
            garage_icon : require('@/assets/noparking.svg'),
            vehicle_icon: require('@/assets/car.svg'),
            filter      : '',
        }
    },
    methods : {
        responseVehicleOverview (vehicles) {
            // let example_json = '[{"id":1234,"vehiclehash":"Mercedes-Benz GT-R AMG","garage":"Route 68","inGarage":false}]'
            this.vehicles    = JSON.parse(vehicles)
        },
        requestVehicleOverviewByCategory (category) {
            this.triggerServer('requestVehicleOverviewByCategory', category)
        },
        getGpsGarage (vehicle) {
            if (vehicle.inGarage == true && vehicle.garage != 'kein GPS Signal...') {
                this.trigger('setGpsCoordinates', JSON.stringify({ x: vehicle.carCor.x, y: vehicle.carCor.y }))
            }
        },
        resultsSearchFilter () {
            var tmp_result = this.vehicles
            if (this.filter.length >= 1) {
                tmp_result = tmp_result.filter((x) => {
                    return (
                        x.vehiclehash.toLowerCase().includes(this.filter.toLowerCase()) ||
                        x.garage.toLowerCase().includes(this.filter.toLowerCase()) ||
                        x.id.toString().toLowerCase().includes(this.filter.toLowerCase())
                    )
                })
            }
            return tmp_result
        },
    },
    computed: {
        displayResults () {
            return this.resultsSearchFilter()
        },
    },
    mounted () {
        this.triggerServer('requestVehicleOverviewByCategory', 0)
        this.responseVehicleOverview('asdf')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
.left-nav {
    height: 100%;
    width: 20%;
    float: left;
    color: white;
    overflow-y: auto;
    margin: 0;
    padding-left: 0 !important;
}

.key-content {
    height: 100%;
    width: 80%;
    float: right;
    color: white;
    overflow-y: auto;
    border-left-color: black;
    border-width: 1px;
}

.content-box {
    display: flex;
    background: #414141;
    margin: 2% 3%;
    padding: 0px;
    border-radius: 2%;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 1%;
    padding-right: 1%;
    justify-content: center;
}

.row-element {
    padding: 2%;
    margin-top: 5% !important;
    margin-bottom: 5% !important;
}

.nav {
    align-content: center !important;
}

.nav-element {
    margin-top: 5%;
    margin-bottom: 5%;
    color: white;
    background-image: linear-gradient(0deg, #6f6f71, #6f6f71 100%) !important;
}

.button--row-element {
    background-color: transparent;
    width: 40%;
    height: 25%;
    margin: 3%;
}

.button:active {
    background-color: transparent !important;
}

.btn-icon {
    padding-top: 10%;
    margin: auto;
    display: block;
    width: 20%;
    float: left;
    vertical-align: center;
}

.btn-content {
    height: 100%;
    width: 75%;
    float: right;
}
</style>