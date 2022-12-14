<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Life Invader
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list v-if="AdvertisingData.length === 0">
                <v-ons-list-item>
                    <div class="center">Keine Werbung vorhanden</div>
                </v-ons-list-item>
            </v-ons-list>

            <v-ons-card
                v-else
                v-for="(ads, idx) in AdvertisingData"
                :key="ads.id"
                style="padding: 1px"
            >
                <div class="content">
                    <v-ons-list-title v-if="false">
                        {{ ads.title }}
                    </v-ons-list-title>

                    <v-ons-list>
                        <v-ons-list-item v-if="ads.content.indexOf('$$$$') >= 0" modifier="longdivider">
                            {{ advert('MSG', ads.content) }}
                        </v-ons-list-item>

                        <v-ons-list-item v-else modifier="longdivider">
                            {{ ads.content }}
                        </v-ons-list-item>

                        <v-ons-list-item v-if="ads.content.indexOf('$$$$') >= 0 && advert('NUMBER', ads.content) && advert('NUMBER', ads.content) !== ''">
                            <div class="center">
                                <div class="list-item__title">
                                    {{ advert('NUMBER', ads.content) }}
                                </div>

                                <div class="list-item__subtitle">
                                    {{ ads.title }}
                                </div>
                            </div>

                            <div class="right">
                                <v-ons-icon
                                    icon="ion-md-call"
                                    class="list-item__icon"
                                    style="font-size: 1.6vh !important; color: lawngreen; margin-right: 0.5625vh !important"
                                    @click="call(ads.content)"
                                ></v-ons-icon>

                                <v-ons-icon
                                    icon="ion-md-chatboxes"
                                    class="list-item__icon"
                                    style="font-size: 1.6vh !important; color: deepskyblue"
                                    @click="sendSms(ads.content)"
                                ></v-ons-icon>
                            </div>
                        </v-ons-list-item>
                    </v-ons-list>
                </div>
            </v-ons-card>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import MessageOverviewApp from './Messenger/MessageOverviewApp'

export default {
    name: 'LifeInvaderApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            AdvertisingData: [],
        }
    },

    methods: {
        updateLifeInvaderAds (ads) {
            this.AdvertisingData = JSON.parse(ads)
        },

        advert (modus, advertData) {
            let advert = advertData.split('$$$$')

            if (modus === 'MSG') {
                return advert[0]
            } else if (modus === 'NUMBER') {
                return advert[1]
            }
        },

        call (advertData) {
            let advert = advertData.split('$$$$')

            this.triggerServer('callUserPhone', advert[1])
        },

        sendSms (advertData) {
            let advert = advertData.split('$$$$')

            this.pageStack.push({
                extends: MessageOverviewApp,
                data () { return { msgPartnerNumber: advert[1] } },
            })
        },
    },

    mounted () {
        this.triggerServer('requestAd')
    },
}
</script>
