<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Übersicht {{ playerName }}
            </div>

            <div class="right">
                <v-ons-button
                    modifier="toolbar"
                    v-if="tabs[activeIndex].save"
                    @click="tabs[activeIndex].save"
                >
                    Speichern
                </v-ons-button>
            </div>
        </v-ons-toolbar>

        <v-ons-tabbar position="top" :tabs="tabs" :visible="true" :index.sync="activeIndex">
            <template slot="pages">
                <component v-for="tab in tabs" :is="tab.page" :key="tab.label" :page-stack="pageStack"></component>
            </template>

            <v-ons-tab
                v-for="(tab, i) in tabs"
                :label="tabs[i].label"
                :key="tabs[i].label"
            ></v-ons-tab>
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import PoliceEditPersonApp from './PoliceEditPersonApp'
import PoliceEditWantedsApp from './PoliceEditWantedsApp'
import PoliceAddAktenApp from './PoliceAddAktenApp'
import PoliceListProgressApp from './PoliceListProgressApp'

export default {
    name: 'PoliceOverviewApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            playerName : '',
            activeIndex: 0,
            tabs       : [
                {
                    label: 'Informationen',
                    page : PoliceEditPersonApp,
                },

                {
                    label:
                        'Wantedvergabe',
                    page : PoliceEditWantedsApp,
                },

                {
                    label: 'Aktuelle Akte',
                    page : PoliceAddAktenApp,
                },

                {
                    label: 'Verlauf',
                    page : PoliceListProgressApp,
                },
            ],
        }
    },
}
</script>
