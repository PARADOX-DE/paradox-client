<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Taxi
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list-title>
                Taxis im Dienst
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item v-if="taxis.length === 0">
                    <div class="center">Keine Taxifahrer im Dienst</div>
                </v-ons-list-item>

                <v-ons-list-item
                    v-else
                    modifier="longdivider chevron"
                    tappable
                    v-for="taxi in taxis"
                    :key="taxi.name"
                    @click="goToRequestTaxi(taxi.name, taxi.number, taxi.price)"
                >
                    <div class="left">
                        <v-ons-icon icon="ion-md-car" class="list-item__icon" style="color: #5e5e5e"></v-ons-icon>
                    </div>

                    <div class="center">
                        <span class="list-item__title">${{ taxi.price }} Grundgebühr</span>
                        <span class="list-item__subtitle">{{ taxi.name }}</span>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import TaxiContact from './TaxiContact'

export default {
    name: 'TaxiListApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            taxis: [],

            driver: null,
        }
    },

    methods: {
        goToRequestTaxi (contactName, contactNumber, contactPrice) {
            this.pageStack.push({
                extends: TaxiContact,
                data () { return { name: contactName, number: contactNumber, price: contactPrice }},
            })
        },

        responseTaxiList (taxiList) {
            this.taxis = JSON.parse(taxiList)
        },
    },

    mounted () {
        this.triggerServer('requestTaxiList')
    },
}
</script>
