<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Kontakte
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list-title>
                Kontakt hinzufügen
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item>
                    <div class="left">
                        <v-ons-icon icon="ion-md-contact" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            type="text"
                            class="text-input"
                            placeholder="Name eingeben..."
                            v-model="name"
                        />
                    </div>
                </v-ons-list-item>

                <v-ons-list-item>
                    <div class="left">
                        <v-ons-icon icon="ion-md-call" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            type="number"
                            class="text-input"
                            placeholder="Nummer eingeben..."
                            v-model="number"
                        />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button
                    modifier="large"
                    @click="addContact"
                >
                    Kontakt hinzufügen
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'ContactsAdd',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            name  : '',
            number: null,
        }
    },

    methods: {
        addContact () {
            let cleanName = this.sanitizeInput(this.name).trim()

            if (cleanName === '' || this.number == null) return

            this.trigger('addContact', JSON.stringify({ name: cleanName, number: this.number }))

            this.pageStack.pop()
        },
    },
}
</script>
