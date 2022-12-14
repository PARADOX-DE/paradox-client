<template>
    <div id="wrapper">
        <div id="meth-bg">
            <div class="top text-center">
                <div id="status-lampe" class="float-left">
                    <div class="led-box">
                        <div :class="[{'led-green': methData.status},{'led-red': !methData.status}]"></div>
                    </div>
                    <p class="share-tech-font">Status</p>
                </div>
                <h3 class="float-left ml-5 roboto-font">GVMP-Laboratory</h3>
                <div id="terminate" @click="terminate">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="middle">
                <div id="anzeigen">
                    <div class="anzeige" id="temperatur">
                        <span>Temperatur (<span class="roboto-font text-center percentage">{{
                                methData.temperature.current
                                                                                           }}</span> °C)</span>
                        <div class="progress-bar green glow">
                            <span class="green" :style="'width:' + getPercentageTemperature + '%'"></span>
                        </div>
                    </div>
                    <div class="anzeige" id="druck">
                        <span>Druck (<span class="roboto-font text-center percentage">{{
                                methData.pressure.current
                                                                                      }}</span> Bar)</span>
                        <div class="progress-bar green glow">
                            <span :style="'width:' + getPercentagePressure + '%'"></span>
                        </div>
                    </div>
                    <div class="anzeige" id="rotate">
                        <span>Rührgeschwindigkeit (<span class="roboto-font text-center percentage">{{
                                methData.stirring.current
                                                                                                    }}</span> u/min)</span>
                        <div class="progress-bar green glow">
                            <span :style="'width:' + getPercentageStirring + '%'"></span>
                        </div>
                    </div>
                    <div class="anzeige" id="menge">
                        <span>Menge (<span class="roboto-font text-center percentage">{{
                                methData.amount.current
                                                                                      }}</span> Stck.)</span>
                        <div class="progress-bar green glow">
                            <span :style="'width:' + getPercentageAmount + '%'"></span>
                        </div>
                    </div>
                </div>
                <div id="settings">
                    <span>Einstellungen</span>
                    <div class="border-bottom-1 mb-2">
                        <div class="inline text-center">
                            <span class="float-left">{{ methData.temperature.min }}</span>
                            <span>Temperatur</span>
                            <span class="float-right">{{ methData.temperature.max }}</span>
                        </div>
                        <input
                            class="regeler"
                            v-model="methData.temperature.current"
                            type="range"
                            :min="methData.temperature.min"
                            :max="methData.temperature.max"
                            :step="methData.temperature.steps"
                        />
                        <span class="range-input-value"></span>
                    </div>
                    <div class="border-bottom-1 mb-2">
                        <div class="inline text-center">
                            <span class="float-left">{{ methData.pressure.min }}</span>
                            <span>Druck</span>
                            <span class="float-right">{{ methData.pressure.max }}</span>
                        </div>
                        <input
                            class="regeler"
                            v-model="methData.pressure.current"
                            type="range"
                            :min="methData.pressure.min"
                            :max="methData.pressure.max"
                            :step="methData.pressure.steps"
                        />
                    </div>
                    <div class="border-bottom-1 mb-2">
                        <div class="inline text-center">
                            <span class="float-left">{{ methData.stirring.min }}</span>
                            <span>Rührgeschwindigkeit</span>
                            <span class="float-right">{{ methData.stirring.max }}</span>
                        </div>
                        <input
                            class="regeler"
                            v-model="methData.stirring.current"
                            type="range"
                            :min="methData.stirring.min"
                            :max="methData.stirring.max"
                            :step="methData.stirring.steps"
                        />
                    </div>
                    <div class="border-bottom-1 mb-2">
                        <div class="inline text-center">
                            <span class="float-left">{{ methData.amount.min }}</span>
                            <span>Anzahl</span>
                            <span class="float-right">{{ methData.amount.max }}</span>
                        </div>
                        <input
                            class="regeler"
                            v-model="methData.amount.current"
                            type="range"
                            :min="methData.amount.min"
                            :max="methData.amount.max"
                            :step="methData.amount.steps"
                        />
                    </div>
                </div>
            </div>
            <div class="bottom roboto-font text-center">
                <button class="gvmputton gvmputton-green gvmputton-md gvmputton-block" @click="startMethLabor">Start
                </button>
                <button class="gvmputton gvmputton-red gvmputton-md gvmputton-block" @click="stopMethLabor">Stop
                </button>
                <button class="gvmputton gvmputton-black gvmputton-md gvmputton-block" @click="saveMethLabor">
                    Speichern
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'MethLabor',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            methData: JSON.parse(this.data),
            /*
                {
                  temperature: {
                    "min": 100,
                    "max": 1500,
                    "current": 123,
                    "steps": 10
                  },
                  pressure: {
                    "min": 1,
                    "max": 10,
                    "current": 5
                  },
                  stirring: {
                    "min": 1,
                    "max": 300,
                    "current": 123
                  },
                  amount: {
                    "min": 5,
                    "max": 15,
                    "current": 7
                  },
                  status: true
                }
             */
        }
    },
    methods: {
        startMethLabor () {
            if (this.methData.status === false) {
                this.methData.status = true
                this.triggerServer('toggleMethLabor', this.methData.status)
            }
        },
        stopMethLabor () {
            if (this.methData.status === true) {
                this.methData.status = false
                this.triggerServer('toggleMethLabor', this.methData.status)
            }
        },
        saveMethLabor () {
            this.triggerServer('saveMethLabor', this.methData.temperature.current, this.methData.pressure.current, this.methData.stirring.current, this.methData.amount.current)
        },
        terminate () {
            this.dismiss()
        },
    },
    mounted () {

    },
    computed: {
        getPercentageTemperature () {
            return parseFloat(this.methData.temperature.current / this.methData.temperature.max * 100).toFixed(2)
        },
        getPercentagePressure () {
            return parseFloat(this.methData.pressure.current / this.methData.pressure.max * 100).toFixed(2)
        },
        getPercentageStirring () {
            return parseFloat(this.methData.stirring.current / this.methData.stirring.max * 100).toFixed(2)
        },
        getPercentageAmount () {
            return parseFloat(this.methData.amount.current / this.methData.amount.max * 100).toFixed(2)
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/methlabor";
@import "../../../stylesheets/gvmp_v2";
</style>