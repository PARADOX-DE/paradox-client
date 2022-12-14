<template id="Nachtclub">
    <div style="width:100%">
        <div class="shadow_businessdetail">
            <v-ons-row class="fRow_businessdetail">
                <v-ons-col><h3>Nachtclub: {{ data.name }}</h3></v-ons-col>
            </v-ons-row>
            <v-ons-row class="fRow_businessdetail">
                <v-ons-col>
                    <table id="customers">
                        <tr>
                            <th>Item</th>
                            <th>Preis</th>
                            <th>Lagerbestand</th>
                        </tr>
                        <tr v-for="(r,i) in data.items" :key="i">
                            <td>{{ r.name }}</td>
                            <td>{{ r.price }}$</td>
                            <td>{{ r.amount }}</td>
                        </tr>
                    </table>
                </v-ons-col>

            </v-ons-row>
        </div>
    </div>
</template>

<script>
export default {
    template: '#Nachtclub',

    data () {
        return {}
    },

    methods: {},

    mounted () {
    },

    props: ['data', 'secdata'],
}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.fRow {
    padding: 1rem 0 0 1rem;
}

.mittig {
    text-align: center;
}

.pointerClass {
    cursor: pointer;
}

#customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

#customers td,
#customers th {
    border: 1px solid #3c3c3c;
    padding: 8px;
}

#customers tr:nth-child(even) {
    background-color: #2b2b2b;
}

#customers th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #3c3c3c;
    color: white;
}
</style>