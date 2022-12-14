<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Service
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list-title>
                Kategorien
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item
                    modifier="longdivider chevron"
                    tappable
                    v-for="category in categories"
                    :key="category.id"
                    @click="goToSendRequestApp(category)"
                >
                    <div class="center">
                        {{ category.name }}
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button
                    modifier="large"
                    @click="cancelRequests"
                    style="background-color: red"
                >
                    Anfrage abbrechen
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import ServiceSendRequestApp from './ServiceSendRequestApp'

export default {
    name: 'ServiceRequestApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            categories: [
                {
                    'id'     : 1,
                    'name'   : 'Polizei',
                    'service': 'police',
                },
                {
                    'id'     : 2,
                    'name'   : 'Rettungsdienst',
                    'service': 'medic',
                },
                {
                    'id'     : 3,
                    'name'   : 'Fahrschule',
                    'service': 'fahrlehrer',
                },
                {
                    'id'     : 4,
                    'name'   : 'DPOS',
                    'service': 'tow',
                },
                {
                    'id'     : 5,
                    'name'   : 'News',
                    'service': 'news',
                },
                {
                    'id'     : 6,
                    'name'   : 'Los Santos Customs',
                    'service': 'lsc',
                },
                {
                    'id'     : 7,
                    'name'   : 'Regierung',
                    'service': 'government',
                },
                {
                    'id'     : 8,
                    'name'   : 'US Army',
                    'service': 'army',
                },
                {
                    'id'     : 9,
                    'name'   : 'Auktion',
                    'service': 'auction',
                },
            ],
        }
    },
    methods: {
        goToSendRequestApp (selectedCategory) {
            this.pageStack.push({
                extends: ServiceSendRequestApp,
                data () {
                    return {
                        category: selectedCategory,
                    }
                },
            })
        },

        cancelRequests () {
            this.triggerServer('cancelServiceRequest')
        },
    },
}
</script>
