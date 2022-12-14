<template>
    <v-ons-page>
        <div class="content">
            <template v-for="category in categories">
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

    methods: {
        trimName (name) {
            return name.substr(0, 29)
        },
    },
}
</script>