<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Offene Notrufe</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Offene Notrufe ({{ services.length }})</v-ons-list-header>
            <v-ons-list-item v-if="services.length == 0">
                <div class="center">Es wurden keine offenen Notrufe gefunden</div>
            </v-ons-list-item>
            <v-ons-list-item v-else modifier="longdivider" v-for="service in services" :key="service.id">
                <div class="center">
                    <span class="list-item__title">{{ service.name }}</span>
                    <span class="list-item__subtitle">{{ service.message }}</span>
                    <span class="list-item__subtitle">Telefon: {{ service.telnr }}</span>
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
                    <v-ons-button class="pointer" modifier="large" v-on:click="acceptService(service)">Annehmen
                    </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'ServiceListApp',
    extends: BaseApp,
    data () {
        return {
            services: [],
        }
    },
    methods: {
        responseOpenServiceList (serviceList) {
            this.services = JSON.parse(serviceList)
        },
        callService (number) {
            this.triggerServer('callUserPhone', number)
        },
        acceptService (service) {
            this.triggerServer('acceptOpenService', service.id)
            let index = this.services.indexOf(service)

            if (index > -1) {
                this.services.splice(index, 1)
            }

            this.setServiceGps(service)
        },
        setServiceGps (location) {
            this.trigger('setGpsCoordinatesAccepted', JSON.stringify({ x: location.posX, y: location.posY }))
        },
    },
    mounted () {
        this.triggerServer('requestOpenServices')
    },
    props: ['pageStack'],
}
</script>

<style>
.pointer {
    cursor: pointer !important;
}
</style>
