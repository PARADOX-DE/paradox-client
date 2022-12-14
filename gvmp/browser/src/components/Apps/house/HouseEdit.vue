<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Haus</div>
        </v-ons-toolbar>
        <v-ons-list>
            <v-ons-list-header>Hauskasse</v-ons-list-header>
            <v-ons-list-item>
                Vorhandenes Geld: {{ money }}
            </v-ons-list-item>
            <v-ons-list-item>
                <input
                    placeholder="Geldbetrag eingeben"
                    type="text"
                    v-model="amountToWithDraw"
                    value="amountToWithDraw"
                    style="width: 100%;"
                >
            </v-ons-list-item>
            <v-ons-list-item>
                <v-ons-button
                    style="width:100%; margin-right: 10px; margin-top: -1px;"
                    class="color-background blue"
                    modifier="large"
                    v-on:click="withdraw"
                >Geld entnehmen
                </v-ons-button>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'HouseEdit',
    extends: BaseApp,
    data () {
        return {
            money           : 0,
            amountToWithDraw: 0,
        }
    },
    methods: {
        responseHouseData (data) {
            this.money = data
        },
        withdraw () {
            if (this.amountToWithDraw > this.money) return
            this.money = this.money - this.amountToWithDraw
            this.triggerServer('withDrawHouseCash', this.amountToWithDraw)
            this.amountToWithDraw = 0
        },
    },
    mounted () {
        this.triggerServer('requestHouseData')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}
</style>