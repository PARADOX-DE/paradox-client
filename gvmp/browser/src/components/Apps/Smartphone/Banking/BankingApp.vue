<template>
    <v-ons-page>
        <v-ons-tabbar position="bottom" :tabs="tabs" :visible="true" :index.sync="activeIndex">
            <template slot="pages">
                <component v-for="tab in tabs" :is="tab.page" :key="tab.id" :page-stack="pageStack"></component>
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
import BankingAppOverview from './BankingAppOverview'
import BankingAppTransfer from './BankingAppTransfer'

export default {
    name: 'BankingApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            activeIndex: 0,

            tabs: [
                {
                    id  : 'Übersicht',
                    icon: 'ion-md-clipboard',
                    page: BankingAppOverview,
                },

                {
                    id  : 'Überweisung',
                    icon: 'ion-md-cash',
                    page: BankingAppTransfer,
                },
            ],
        }
    },
}
</script>