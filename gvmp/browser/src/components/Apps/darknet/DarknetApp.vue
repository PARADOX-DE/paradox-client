<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Darknet App</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-card>
                <div class="content">
                    <v-ons-list>
                        <v-ons-list-item>React</v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
            <v-ons-list-item modifier="chevron" @click="pushBounty">Mordauftrag</v-ons-list-item>
            <v-ons-list-item modifier="chevron" @click="pushAgencySupport">Agency Unterstuetzung</v-ons-list-item>
            <!--<v-ons-list-item modifier="chevron" @click="pushClearWanteds">Strafakten Loeschung</v-ons-list-item>-->
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import DarknetAgencySupportApp from '../darknet/DarknetAgencySupportApp'
import DarknetBountyApp from '../darknet/DarknetBountyApp'
import DarknetClearWantedsApp from '../darknet/DarknetClearWantedsApp'

export default {
    name: 'DarknetApp',

    extends: BaseApp,

    data () {
        return {}
    },
    methods: {
        pushBounty () {
            this.pageStack.push({ extends: DarknetBountyApp })
        },
        pushAgencySupport () {
            this.pageStack.push({ extends: DarknetAgencySupportApp })
        },
        pushClearWanteds () {
            this.pageStack.push({ extends: DarknetClearWantedsApp })
        },
    },
    mounted () {

    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}
</style>