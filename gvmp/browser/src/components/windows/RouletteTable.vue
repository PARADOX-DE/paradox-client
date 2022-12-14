<template>
    <div id="wrapper">

        <div class="roulett_box_out">
            <div
                class="number_alone"
                style="border-bottom-right-radius: 50px;border-top-right-radius: 50px;"
                v-on:click="placeBet(0)"
            >
                <div class="zero">0</div>
            </div>
            <div class="roulett_box">

                <div class="flex-grid">

                    <div class="number_box" id="3" v-on:click="placeBet(3)">
                        <div class="col black">3</div>
                    </div>
                    <div class="number_box" id="6" v-on:click="placeBet(6)">
                        <div class="col">6</div>
                    </div>
                    <div class="number_box" id="9" v-on:click="placeBet(9)">
                        <div class="col black">9</div>
                    </div>
                    <div class="number_box" id="12" v-on:click="placeBet(12)">
                        <div class="col">12</div>
                    </div>
                    <div class="number_box" id="15" v-on:click="placeBet(15)">
                        <div class="col black">15</div>
                    </div>
                    <div class="number_box" id="18" v-on:click="placeBet(18)">
                        <div class="col">18</div>
                    </div>
                    <div class="number_box" id="21" v-on:click="placeBet(21)">
                        <div class="col black">21</div>
                    </div>
                    <div class="number_box" id="24" v-on:click="placeBet(24)">
                        <div class="col">24</div>
                    </div>
                    <div class="number_box" id="27" v-on:click="placeBet(27)">
                        <div class="col black">27</div>
                    </div>
                    <div class="number_box" id="30" v-on:click="placeBet(30)">
                        <div class="col">30</div>
                    </div>
                    <div class="number_box" id="33" v-on:click="placeBet(33)">
                        <div class="col black">33</div>
                    </div>
                    <div class="number_box" id="36" v-on:click="placeBet(36)">
                        <div class="col">36</div>
                    </div>
                    <div class="number_box" style="border-top-right-radius: 10px;" v-on:click="placeBet(336)">
                        <div class="colTEXT">2 on 1</div>
                    </div>
                </div>
                <div class="flex-grid">
                    <div class="number_box" id="2" v-on:click="placeBet(2)">
                        <div class="col">2</div>
                    </div>
                    <div class="number_box" id="5" v-on:click="placeBet(5)">
                        <div class="col black">5</div>
                    </div>
                    <div class="number_box" id="8" v-on:click="placeBet(8)">
                        <div class="col">8</div>
                    </div>
                    <div class="number_box" id="11" v-on:click="placeBet(11)">
                        <div class="col black ">11</div>
                    </div>
                    <div class="number_box" id="14" v-on:click="placeBet(14)">
                        <div class="col">14</div>
                    </div>
                    <div class="number_box" id="17" v-on:click="placeBet(17)">
                        <div class="col black">17</div>
                    </div>
                    <div class="number_box" id="20" v-on:click="placeBet(20)">
                        <div class="col ">20</div>
                    </div>
                    <div class="number_box" id="23" v-on:click="placeBet(23)">
                        <div class="col black">23</div>
                    </div>
                    <div class="number_box" id="26" v-on:click="placeBet(26)">
                        <div class="col">26</div>
                    </div>
                    <div class="number_box" id="29" v-on:click="placeBet(29)">
                        <div class="col black">29</div>
                    </div>
                    <div class="number_box" id="32" v-on:click="placeBet(32)">
                        <div class="col">32</div>
                    </div>
                    <div class="number_box" id="35" v-on:click="placeBet(35)">
                        <div class="col black">35</div>
                    </div>
                    <div class="number_box" v-on:click="placeBet(235)">
                        <div class="colTEXT">2 on 1</div>
                    </div>
                </div>
                <div class="flex-grid">
                    <div class="number_box" id="1" v-on:click="placeBet(1)">
                        <div class="col black">1</div>
                    </div>
                    <div class="number_box" id="4" v-on:click="placeBet(4)">
                        <div class="col">4</div>
                    </div>
                    <div class="number_box" id="7" v-on:click="placeBet(7)">
                        <div class="col black">7</div>
                    </div>
                    <div class="number_box" id="10" v-on:click="placeBet(10)">
                        <div class="col">10</div>
                    </div>
                    <div class="number_box" id="13" v-on:click="placeBet(13)">
                        <div class="col black">13</div>
                    </div>
                    <div class="number_box" id="16" v-on:click="placeBet(16)">
                        <div class="col">16</div>
                    </div>
                    <div class="number_box" id="19" v-on:click="placeBet(19)">
                        <div class="col black">19</div>
                    </div>
                    <div class="number_box" id="22" v-on:click="placeBet(22)">
                        <div class="col">22</div>
                    </div>
                    <div class="number_box" id="25" v-on:click="placeBet(25)">
                        <div class="col black">25</div>
                    </div>
                    <div class="number_box" id="28" v-on:click="placeBet(28)">
                        <div class="col">28</div>
                    </div>
                    <div class="number_box" id="31" v-on:click="placeBet(31)">
                        <div class="col black">31</div>
                    </div>
                    <div class="number_box" id="34" v-on:click="placeBet(34)">
                        <div class="col">34</div>
                    </div>
                    <div class="number_box " style="border-bottom-right-radius: 10px; " v-on:click="placeBet(134)">
                        <div class="colTEXT ">2 on 1</div>
                    </div>
                </div>


                <div class="under_box">
                    <div class="flex-grid2">
                        <div class="number_box2" v-on:click="placeBet(112)">
                            <div class="col2">1 ST 12</div>
                        </div>
                        <div class="number_box2" v-on:click="placeBet(1324)">
                            <div class="col2">2 ND 12</div>
                        </div>
                        <div class="number_box2" v-on:click="placeBet(2536)">
                            <div class="col2">3 RD 12</div>
                        </div>
                    </div>

                    <div class="flex-grid2">

                        <div class="number_box" style="border-bottom-left-radius: 10px;" v-on:click="placeBet(118)">
                            <div class="col2 fixwidth">1 TO 18</div>
                        </div>
                        <div class="number_box" v-on:click="placeBet(777)">
                            <div class="col2  fixwidth">EVEN</div>
                        </div> <!-- 777 -->
                        <div class="number_box red" v-on:click="placeBet(666)">
                            <div class="col2 fixwidth">RED</div>
                        </div> <!-- 666 -->
                        <div class="number_box black" v-on:click="placeBet(999)">
                            <div class="col2  fixwidth">BLACK</div>
                        </div> <!-- 999 -->
                        <div class="number_box" v-on:click="placeBet(888)">
                            <div class="col2 fixwidth">ODD</div>
                        </div> <!-- 888 -->
                        <div class="number_box " style="border-bottom-right-radius: 10px;" v-on:click="placeBet(1936)">
                            <div class="col2  fixwidth">19 TO 36</div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <img
                src="../../assets/casino/roulette/5k.png"
                style="width: 3em; margin-left: 19em;"
                v-on:click="selectedAmount = 5000"
            >
            <img
                src="../../assets/casino/roulette/10k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 10000"
            >
            <img
                src="../../assets/casino/roulette/25k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 25000"
            >
            <img
                src="../../assets/casino/roulette/50k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 50000"
            >
            <img
                src="../../assets/casino/roulette/100k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 100000"
            >
            <img
                src="../../assets/casino/roulette/200k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 200000"
            >
            <img
                src="../../assets/casino/roulette/500k.png"
                style="width: 3em; margin-left: 1em;"
                v-on:click="selectedAmount = 500000"
            >
        </div>
        <div style="position: absolute; z-index: 1; margin: -27.8em 10em 10em 5em; background: #244b1f; width: 12em; height: 13em;">
            <table>
                <tr>
                    <th style="color: #c5a208;padding-top: 1em;padding-left: 1em;padding-bottom: 0.6em;">Feld</th>
                    <th style="color: #c5a208;padding-top: 1em;padding-left: 2em;padding-bottom: 0.6em;">Betrag</th>
                </tr>
                <tr v-for="result in placedBet" :key="result">
                    <td style="color: #f8e89d;padding-left: 1em">{{ result.number }}</td>
                    <td style="color: #f8e89d;padding-left: 3em;">{{ new Intl.NumberFormat().format(result.amount) }}
                                                                  $
                    </td>
                </tr>
            </table>
        </div>
        <div style="position: absolute; z-index: 1; margin: -30.8em 0em 0em 31em; background: #244b1f; width: 10em; height: 3em;">
            <div v-if="showTimer">
                <span style="color: #c5a208;padding: 1em 0em 0em 1em;">Nächste Runde: </span>
                <br>
                <span style="color: #c5a208;padding-left: 3.4em;">{{ startTime }} Sek</span>
            </div>
            <div v-else>
                <span style="color: #c5a208;padding: 1em 0em 0em 1em;">Gezogene Zahl: </span>
                <br>
                <span style="color: #c5a208;padding-left: 3.4em;">{{ number }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'RouletteTable',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            selectedAmount: 5000,
            placedBet     : [],
            placedField   : [],
            startTime     : 60,
            timer         : null,
            showTimer     : true,
            number        : 33,
        }
    },
    methods: {
        placeBet (field) {
            if (this.placedField.length < 5) {
                if (!this.placedField.includes(field)) {
                    var bet = {
                        amount: this.selectedAmount,
                        number: field,
                    }
                    this.placedBet.push(bet)
                    this.placedField.push(field)
                    this.triggerServer('placeBet', field, this.selectedAmount)
                }
            }
        },
        resultEndGame (number) {
            this.placedField = []
            this.placedBet   = []
            this.showTimer   = false
            this.number      = number
            this.triggerServer('nextRoundTime')
            //aktivieren von einem Element, das über dem Tisch liegt.
            //da wird dann die zahl angezeigt mit einem Roueltte Image, das sich dreht
        },
        resultNextRound (result) {
            this.showTimer = true
            this.startTime = result
            startTimer()
        },
        startTimer () {
            this.timer = setInterval(() => {
                if (this.startTime == 0) {
                    this.timer = null
                } else {
                    this.startTime--
                }
            }, 1000)

        },
        terminate () {
            this.dismiss()
        },
    },
    mounted () {
        this.triggerServer('nextRoundTime')
    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/roulette_table";
</style>