<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">{{ targetPerson.name }}</div>
        </v-ons-toolbar>
        <ons-list>
            <v-ons-list>
                <v-ons-list-item
                    v-for="tracker in targetPerson.data"
                    :key="tracker.id"
                    @click="locateTracker(tracker.id)"
                >
                    <div class="left pull-space">
                        <v-ons-icon icon="md-pin" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        <span
                            v-if="tracker.type == 'vehicle'"
                            style="margin-right: 0.18rem;"
                        >Fahrzeug: {{ tracker.id }}</span>
                        <span v-if="tracker.type == 'person'">{{ targetPerson.name }}</span>
                    </div>
                </v-ons-list-item>
            </v-ons-list>
        </ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'HitmanLocatePersonApp',
    extends: BaseApp,
    data () {
        return {
            targetPerson: [],
        }
    },
    methods: {
        locateTracker (trackerId) {
            this.triggerServer('locateHitmanTracker', trackerId)
            this.pageStack.pop()
        },
    },
    props  : ['pageStack'],
}
</script>

<style lang="scss" scoped>
.bold {
    font-weight: bold;
    margin-right: 0.2rem;
}

.pull-space {
    margin-left: -0.1rem;
    margin-right: 0.3rem;
}
</style>