<template>
    <v-ons-page>
        <v-ons-tabbar position="bottom" :tabs="tabs" :visible="true" :index.sync="activeIndex">
            <template slot="pages">
                <component v-for="tab in tabs" :is="tab.page" :key="tab.page.label" :page-stack="pageStack"></component>
            </template>
        </v-ons-tabbar>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import HitmanContractListApp from './HitmanContractListApp'
import HitmanLocateApp from './HitmanLocateApp'

export default {
    name   : 'HitmanApp',
    extends: BaseApp,
    data () {
        return {
            activeIndex: 0,
            tabs       : [
                {
                    label: 'Auftraege',
                    page : HitmanContractListApp,
                },
                {
                    label: 'Werkzeuge',
                    page : HitmanLocateApp,
                },
            ],
        }
    },
    props: ['pageStack'],
}
</script>
<style lang="scss" scoped>
.list-item--material {
    padding: 5px 0 5px 16px;
}

.card {
    padding: 0;
}
</style>