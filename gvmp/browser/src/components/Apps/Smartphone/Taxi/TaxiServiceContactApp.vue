<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Auftrag Details
            </div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-contact" class="list-item__icon" style="color: #5e5e5e"></v-ons-icon>
                </div>

                <div class="center">
                    <span class="list-item__title">{{ name }}</span>
                    <span class="list-item__subtitle">Auftraggeber</span>
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-text" class="list-item__icon" style="color: #5e5e5e"></v-ons-icon>
                </div>

                <div class="center">
                    <span class="list-item__title">{{ message }}</span>
                    <span class="list-item__subtitle">Nachricht</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-fab
            modifier="mini"
            style="background-color:darkgreen; color:white;"
            position="bottom left"
            @click="acceptService"
        >
            <v-ons-icon icon="md-check"></v-ons-icon>
        </v-ons-fab>

        <v-ons-fab
            modifier="mini"
            style="background-color:red;color:white;"
            position="bottom right"
            @click="deleteService"
        >
            <v-ons-icon icon="md-close"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'TaxiServiceContactApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            name     : '',
            message  : '',
            spielerId: null,
        }
    },

    methods: {
        acceptService () {
            if (this.name === '' || this.message === '' || this.spielerId == null) return

            this.triggerServer('acceptServiceTaxi', this.spielerId)

            this.pageStack.pop()
        },

        deleteService () {
            if (this.name === '' || this.message === '' || this.spielerId == null) return

            this.triggerServer('deleteServiceTaxi', this.spielerId)

            this.pageStack.pop()
        },
    },
}
</script>