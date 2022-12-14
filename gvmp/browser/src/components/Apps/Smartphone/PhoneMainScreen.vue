<template>
    <v-ons-navigator :page-stack="pageStack">
        <component v-for="page in pageStack" :is="page" :key="page.id" :page-stack="pageStack"></component>
    </v-ons-navigator>
</template>

<script>
import BaseApp from '../../BaseApp'
import HomeApp from './HomeApp'

export default {
    name: 'PhoneMainScreen',

    extends: BaseApp,

    data () {
        return {
            pageStack: [HomeApp],
        }
    },
    methods: {
        getHomeScreen () {
            this.pageStack = [HomeApp]
        },
    },
}
</script>