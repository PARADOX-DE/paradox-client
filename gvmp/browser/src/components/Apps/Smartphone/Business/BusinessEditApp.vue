<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">Business</div>
        </v-ons-toolbar>

        <div class="content">
            <template v-if="parseInt(businessInfo.members.ManagePermission) === 1 || parseInt(businessInfo.members.ManagePermission) === 2">
                <v-ons-list-title>
                    Message Of The Day
                </v-ons-list-title>

                <v-ons-list>
                    <v-ons-list-item>
                        <div class="left">
                            <v-ons-icon icon="ion-md-text" class="list-item__icon"></v-ons-icon>
                        </div>

                        <div class="center">
                            <input
                                type="text"
                                class="text-input"
                                v-model="newMessageOfTheDay"
                                placeholder="Text eingeben..."
                            />
                        </div>
                    </v-ons-list-item>
                </v-ons-list>

                <section>
                    <v-ons-button style="background-color: green" modifier="large" @click="saveMessageOfTheDay">
                        Speichern
                    </v-ons-button>
                </section>
            </template>

            <v-ons-list-title>
                Business verlassen
            </v-ons-list-title>

            <section>
                <v-ons-button
                style="background-color: red" 
                modifier="large" 
                @click="isVisible = true"
                >
                    Verlassen
                </v-ons-button>

                <v-ons-alert-dialog modifier="rowfooter"
                    :visible.sync="isVisible"
                >
                    <span slot="title">Bestätigen</span>

                    Willst du wirklich das Business verlassen?

                    <template slot="footer">
                        <v-ons-alert-dialog-button @click="isVisible = false">Abbrechen</v-ons-alert-dialog-button>
                        <v-ons-alert-dialog-button @click="leaveBusiness">Ja</v-ons-alert-dialog-button>
                    </template>
                </v-ons-alert-dialog>
            </section>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'BusinessEditApp',

    extends: BaseApp,

    props: ['pageStack', 'businessInfo'],

    data () {
        return {
            newMessageOfTheDay: '',
            isVisible: false
        }
    },

    mounted () {
        console.log(this.businessInfo)
    },

    methods: {
        saveMessageOfTheDay () {
            if (this.newMessageOfTheDay === '') {
                this.$ons.notification.toast('Bitte einen Text eingeben!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.triggerServer('saveBusinessMOTD', this.newMessageOfTheDay)

            this.pageStack.splice(1, this.pageStack.length - 1)
        },

        leaveBusiness () {
            this.isVisible = false
            this.triggerServer('leaveBusiness')

            this.pageStack.splice(1, this.pageStack.length - 1)
        },
    },
}
</script>
