<template>
    <v-ons-navigator :page-stack="pageStack">
        <component v-for="page in pageStack" :is="page" :key="page.id" :page-stack="pageStack"></component>
    </v-ons-navigator>
</template>

<script>
import BaseApp from '../BaseApp'
import IpadDesktopApp from './IpadDesktopApp'

export default {
    name: 'IpadMainScreen',

    extends: BaseApp,

    data () {
        return {
            pageStack: [IpadDesktopApp],
        }
    },
}
</script>