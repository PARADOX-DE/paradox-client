<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Fahrzeug Suche</div>
            <div class="right">
                <ons-switch
                    v-on:change="toggleFunction"
                    :checked="toggle"
                    v-model="toggle"
                    style="margin: 16px;"
                ></ons-switch>
            </div>
        </v-ons-toolbar>

        <v-ons-row class="fRow">
            <v-ons-col>
                <v-ons-card class="mittig appBox">
                    <img :src="icon_path" alt="Onsen UI" style="width: 10%;">
                    <div class="title">
                        <h3>Fahrzeug Suche</h3>
                    </div>
                    <span class="description">{{
                            toggle ? 'Fahrzeug anhand des Spielers suchen' : 'Fahrzeug anhand der ID suchen'
                                              }}</span>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>

        <div v-if="toggle">
            <v-ons-row class="iRow">
                <v-ons-col>
                    <input class="input" placeholder="Fahrzeug Besitzer ID eingeben" v-model="owner_id">
                </v-ons-col>
            </v-ons-row>

            <v-ons-row class="iRow">
                <v-ons-col>
                    <v-ons-button class="pointer" modifier="large" @click="pushVehicleList(owner_id)">Fahrzeugliste
                                                                                                      laden
                    </v-ons-button>
                </v-ons-col>
            </v-ons-row>
        </div>

        <div v-else>
            <v-ons-row class="iRow">
                <v-ons-col>
                    <input type="text" class="input" placeholder="Fahrzeug ID eingeben" v-model="vehicle_id">
                </v-ons-col>
            </v-ons-row>

            <v-ons-row class="iRow">
                <v-ons-col>
                    <v-ons-button class="pointer" modifier="large" @click="pushVehicleData(vehicle_id)">Profil ansehen
                    </v-ons-button>
                </v-ons-col>
            </v-ons-row>
        </div>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import SupportVehicleList from './SupportVehicleList'
import SupportVehicleProfile from './SupportVehicleProfile'

export default {
    name   : 'SupportVehicleApp',
    extends: BaseApp,
    data () {
        return {
            icon_path : require('@/assets/vehicle_support.svg'),
            toggle    : false,
            vehicle_id: null,
            owner_id  : null,
        }
    },
    methods: {
        toggleFunction () {
            this.toggle = !this.toggle
        },
        pushVehicleList (id) {
            this.pageStack.push({ extends: SupportVehicleList, data () { return { owner: id }} })
        },
        pushVehicleData (id) {
            this.pageStack.push({ extends: SupportVehicleProfile, data () { return { vehicleId: id }} })
        },
    },
    props  : ['pageStack'],
}
</script>


<style lang="scss" scoped>
.fRow {
    padding: 0.5rem 0.5rem 0px 0.5rem;
}

.iRow {
    padding: 0.5rem 1rem 0px 1rem;
}

.appBox {
    border-bottom: 5px solid #da7200;
    box-shadow: none;
}

.mittig {
    text-align: center;
}

.pointerClass {
    cursor: pointer !important;
}

.description {
    font-size: 12px;
}

.input {
    width: 100%;
    //background: #fff;
    font-size: 12px;
    text-align: center;
    padding: 5px;
    height: 50px;
    border: 0px;
}

input[type="text"] {
    color: white !important;
}
</style>