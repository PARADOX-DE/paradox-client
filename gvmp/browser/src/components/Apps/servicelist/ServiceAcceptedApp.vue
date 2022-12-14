<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Notrufe Übersicht</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Übersicht Notrufe ({{ services.length }})</v-ons-list-header>
            <v-ons-list-item v-if="services.length == 0">
                <div class="center">Es wurden keine Notrufe in bearbeitung gefunden</div>
            </v-ons-list-item>
            <v-ons-list-item v-else modifier="longdivider" v-for="service in services" :key="service.id">
                <div class="center">
                    <span class="list-item__title">{{ service.name }}</span>
                    <span class="list-item__subtitle">{{ service.message }}</span>
                    <span class="list-item__subtitle">Telefon: {{ service.telnr }}</span>
                </div>
                <div class="right">
                    <span class="badge">Angenommen: {{ service.accepted }}</span>
                </div>
                <div class="right">
                    <v-ons-button
                        class="pointer"
                        modifier="large"
                        v-if="service.telnr != 0"
                        v-on:click="callService(service.telnr)"
                    >Anrufen
                    </v-ons-button>
                    <v-ons-button class="pointer" modifier="large" v-on:click="setServiceGps(service)">Navigation
                    </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'ServiceAcceptedApp',
    extends: BaseApp,
    data () {
        return {
            services: [],
        }
    },
    methods: {
        responseTeamServiceList (serviceList) {
            this.services = JSON.parse(serviceList)
        },
        callService (number) {
            this.triggerServer('callUserPhone', number)
        },
        setServiceGps (location) {
            this.trigger('setGpsCoordinatesAccepted', JSON.stringify({ x: location.posX, y: location.posY }))
        },
    },
    mounted () {
        this.triggerServer('RequestTeamServiceList')
    },
    props: ['pageStack'],
}
</script>

<style>
.pointer {
    cursor: pointer !important;
}

.badge {
    color:         #6b6b6d;
    font-size:     12px;
    border:        #6b6b6d solid 1px;
    border-radius: 3px;
    padding:       5px;
}
</style>