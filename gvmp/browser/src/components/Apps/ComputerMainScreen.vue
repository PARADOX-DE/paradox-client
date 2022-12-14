<template>
    <v-ons-navigator :page-stack="pageStack">
        <component v-for="page in pageStack" :is="page" :key="page.id" :page-stack="pageStack"></component>
    </v-ons-navigator>
</template>

<script>
import BaseApp from '../BaseApp'
import DesktopApp from './DesktopApp'

export default {
    name: 'ComputerMainScreen',

    extends: BaseApp,

    data () {
        return {
            pageStack: [DesktopApp],
        }
    },
}
</script>