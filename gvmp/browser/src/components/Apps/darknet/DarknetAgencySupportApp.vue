<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Agency Anfordern</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-list modifier="inset" style="margin-top: 2rem;">
                <v-ons-list-item>
                    <span class="bold left">Telefon: </span> <input
                    type="text"
                    v-model="contractTelefon"
                    placeholder="Deine Telefonnummer"
                >
                </v-ons-list-item>
                <v-ons-list-item style="margin-top: 1rem;">
                    <v-ons-button modifier="large">Absenden</v-ons-button>
                </v-ons-list-item>
            </v-ons-list>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'DarknetAgencySupportApp',

    extends: BaseApp,

    data () {
        return {
            contractTelefon: null,
        }
    },
    methods: {
        requestSupport () {
            this.triggerServer('requestAgencySupport', this.contractTelefon)
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