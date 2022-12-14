<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Agency Auftraege</div>
        </v-ons-toolbar>
        <ons-list>
            <ons-list-item v-if="contracts.length == 0">Keine Auftraege vorhanden!</ons-list-item>
            <ons-list-item
                modifier="chevron"
                tappable
                v-for="contract in contracts"
                :key="contract.id"
                @click="pushContract(contract)"
            >{{ contract.target }}
            </ons-list-item>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import HitmanContractsApp from '../hitman/HitmanContractsApp'

export default {
    name   : 'HitmanContractListApp',
    extends: BaseApp,
    data () {
        return {
            contracts: [],
        }
    },
    methods: {
        responseHitmanContracts (contracts) {
            this.contracts = JSON.parse(contracts)
        },
        pushContract (contract) {
            this.pageStack.push({
                extends: HitmanContractsApp,
                data () {
                    return {
                        contractId     : contract.id,
                        contractTarget : contract.target,
                        contractDetails: contract.details,
                        contractTelefon: contract.phone,
                        contractBounty : contract.bounty,
                    }
                },
            })
        },
    },
    mounted () {
        this.triggerServer('requestHitmanContracts')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}
</style>