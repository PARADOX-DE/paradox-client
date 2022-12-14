<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Support Zentrale</div>
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
import BaseApp from '../../../BaseApp'
import SupportOpenTickets from './SupportOpenTickets'
import SupportAcceptedTickets from './SupportAcceptedTickets'

export default {
    name   : 'SupportOverviewApp',
    extends: BaseApp,
    data () {
        return {
            categories: [
                { 'id'           : 'SupportOpenTickets',
                    'title'      : 'Offene Tickets',
                    'description': 'Nicht bearbeitete Tickets anzeigen',
                    'icon_path'  : require('@/assets/support_tickets.svg'),
                },
                { 'id'           : 'SupportAcceptedTickets',
                    'title'      : 'Tickets in Bearbeitung',
                    'description': 'Tickets in Bearbeitung anzeigen',
                    'icon_path'  : require('@/assets/support_tickets.svg'),
                },
            ],
        }
    },
    methods: {
        push (category) {
            switch (category) {
                case 'SupportOpenTickets':
                    this.pageStack.push({ extends: SupportOpenTickets })
                    break
                default:
                    this.pageStack.push({ extends: SupportAcceptedTickets })
            }
        },
    },
    props  : ['pageStack'],
}
</script>

<style lang="scss" scoped>
.fRow {
    padding: 0.5rem 0.5rem 0px 0.5rem;
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