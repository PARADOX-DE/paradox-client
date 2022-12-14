<template>
    <v-ons-navigator :page-stack="pageStack">
        <component v-for="page in pageStack" :is="page" :key="page.id" :page-stack="pageStack"></component>
    </v-ons-navigator>
</template>

<script>
import BaseApp from '../BaseApp'
import LaptopDesktopApp from './LaptopDesktopApp'

export default {
    name: 'LaptopMainScreen',

    extends: BaseApp,

    data () {
        return {
            pageStack: [LaptopDesktopApp],
        }
    },
}
</script>