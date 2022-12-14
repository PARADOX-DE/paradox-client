<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Profil</div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-item v-for="(value, key) in profileData" :key="'p' + key">
                <div class="left">
                    <v-ons-icon
                        v-if="getIconByKey(key) !== null"
                        :icon="getIconByKey(key)"
                        class="list-item__icon"
                        style="color: #5e5e5e;"
                    ></v-ons-icon>
                    <span v-else class="list-item__icon">&nbsp;</span>
                </div>

                <div class="center">
                    <span class="list-item__title">{{ value }}</span>
                    <span class="list-item__subtitle">{{ key }}</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <v-ons-list-title>Eventpunkte</v-ons-list-title>

        <v-ons-list>
            <v-ons-list-item v-for="(value, key) in specialData" :key="'e' + key">
                <div class="left">
                    <v-ons-icon
                        v-if="getIconByKey(key) !== null"
                        :icon="getIconByKey(key)"
                        class="list-item__icon"
                        style="color: #5e5e5e;"
                    ></v-ons-icon>
                    <span v-else class="list-item__icon">&nbsp;</span>
                </div>

                <div class="center">
                    <span class="list-item__title">{{ value }}</span>
                    <span class="list-item__subtitle">{{ key }}</span>
                </div>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'ProfileApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            profileData: {},
            specialData: {},
        }
    },

    methods: {
        getIconByKey (key) {
            switch (key) {
                case 'Vorname':
                case 'Nachname':
                    return 'ion-md-contact'
                case 'Level':
                    return 'ion-md-trophy'
                case 'GwdNote':
                case 'ZivildienstNote':
                    return 'ion-md-clipboard'
                case 'ID':
                    return 'ion-md-attach'
                case 'Business':
                    return 'ion-md-business'
                case 'Haus':
                    return 'ion-md-home'
                case 'Handy':
                    return 'ion-md-call'
                case 'Beruf':
                    return 'ion-md-briefcase'
                case 'Skill':
                    return 'ion-md-school'
                case 'Team':
                    return 'ion-md-contacts'
                case 'Krankenversicherung':
                    return 'ion-md-pulse'
                case 'Training':
                    return 'ion-md-fitness'
                case 'Halloween':
                    return 'ion-logo-snapchat'
                case 'Jahrmarkt':
                    return 'ion-md-happy'
                default:
                    return null
            }
        },

        setProfileData (data) {
            this.profileData = JSON.parse(data)
        },

        responseSpecialProfilData (data) {
            this.specialData = JSON.parse(data)
        },
    },

    mounted () {
        this.triggerServer('requestSpecialProfilData')
    },
}
</script>