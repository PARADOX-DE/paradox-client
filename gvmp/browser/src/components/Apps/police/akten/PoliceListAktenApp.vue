<template>
    <v-ons-page>
        <section style="margin: 20px;">
            <v-ons-list>
                <v-ons-list-item>
                    <div>
                        <table>
                            <tr>
                                <th style="width: 4rm">Status</th>
                                <th style="width: 10rm">Titel</th>
                                <th style="width: 10rm">Erstellt</th>
                                <th style="width: 4rm">Bearbeiten</th>
                            </tr>
                            <!--<v-ons-list-item v-for="act in acts.list" :key="act.title">-->
                            <tr v-for="act in acts.list" :key="act.title">
                                <td v-if="act.open" style="width: 4rm"><img
                                    :src="require('@/assets/openAct.svg')"
                                    alt="Offen"
                                    style="width: 2rem;"
                                ></td>
                                <td v-else style="width: 4rm"><img
                                    :src="require('@/assets/closedAct.svg')"
                                    alt="Geschlossen"
                                    style="width: 2rem;"
                                ></td>
                                <td style="width: 10rm">{{ act.title }}</td>
                                <td style="width: 10rm">{{ act.created.split('T', 1).toString() }}</td>
                                <td style="width: 4rm">&nbsp;<img
                                    :src="require('@/assets/editAct.svg')"
                                    alt="Edit"
                                    style="width: 2rem;"
                                    v-on:click="showPlayerDocument(act)"
                                ></td>
                            </tr>
                            <!--</v-ons-list-item>-->
                        </table>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </section>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import Store from './Store'

export default {
    name   : 'PoliceListAktenApp',
    extends: BaseApp,
    data () {
        return {
            playerName: '',
            acts      : Store.acts,
        }
    },
    methods: {
        responseAktenList (response) {

            Store.acts.list = JSON.parse(response)

            Store.acts.forEach(function (item, i) {
                item[i].created = item[i].created.split('T', 1).toString()
                item[i].closed  = item[i].created.split('T', 1).toString()
            })
        },
        showPlayerDocument (act) {
            act.created = act.created.split('T', 1).toString()
            act.closed  = act.closed.split('T', 1).toString()
            Store.act   = act
            console.log(act)
            console.log(Store.act)
        },
    },
    mounted () {
        this.acts       = Store.acts
        this.playerName = Store.person.name
    },
}
</script>

<style>

</style>
