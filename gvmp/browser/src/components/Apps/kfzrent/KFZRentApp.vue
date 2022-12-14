<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">KFZ Vermietung Übersicht</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-header>Übersicht vermietete Fahrzeuge</v-ons-list-header>
            <input
                v-if="kfzrent.length != 0"
                style="width: 15vh; margin-left: 1.75vh; height: 4.6875vh;"
                placeholder="Vertrag suchen"
                v-model="filter"
                type="text"
            />
            <v-ons-list-item v-if="kfzrent.length == 0">
                <div class="center">Aktuell sind keine Fahrzeuge vermietet.</div>
            </v-ons-list-item>
            <v-ons-list-item v-else modifier="longdivider" v-for="kfz in search" :key="kfz.playerid">
                <div class="center">
               <span class="list-item__title">Vertragspartner: {{ kfz.playername }} | Telefon: {{ kfz.playerphone }}
                   <button
                       style="padding-top: 1vh; vertical-align: middle; color: #696969; margin-left: 0.5rem;"
                       class="fas fa-phone fa-1x"
                       v-on:click="call(kfz.playerphone)"
                   ><v-ons-icon icon="md-address-book" class="list-item__icon"></v-ons-icon></button>
               </span>
                    <span class="list-item__subtitle">Fahrzeug: {{ kfz.vehicleid }}</span>
                    <!--<span class="list-item__subtitle">Fahrzeug: {{kfz.vehiclename}} ({{kfz.vehicleid}})</span>-->
                    <span class="list-item__subtitle">{{ kfz.information }}</span>
                </div>
                <div class="right">
                    <v-ons-button
                        class="pointer"
                        style="background-color: #b22222;"
                        modifier="large"
                        v-on:click="cancelrent(kfz.playerid,kfz.vehicleid)"
                    >Vertrag Beenden
                    </v-ons-button>
                </div>
            </v-ons-list-item>
        </v-ons-list>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

var filter
export default {
    name   : 'KFZRentApp',
    extends: BaseApp,
    data () {
        return {
            kfzrent: [],
            filter : '',
        }
    },
    methods : {
        responsekfzrent (kfzlist) {
            this.kfzrent = JSON.parse(kfzlist)
        },
        cancelrent (playerid, vehicleid) {
            this.triggerServer('cancelkfzrent', playerid, vehicleid)
        },
        call (contactdata) {
            this.triggerServer('callUserPhone', contactdata)
        },
    },
    computed: {
        search: function () {
            filter = this.filter.trim().toLowerCase()
            if (filter === '') return this.kfzrent
            return this.kfzrent.filter(function (s) {
                var playerdata = s.playername + s.playerphone + s.vehiclename
                return playerdata.toLowerCase().indexOf(filter) >= 0
            })
        },
    },
    mounted () {
        this.triggerServer('requestkfzrent')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
.list-item__subtitle {
    font-size: 1.5vh;
    line-height: 1.5vh;
}

.pointer {
    cursor: pointer !important;
}
</style>

<!-- [{"id":1,"playername":"Wollow_Bergmann","playerphone":38840,"vehiclename":"Mercedes AMG C63 Limousine","vehicleid":958745,"information":"Zeitraum: 07.05.2019 (19.00 Uhr) - 09.05.2019 (18.59 Uhr)"},{"id":2,"playername":"Scorpius_Bergmann","playerphone":30731,"vehiclename":"Mule","vehicleid":12545,"information":"Zeitraum: 05.05.2019 (14.00 Uhr) - 10.05.2019 (13.59 Uhr)"}] -->