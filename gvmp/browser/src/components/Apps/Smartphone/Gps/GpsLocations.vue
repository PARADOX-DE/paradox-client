<template>
    <v-ons-page>
        <div class="content">
            <v-ons-search-input
                placeholder="Suchen..."
                v-model="filter"
                style="width: 100%;"
                v-if="false"
            />

            <template v-for="category in filteredGpsPoints">
                <v-ons-list-title :key="category.name">
                    {{ category.name }}
                </v-ons-list-title>

                <v-ons-list :key="category.name">
                    <v-ons-list-item
                        v-for="gpsPoint in category.locations"
                        :key="gpsPoint.name"
                        tappable
                        @click="$emit('selected', gpsPoint)"
                    >
                        <div class="left">
                            <v-ons-icon
                                style="color: #5e5e5e;"
                                icon="ion-ios-navigate"
                                class="list-item__icon"
                            ></v-ons-icon>
                        </div>

                        <div class="center">
                            {{ trimName(gpsPoint.name) }}
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </template>

            <v-ons-list v-if="categories.length === 0">
                <v-ons-list-item>
                    {{ result }}
                </v-ons-list-item>
            </v-ons-list>
        </div>
    </v-ons-page>
</template>

<script>
export default {
    props: ['pageStack', 'categories', 'result'],

    data () {
        return {
            filter: '',
        }
    },

    computed: {
        filteredGpsPoints () {
            let filter = this.filter.trim().toLowerCase(),
                result = []
            if (filter === '') return this.categories

            this.categories.forEach(c => {
                let filteredLocations = c.locations.filter(
                    s => s.name.toLowerCase().includes(filter),
                )

                if (filteredLocations.length > 0) {
                    let category       = Object.assign({}, c)
                    category.locations = filteredLocations

                    result.push(category)
                }
            })

            return result
        },
    },

    methods: {
        trimName (name) {
            return name.substr(0, 29)
        },
    },
}
</script>

<style scoped>
>>> .search-input--material {
    padding-left: 50px;
}
</style>