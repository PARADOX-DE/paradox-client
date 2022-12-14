<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-back-button></v-ons-back-button>
        </v-ons-toolbar-button>
      </div>
      <div class="center">Personensuche</div>
    </v-ons-toolbar>
    <section style="margin: 20px;">
      <v-ons-search-input style="width: 100%; margin-bottom: 1rem" maxlength="64" placeholder="Person suchen" v-model="query" v-on:keyup.enter="getPlayerResult()"></v-ons-search-input>
      <div v-if="results !== ''">
        <v-ons-list>
          <v-ons-list-header>Ergebnisse der Suche</v-ons-list-header>
          <v-ons-list-item modifier="longdivider" tappable v-for="result in results" :key="result" v-on:click="push(result)">
            <div class="center">{{result}}</div>
            <div class="right">
              <v-ons-icon icon="md-chevron-right" class="list-item__icon"></v-ons-icon>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </section>
  </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
  import Store from "./Store"
  import PoliceOverviewApp from "./PoliceOverviewApp"

  export default {
    name: "PoliceAktenSearchApp",
      extends: BaseApp,
    data() {
      return {
        results: [],
        query: '',
      }
    },
    methods: {
      getPlayerResult() {
        this.triggerServer("requestPlayerResults", this.query)
      },
      responsePlayerResults(result) {
        this.results = JSON.parse(result)
        console.log(result)
      },
      push(playerName) {
        Store.person.name = playerName
        this.pageStack.push({ extends: PoliceOverviewApp, data(){ return { playerName }}})
      }
    },
    props: ['pageStack']
  }
</script>