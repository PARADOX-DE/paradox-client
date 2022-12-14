<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Notruf Zentrale</div>
        </v-ons-toolbar>

        <v-ons-row class="fRow">
            <v-ons-col v-for="category in categories" :key="category.id" @click="push(category.id)">
                <v-ons-card class="mittig appBox pointerClass">
                    <img :src="category.icon_path" alt="Onsen UI" style="width: 20%;">
                    <div class="title">
                        <h3>{{ category.title }}</h3>
                    </div>
                    <span class="description">{{ category.description }}</span>
                </v-ons-card>
            </v-ons-col>
        </v-ons-row>

    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import ServiceListApp from './ServiceListApp'
import ServiceAcceptedApp from './ServiceAcceptedApp'
import ServiceOwnApp from './ServiceOwnApp'
import ServiceEvaluationApp from './ServiceEvaluationApp'

export default {
    name   : 'ServiceOverviewApp',
    extends: BaseApp,
    data () {
        return {
            categories: [
                { 'id'           : 'ServiceListApp',
                    'title'      : 'Offene Notrufe',
                    'description': 'Nicht bearbeitete Notrufe anzeigen',
                    'icon_path'  : require('@/assets/emergency_open.svg'),
                },
                { 'id'           : 'ServiceOwnApp',
                    'title'      : 'Angenommene Notrufe',
                    'description': 'Notrufe in bearbeitung anzeigen',
                    'icon_path'  : require('@/assets/emergency_open.svg'),
                },
                { 'id'           : 'ServiceAcceptedApp',
                    'title'      : 'Notrufe Übersicht',
                    'description': 'Notruf Übersicht anzeigen',
                    'icon_path'  : require('@/assets/emergency_open.svg'),
                },
                { 'id'           : 'ServiceEvaluationApp',
                    'title'      : 'Notrufe Auswertung',
                    'description': 'Notruf Auswertung anzeigen',
                    'icon_path'  : require('@/assets/emergency_open.svg'),
                },
            ],
        }
    },
    methods: {
        push (category) {
            switch (category) {
                case 'ServiceListApp':
                    this.pageStack.push({ extends: ServiceListApp })
                    break
                case 'ServiceAcceptedApp':
                    this.pageStack.push({ extends: ServiceAcceptedApp })
                    break
                case 'ServiceEvaluationApp':
                    this.pageStack.push({ extends: ServiceEvaluationApp })
                    break
                default:
                    this.pageStack.push({ extends: ServiceOwnApp })
            }
        },
    },
    props  : ['pageStack'],
}
</script>

<style lang="scss" scoped>
.fRow {
    padding: 0.5rem 0 0 0rem;
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
</style>