<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Banking
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list>
                <v-ons-list-item>
                    <div class="left">
                        <v-ons-icon icon="ion-md-card" class="list-item__icon" style="color: #5e5e5e"></v-ons-icon>
                    </div>

                    <div class="center">
                        <span style="color: white;">
                            ${{ convert(balance) }}
                        </span>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <v-ons-list-title>
                Kontobewegungen
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item modifier="longdivider" v-for="(overview,index) in bankOverview" :key="index">
                    <div class="center" :style="{color: overview.value === 0 ? '#7e7e7e' : null}">
                        {{ overview.name }}
                    </div>

                    <div class="right">
                        <span v-if="overview.value === 0" style="color: #7e7e7e">
                            ${{ convert(overview.value) }}
                        </span>

                        <span
                            v-if="overview.value >= 1 && overview.name === 'Geldautomat - Auszahlung'"
                            style="color:#ff3636"
                        >
                            ${{ convert(overview.value) }}
                        </span>

                        <span v-else-if="overview.value >= 1" style="color:#35fd35">
                            ${{ convert(overview.value) }}
                        </span>

                        <span v-if="overview.value <= -1" style="color:#ff3636">
                            -${{ convert(overview.value).toString().replace('-', '') }}
                        </span>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'BankingAppOverview',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            balance     : 0,
            bankOverview: [],
        }
    },

    methods: {
        convert (money) {
            return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },

        responseBankingAppOverview (balance, history) {
            this.balance      = balance
            this.bankOverview = JSON.parse(history)
        },
    },

    mounted () {
        this.triggerServer('requestBankingAppOverview')
    },
}
</script>