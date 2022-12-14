<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Auswertung Notrufe</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Auswertung</v-ons-list-header>
            <v-ons-list-item v-if="evaluations.length == 0">
                <div class="center">Keine Auswertungen verfügbar</div>
            </v-ons-list-item>
            <v-ons-list-item v-else modifier="longdivider" v-for="evaluation in evaluations" :key="evaluation.id">
                <div class="center">
                    <span class="list-item__title">{{ evaluation.name }}</span>
                    <span class="list-item__subtitle">Abgearbeitete Notrufe {{ evaluation.amount }}</span>
                    <span class="list-item__subtitle">Letzter Notruf {{ evaluation.timestr }}</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'ServiceEvaluationApp',
    extends: BaseApp,
    data () {
        return {
            evaluations: [],
        }
    },
    methods: {
        responseEvaluationService (serviceList) {
            this.evaluations = JSON.parse(serviceList)
        },
    },
    mounted () {
        this.triggerServer('requestEvalutionServices')
    },
    props: ['pageStack'],
}
</script>

<style>
.pointer {
    cursor: pointer !important;
}
</style>