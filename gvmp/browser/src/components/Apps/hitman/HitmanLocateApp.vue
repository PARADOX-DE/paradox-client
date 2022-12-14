<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Peilsender Orten</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-list>
                <v-ons-list-item v-for="person in locatedPpl" :key="person.id" @click="pushTracker(person)">
                    <div class="left pull-space">
                        <v-ons-icon icon="md-pin" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        {{person.name}}
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
    import HitmanLocatePersonApp from "../hitman/HitmanLocatePersonApp"

    export default {
        name: "HitmanLocateApp",
        extends: BaseApp,
        data() {
            return {
                locatedPpl: []
            }
        },
        methods: {
            responseHitmanLocatedPpl(locatedPpl) {
                this.locatedPpl = JSON.parse(locatedPpl)
            },
            pushTracker(person) {
                this.pageStack.push({ extends: HitmanLocatePersonApp, data() { return { targetPerson: person } } })
            }
        },
        mounted() {
            this.triggerServer("requestHitmanLocatedPpl")
        },
        props: ['pageStack']
    }
</script>

<style lang="scss" scoped>
    .bold {
        font-weight:bold;
        margin-right: 0.2rem;
    }
    .pull-space {
        margin-left: -0.1rem;
        margin-right: 0.3rem;
    }
</style>