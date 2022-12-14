<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Auftragsdetails</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-list modifier="inset">
                <v-ons-list-item>
                    <span class="bold left">Ziel: </span> <span class="right">{{ contractTarget }}</span>
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold left">Tel. AG: </span> <span class="right">{{ contractTelefon }}</span>
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold left">Kopfgeld: </span> <span
                    class="right"
                    v-text="formatPrice(contractBounty)"
                ></span>
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold">Details: </span>
                </v-ons-list-item>
                <v-ons-list-item>
                    {{ contractDetails }}
                </v-ons-list-item>
            </v-ons-list>
            <v-ons-fab
                modifier="mini"
                style="background-color:darkgreen;color:white;"
                position="bottom left"
                v-on:click="acceptContract"
            >
                <ons-icon icon="fa-check"></ons-icon>
            </v-ons-fab>
            <v-ons-fab
                modifier="mini"
                style="background-color:red;color:white;"
                position="bottom right"
                v-on:click="declineContract"
            >
                <ons-icon icon="fa-times"></ons-icon>
            </v-ons-fab>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'HitmanContractsApp',
    extends: BaseApp,
    data () {
        return {
            contractId     : null,
            contractTarget : '',
            contractDetails: '',
            contractTelefon: null,
            contractBounty : null,
        }
    },
    methods: {
        formatPrice (value) {
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },
        acceptContract () {
            this.triggerServer('acceptHitmanContract', this.contractId)
            this.pageStack.pop()
        },
        declineContract () {
            this.triggerServer('declineHitmanContract', this.contractId)
            this.pageStack.pop()
        },
    },
    props  : ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.bold {
    font-weight: bold;
    margin-right: 0.2rem;
}
</style>