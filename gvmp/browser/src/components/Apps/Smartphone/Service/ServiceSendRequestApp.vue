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
                Anfrage senden - {{ category.name }}
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item modifier="longdivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-text" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            type="text"
                            placeholder="Beschreibung eingeben..."
                            maxlength="100"
                            v-model="content"
                            class="text-input"
                        />
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="longdivider">
                    <div class="center">
                        Telefonnummer senden:
                    </div>

                    <div class="right">
                        <v-ons-switch :checked="phone" v-model="phone"></v-ons-switch>
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button
                    modifier="large"
                    @click="sendRequest"
                >
                    Anfrage senden
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'ServiceSendRequestApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            category: {},

            content: '',

            phone: false,
        }
    },

    methods: {
        sendRequest () {
            if (this.category.id == null || this.content.trim() === '') return

            this.triggerServer('addServiceRequest', this.category.service, this.content, this.phone)
        },
    },

}
</script>
