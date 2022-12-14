<template>
    <v-ons-page>
        <component v-for="tab in tabs" :is="tab.page" :key="tab.label" :page-stack="pageStack"></component>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import NewsListApp from './NewsListApp'

export default {
    name   : 'NewsApp',
    extends: BaseApp,
    data () {
        return {
            activeIndex: 0,
            tabs       : [
                {
                    label: 'Berichte',
                    page : NewsListApp,
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