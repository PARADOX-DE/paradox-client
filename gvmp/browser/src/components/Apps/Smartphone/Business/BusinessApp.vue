<template>
    <v-ons-page>
        <v-ons-tabbar
            position="bottom"
            :tabs="tabs"
            :visible="true"
            :index.sync="activeIndex"
        >
            <template slot="pages">
                <component
                    v-for="tab in tabs"
                    :is="tab.page"
                    :key="tab.id"
                    :page-stack="pageStack"
                    :businessInfo="businessInfo"
                ></component>
            </template>

            <v-ons-tab
                v-for="(tab, i) in tabs"
                :icon="tabs[i].icon"
                :key="tabs[i].id"
            ></v-ons-tab>
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import BusinessListApp from './BusinessListApp'
import BusinessEditApp from './BusinessEditApp'

export default {
    name: 'BusinessApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            businessInfo: {
                members        : {
                    ManagePermission  : 0,
                    BusinessMemberList: [],
                },
                messageOfTheDay: '',
            },

            activeIndex: 0,

            tabs: [
                {
                    id  : 'Mitglieder',
                    icon: 'ion-md-people',
                    page: BusinessListApp,
                },

                {
                    id  : 'Einstellungen',
                    icon: 'ion-md-settings',
                    page: BusinessEditApp,
                },
            ],
        }
    },

    methods: {
        responseBusinessMembers (businessMembersString) {
            this.businessInfo.members = JSON.parse(businessMembersString)
        },

        responseBusinessMOTD (businessMessageOfTheDay) {
            this.businessInfo.messageOfTheDay = businessMessageOfTheDay
        },
    },

    mounted () {
        this.triggerServer('requestBusinessMembers')
        this.triggerServer('requestBusinessMOTD')
    },
}
</script>