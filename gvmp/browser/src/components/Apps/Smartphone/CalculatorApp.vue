<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Rechner</div>
        </v-ons-toolbar>
        <div style="height:9.84375vh;padding: 0.46875vh 0.8vh 0.46875vh;background-color: #2d2d2d;">
            <h5 style="font-weight: 0; margin: 0; font-size: 1.875vh; text-align: right; padding-top: 1.265625vh; color: #808080; white-space: nowrap;">
                {{ calc }}</h5>
            <h1 style="font-weight: 0; margin: 0; font-size: 4.6875vh; text-align: right; ">{{ endcalcsum }}</h1>
        </div>
        <div style="height: 24.6875vh; width: 23.4375vh;background-color: #3f3f3f;">
            <div class="field fieldnew" @click="clear()">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">C</h2>
            </div>
            <div class="field fieldnew" @click="del()">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">del</h2>
            </div>
            <div class="field fieldnew" @click="calcbtn('%')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">%</h2>
            </div>
            <div class="field fieldcalc" @click="calcbtn('/')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">/</h2>
            </div>
            <div class="field fieldnum" @click="adnum(7)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    7</h2>
            </div>
            <div class="field fieldnum" @click="adnum(8)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    8</h2>
            </div>
            <div class="field fieldnum" @click="adnum(9)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    9</h2>
            </div>
            <div class="field fieldcalc" @click="calcbtn('*')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">X</h2>
            </div>
            <div class="field fieldnum" @click="adnum(4)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    4</h2>
            </div>
            <div class="field fieldnum" @click="adnum(5)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    5</h2>
            </div>
            <div class="field fieldnum" @click="adnum(6)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    6</h2>
            </div>
            <div class="field fieldcalc" @click="calcbtn('-')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 0.99vh 0">-</h2>
            </div>
            <div class="field fieldnum" @click="adnum(1)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    1</h2>
            </div>
            <div class="field fieldnum" @click="adnum(2)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    2</h2>
            </div>
            <div class="field fieldnum" @click="adnum(3)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    3</h2>
            </div>
            <div class="field fieldcalc" @click="calcbtn('+')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">+</h2>
            </div>
            <div class="field0 fieldnum" @click="adnum(0)">
                <h2 style="text-align: center; font-weight: bold; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">
                    0</h2>
            </div>
            <div class="field fieldnum" @click="calcbtn('.')">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">.</h2>
            </div>
            <div class="field fieldcalc" @click="getResult()">
                <h2 style="text-align: center; font-size: 1.875vh; line-height: 1.875vh; margin: 1.5vh 0">=</h2>
            </div>
        </div>
        <div style="height: 7.75vh; width: 23.4375vh; background-color: #3c3c3c;">
            <h6 style="margin: 0; text-align: center; padding-top: 3.28125vh; color: #808080; font-size: 1.6875vh;">
                Rechner v1.0</h6>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'CalculatorApp',

    extends: BaseApp,

    data () {
        return {
            status    : 0,
            sum       : 0,
            calcsum   : 0,
            endcalcsum: 0,
            calc      : '0',
        }
    },
    methods: {
        adnum (num) {
            if (Number.isInteger(this.endcalcsum))
                this.endcalcsum = ''
            this.endcalcsum += num
        },
        onKeyUp: function (event) {
            if (event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9') {
                this.adnum(parseInt(event.key))
            } else if (event.key == 'c') {
                this.clear()
            } else if (event.key == '/') {
                this.calcbtn('/')
            } else if (event.key == '*') {
                this.calcbtn('*')
            } else if (event.key == '-') {
                this.calcbtn('-')
            } else if (event.key == '+') {
                this.calcbtn('+')
            } else if (event.key == '.') {
                this.calcbtn('.')
            } else if (event.key == '%') {
                this.calcbtn('%')
            } else if (event.key == 'Enter') {
                this.getResult()
            }
        },
        getResult () {
            let log         = this.endcalcsum
            this.endcalcsum = eval(this.endcalcsum)
            this.calc       = log + `=${this.endcalcsum}`
        },
        clear () {
            this.calc       = 0
            this.endcalcsum = 0
        },
        calcbtn (calc) {
            this.endcalcsum += calc
        },
        del () {
            this.endcalcsum = this.endcalcsum.slice(0, -1)
        },
    },
    mounted () {
        window.addEventListener('keyup', this.onKeyUp)
    },
    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>

<style lang="scss">
.field {
    height: 4.6875vh;
    width: 5.625vh;
    background-color: #3c3c3c;
    margin-left: 0.1875vh;
    margin-top: 0.1875vh;
    float: left;
}

.field0 {
    height: 4.6875vh;
    width: 11.4vh;
    background-color: #3c3c3c;
    margin-left: 0.1875vh;
    margin-top: 0.1875vh;
    float: left;
}

.fieldnum {
    background-color: #2d2d2d;
}

.fieldnum:hover {
    background-color: #808080;
}

.fieldnew {
    background-color: #3c3c3c;
}

.fieldnew:hover {
    background-color: #ff4500;
}

.fieldcalc {
    background-color: #3c3c3c;
}

.fieldcalc:hover {
    background-color: #1e88e5;
}
</style>

<!-- components.HomeApp.apps = [{"id": "CalculatorApp", "name": "Rechner", "icon": "https://image.flaticon.com/icons/svg/265/265682.svg"}] -->