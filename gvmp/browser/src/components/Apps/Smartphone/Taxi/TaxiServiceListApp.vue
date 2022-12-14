<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Meine Anfragen
            </div>
        </v-ons-toolbar>

        <div class="content">
            <template v-if="taxiDuty">
                <v-ons-list-title>
                    Offene Aufträge: {{ services.length }}
                </v-ons-list-title>

                <v-ons-list>
                    <v-ons-list-item v-if="services.length === 0">
                        <div class="center">Keine offenen Aufträge</div>
                    </v-ons-list-item>

                    <v-ons-list-item
                        v-else
                        modifier="longdivider chevron"
                        tappable
                        v-for="service in services"
                        :key="service.id"
                        @click="goToRequestDetails(service.name, service.message, service.id)"
                    >
                        <div class="center">
                            {{ service.name }}
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </template>

            <v-ons-list v-else>
                <v-ons-list-item>
                    <div class="center">
                        Sie sind nicht im Taxi Dienst!
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import TaxiServiceContactApp from './TaxiServiceContactApp'

export default {
    name: 'TaxiServiceListApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            services: [],

            taxiDuty: false,
        }
    },

    methods: {
        goToRequestDetails (serviceName, serviceMessage, serviceSpielerId) {
            this.pageStack.push({
                extends: TaxiServiceContactApp,
                data () { return { name: serviceName, message: serviceMessage, spielerId: serviceSpielerId } },
            })
        },

        responseServiceList (taxiDuty, serviceList) {
            this.services = JSON.parse(serviceList)

            this.taxiDuty = taxiDuty
        },
    },

    mounted () {
        this.triggerServer('requestTaxiServiceList')
    },
}
</script>