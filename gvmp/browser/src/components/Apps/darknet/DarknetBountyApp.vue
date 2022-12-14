<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Neuer Auftrag</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-list modifier="inset">
                <v-ons-list-item>
                    <span class="bold left">Ziel: </span> <input
                    class="right"
                    type="text"
                    v-model="bountyTarget"
                    placeholder="Zielperson Name"
                >
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold left">Telefon: </span> <input
                    class="right"
                    type="text"
                    v-model="customerTelefon"
                    placeholder="Rueckrufnummer"
                >
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold left">Kopfgeld: </span> <input
                    type="number"
                    min="100000"
                    step="1"
                    class="right"
                    v-model="bountyPrice"
                    placeholder="min. 100.000$"
                >
                </v-ons-list-item>
                <v-ons-list-item>
                    <span class="bold">Details: </span><br />
                    <textarea
                        rows="8"
                        class="bountyDetails"
                        v-model="bountyDetails"
                        placeholder="Bitte Details zur Person angeben!"
                    ></textarea>
                </v-ons-list-item>
                <v-ons-list-item>
                    <v-ons-button modifier="large">Absenden</v-ons-button>
                </v-ons-list-item>
            </v-ons-list>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'DarknetBountyApp',

    extends: BaseApp,

    data () {
        return {
            bountyTarget: '',
            customerTelefon: null,
            bountyPrice: null,
            bountyDetails: '',
        }
    },
    methods: {
        sendContract () {
            this.triggerServer('sendBountyContract', this.bountyTarget, this.customerTelefon, this.bountyPrice, this.bountyDetails)
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

.bountyDetails {
    width: 100%;
    margin-top: 0.8rem;
    border-radius: 0.5rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.35);
    padding: 0.5rem;
    resize: none;
}
</style>