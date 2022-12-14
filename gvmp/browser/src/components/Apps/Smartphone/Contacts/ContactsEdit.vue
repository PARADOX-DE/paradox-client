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
                Kontakt editieren
            </v-ons-list-title>

            <v-ons-list>
                <v-ons-list-item modifier="nodivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-contact" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            class="text-input"
                            placeholder="Name eingeben..."
                            type="text"
                            v-model="editName"
                        />
                    </div>
                </v-ons-list-item>

                <v-ons-list-item modifier="nodivider">
                    <div class="left">
                        <v-ons-icon icon="ion-md-call" class="list-item__icon"></v-ons-icon>
                    </div>

                    <div class="center">
                        <input
                            class="text-input"
                            placeholder="Nummer eingeben..."
                            type="number"
                            v-model="editNumber"
                        />
                    </div>
                </v-ons-list-item>
            </v-ons-list>

            <section>
                <v-ons-button style="background-color: green" modifier="large" @click="updateContact">
                    Speichern
                </v-ons-button>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'ContactsEdit',

    extends: BaseApp,

    props  : ['pageStack'],

    data () {
        return {
            favorite      : false,
            editName      : '',
            editNumber    : null,
            originalNumber: null,
        }
    },

    methods: {
        updateContact () {
            let cleanName = this.sanitizeInput(this.editName).trim()

            if (this.originalNumber == null || this.editNumber == null || cleanName === '') return

            // Restore favorite status.
            if (this.favorite) {
                cleanName = '000FAV' + cleanName
            }

            this.trigger('updateContact', JSON.stringify({
                storeNumber: this.originalNumber,
                editNumber : this.editNumber,
                editName   : cleanName,
            }))

            this.pageStack.pop()
        }
    }
}
</script>
