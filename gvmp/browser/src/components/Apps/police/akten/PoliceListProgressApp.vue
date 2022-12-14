<template>
    <v-ons-page>
        <div>
            <section style="margin: 20px;">
                <h3>Verbrechensverlauf</h3>
                <v-ons-list>
                    <v-ons-list-item v-for="(r,i) in data.vv" :key="i">
                        {{ r.date }} - {{ r.text }}
                    </v-ons-list-item>
                </v-ons-list>
            </section>
        </div>
        <!--
        <div style="width:50%;float:left;">
            <section style="margin: 20px;">
                <h3>Aktenverlauf</h3>
                <v-ons-list>
                    <v-ons-list-item v-for="(r,i) in data.av" :key="i">
                        {{r.date}} - {{r.text}}
                    </v-ons-list-item>
                </v-ons-list>
            </section>
        </div>
        -->
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import Store from './Store'

export default {
    name   : 'PoliceListProgressApp',
    extends: BaseApp,
    data () {
        return {
            playerName: '',
            acts      : Store.acts,
            data      : {},

        }
    },
    methods: {
        responseCrimeProgress (response) {
            this.data = JSON.parse(response)
        },
    },
    mounted () {
        this.playerName = Store.person.name
        this.triggerServer('requestCrimeProgress', Store.person.name)
    },
}
</script>

<style>
</style>

<!--

{ vv: [{ date: "30.07.2020 - 15:00 Uhr", text: "Hier Text" }, { date: "30.07.2020 - 15:00 Uhr", text: "Hier Text" }], av: [{ date: "30.07.2020 - 15:00 Uhr", text: "Hier Text" }, { date: "30.07.2020 - 15:00 Uhr", text: "Hier Text" }]}
-->
