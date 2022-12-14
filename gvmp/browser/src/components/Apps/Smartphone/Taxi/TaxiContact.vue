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
            <v-ons-list-title style="padding-bottom: 0 !important;">
                Taxi Anfrage stellen
            </v-ons-list-title>

            <section>
                <v-ons-row>
                    <v-ons-col style="text-align: center">{{ name }}</v-ons-col>
                </v-ons-row>

                <v-ons-row>
                    <v-ons-col style="text-align: center;">${{ price }} Grundgebühr</v-ons-col>
                </v-ons-row>
            </section>

            <v-ons-list>
                <v-ons-list-item>
                    <div class="left">
                        <v-ons-icon icon="ion-md-text" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input type="text" class="text-input" v-model="message" placeholder="Nachricht eingeben..." />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button modifier="large" @click="requestTaxi">
                    Taxi anfordern
                </v-ons-button>

                <v-ons-row style="margin-top: 1.875vh;">
                    <v-ons-col style="color: #666">
                        Die Grundgebühr wird Ihnen berechnet, sobald der Taxifahrer Ihre Anfrage annimmt.
                    </v-ons-col>
                </v-ons-row>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'TaxiContact',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            message: '',

            name  : '',
            number: null,
            price : null,
        }
    },

    methods: {
        requestTaxi () {
            let n = this.message.trim()
            if (this.name === '' || this.message === '' || this.price === null || n === '') return

            this.triggerServer('requestTaxiDriver', this.name, this.message, this.price)
        },
    },
}
</script>