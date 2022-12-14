<template>

    <!--haus kaufen, einmieten, ausmieten, -->
    <div class="jumbotron right card">
        <div class="card info">
            <h4 class="color-text blue">Hausnummer {{ house.id }}</h4>
            <div>
                <p>Lager: {{ Number(house.stock).toLocaleString('de') }}kg
                    <span class="margin">Mieter: 4/5</span>
                    <span v-if="house.garage == '1'" class="margin">Garage vorhanden</span>
                    <span v-if="house.garage == '0'" class="margin">keine Garage</span>
                    <span v-if="house.garage == '2'" class="margin">Garage ausbaubar</span>
                    <span v-if="house.cellar == '1'" class="margin">Keller vorhanden</span>
                    <span v-if="house.cellar == '0'" class="margin">Keller ausbaubar</span>
                </p>
            </div>
        </div>
        <div v-if="house.state == 'buyable'">
            <div v-on:click="handle('buy')" class="card color-background blue" style="color: white; text-align: center">
                <h4>Haus kaufen</h4>
                <h6>Preis: {{ Number(house.price).toLocaleString('de') }}$</h6>
                <h6>Grundstückteuern: {{ Number(house.tax).toLocaleString('de') }}$</h6>
            </div>
        </div>
        <div v-else-if="house.state == 'owner' || house.state == 'mieter'">
            <div class="house-items">
                <div
                    v-on:click="handle('enterHouse')"
                    class="card color-background "
                    :class="{'green' : (house.locked==0), 'red' : (house.locked==1)}"
                >
                    <img class="responsive-img" src="../../assets/door-open.svg">
                    <h5>Haus betreten</h5>
                    <p v-if="house.locked == 0" style="font-size: 80%">aufgeschlossen</p>
                    <p v-if="house.locked == 1" style="font-size: 80%">abgeschlossen</p>
                </div>
                <div
                    v-on:click="handle('enterCellar')"
                    class="card color-background "
                    :class="{'blue' : (house.cellar==1), 'orange' : (house.cellar==0)}"
                >
                    <img class="responsive-img" src="../../assets/steps.svg">
                    <h5 v-if="house.cellar == 1">Keller betreten</h5>
                    <h5 v-if="house.cellar == 0">Keller ausbauen</h5>
                    <p v-if="house.cellar == 0" style="font-size: 80%">{{
                            Number(house.extension_money).toLocaleString('de')
                                                                       }}$, {{ house.extension_wood }} Holz, {{
                            house.extension_cement
                                                                       }} Zement</p>
                </div>
                <div v-on:click="handle('garage')" class="card color-background blue">
                    <div align="center"><img class="responsive-img" src="../../assets/warehouse.svg"></div>
                    <h5>Garage</h5>
                </div>
                <div v-if="house.state == 'mieter'" class="card" style="box-shadow: none"></div>
                <div
                    v-on:click="handle('quitContract')"
                    v-if="house.state == 'mieter'"
                    class="card color-background blue"
                >
                    <div align="center"><img class="responsive-img" src="../../assets/people-carry.svg"></div>
                    <h5 style="text-align: center; color: white">Mietvertrag kündigen</h5>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-on:click="handle('enterContract')" class="card color-background blue">
                <div align="center"><img class="responsive-img" src="../../assets/people-carry.svg"></div>
                <h5 style="text-align: center; color: white">Mietvertrag unterschreiben</h5>
                <h6 style="text-align: center; color: white;">Mietpreis: {{
                        Number(house.rent).toLocaleString('de')
                                                              }}$</h6>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'HouseMenue',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            house: JSON.parse(this.data),
        }
    },
    methods: {
        handle (action) {
            if (action == 'buy') {
                this.triggerServer('buyHouse')
            } else if (action == 'enter') {
                this.triggerServer('enterHouse')
            } else if (action == 'enterCellar') {
                if (this.house.cellar == 1) {
                    this.triggerServer('enterCellar')
                } else if (this.house.cellar == 0) {
                    this.triggerServer('buildCellar')
                }
                //}else if(action == 'garage'){

            } else if (action == 'quitContract') {
                this.triggerServer('quitContract')
            } else if (action == 'enterContract') {
                this.triggerServer('enterContract')
            }
            this.dismiss()
        },
    },
}
</script>

<style scoped>
.margin {
    margin-left: 40px;
}

.card > .info {
    box-shadow: none;
    padding:    0;
}

.house-items {
    display:               grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: repeat( auto-fit, minmax(200px, 1fr));
}

.house-items > .card {
    color:      white;
    text-align: center;
}

div.card {
    padding: 25px;
}

img {
    width:      3vw;
    grid-area:  image;
    align-self: center;
}

h5 {
    font-size:    120%;
    padding-left: 5px;
}
</style>