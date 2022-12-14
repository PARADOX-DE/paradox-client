<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                GPS
            </div>
        </v-ons-toolbar>

        <v-ons-tabbar
            position="bottom"
            :tabs="tabs"
            :visible="true"
            :index.sync="activeIndex"
            @prechange="beforeChange"
            @postchange="afterChange"
        >
            <template slot="pages">
                <gps-locations :categories="categories" :result="result" @selected="setGps"></gps-locations>
                <gps-vehicles :categories="categories" :result="result" @selected="setGps"></gps-vehicles>
            </template>

            <v-ons-tab
                v-for="(tab, i) in tabs"
                :icon="tabs[i].icon"
                :key="tabs[i].id"
            ></v-ons-tab>
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import GpsLocations from './GpsLocations'
import GpsVehicles from './GpsVehicles'

export default {
    name: 'GpsApp',

    components: { GpsLocations, GpsVehicles },

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            categories: [],

            result: 'Wird geladen..',

            timer: null,

            activeIndex: 0,

            tabs: [
                {
                    id: 'Orte',
                    page : GpsLocations,
                    icon: 'ion-md-pin',
                },

                {
                    id: 'Fahrzeuge',
                    page : GpsVehicles,
                    icon: 'ion-md-car',
                },
            ],
        }
    },

    methods: {
        beforeChange () {
            // this.categories = []
            this.result     = 'Wird geladen...'
            this.timer      = setInterval(this.noResponse, 3000)
        },

        afterChange () {
            if (this.activeIndex === 0) {
                this.triggerServer('requestGpsLocations')
            } else if (this.activeIndex === 1) {
                this.triggerServer('requestVehicleGps')
            }
        },

        gpsLocationsResponse (response) {
            this.categories = JSON.parse(response)

            if(this.categories.length === 0) {
                this.result = 'Keine Ergebnisse'
            }

            if (this.timer !== null)
                clearInterval(this.timer)
        },

        setGps (location) {
            this.trigger('setGpsCoordinates', JSON.stringify({ x: location.x, y: location.y }))
        },

        noResponse () {
            if (this.timer !== null)
                clearInterval(this.timer)

            this.result = 'Keine Ergebnisse'
        },
    },

    mounted () {
        this.triggerServer('requestGpsLocations')

        this.timer  = setInterval(this.noResponse, 3000)
        this.result = 'Wird geladen..'
    },
}
</script>