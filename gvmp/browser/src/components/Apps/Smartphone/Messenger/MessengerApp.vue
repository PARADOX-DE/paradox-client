<template>
    <v-ons-page>
        <component v-for="tab in tabs" :is="tab.page" :key="tab.label" :page-stack="pageStack"></component>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'
import MessengerListApp from './MessengerListApp'

export default {
    name: 'MessengerApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            activeIndex: 0,

            tabs: [
                {
                    label: 'Übersicht',
                    page : MessengerListApp,
                },
            ],
        }
    },
}
</script>
