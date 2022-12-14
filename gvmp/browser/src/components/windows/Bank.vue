<template>
    <div class="wrapper">
        <div class="left_menu">
            <div class="inner">
                <div class="menu_logo"><img src="../../assets/bank/logo.png" alt=""></div>

                <div class="balance">
                    ${{ new Intl.NumberFormat('fr-CA').format(atmData.balance) }}<br><span>Aktueller Kontostand</span>
                </div>

                <hr />

                <div class="cards">
                    <div class="title">Deine Karten</div>

                    <div
                        class="card_visa card_shadow_positiv inter"
                        @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                    >
                        <div class="card_visa_inner">
                            <div class="card_visa_logo"><img src="../../assets/bank/logo.png" alt=""></div>

                            <div class="card_balance_title">Aktueller Kontostand</div>

                            <div class="card_balance_sum">
                                ${{ new Intl.NumberFormat('fr-CA').format(atmData.balance) }}
                            </div>

                            <div class="card_balance_number"> ⋆⋆⋆⋆⋆ ⋆⋆⋆⋆⋆
                                <div class="card_balance_lastnumber">{{ atmData.playerId }}</div>
                            </div>

                            <div class="card_balance_frist">05 / 32</div>
                        </div>
                    </div>

                    <div class="card_visa card_shadow inter" style="display:none;">
                        <div class="card_visa_inner">
                            <div class="card_visa_logo"><img src="../../assets/bank/logo_biz.png" alt=""></div>

                            <div class="card_balance_title">Business Kontostand</div>

                            <div class="card_balance_sum">$ 563 000</div>

                            <div class="card_balance_number"> ⋆⋆⋆⋆⋆ ⋆⋆⋆⋆⋆
                                <div class="card_balance_lastnumber">HAH1197</div>
                            </div>

                            <div class="card_balance_frist">03 / 29</div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <!--Rechtes Menü------------------------------------------------------------------------------------------------------------------>
        <div class="right_menu">
            <div class="inner">
                <div class="title pos2">{{ atmData.playername }} <span
                    v-on:click="terminate()"
                    @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                    class="card_shadow inter"
                ><i class="fas fa-sign-out-alt"></i></span></div>
                <div class="title">Gewähltes Konto
                    <span style="float:right; font-size:1.3vh; padding-top: 1vh;"> {{ atmData.playerId }}</span><span
                        style="float:right; font-size:1.3vh; padding-top: 0.75vh; "
                    >⋆⋆⋆⋆⋆&nbsp;&nbsp;⋆⋆⋆⋆⋆&nbsp;&nbsp; </span>
                    <div class="clear"></div>
                </div>
                <div class="flex-container">
                    <div
                        @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                        v-if="atmData.type != 1"
                        v-on:click="activeOption='einzahlung';whichActive = 1;resetModules('deposit')"
                        class="card_shadow inter"
                        v-bind:class="{isselected: whichActive == 1}"
                    ><i class="fas fa-hand-holding-usd"></i><br>Einzahlen
                    </div>
                    <div
                        @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                        v-on:click="activeOption='auszahlung';whichActive = 2;resetModules('withdraw')"
                        class="card_shadow inter"
                        v-bind:class="{isselected: whichActive == 2}"
                    ><i class="fas fa-wallet"></i><br>Auszahlen
                    </div>
                    <div
                        @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                        v-if="atmData.type != 1"
                        v-on:click="activeOption='uberweisung';whichActive = 3;resetModules('transfer')"
                        class="card_shadow inter"
                        v-bind:class="{isselected: whichActive == 3}"
                    ><i class="fas fa-money-bill-wave"></i><br>Überweisung
                    </div>
                </div>
                <hr />
                <!--MODULE Anfang------------------------------------------------------------------------------------------------------------------>
                <!--Paymenthistory-->
                <div class="modul" style="">
                    <div class="title">Zahlungsverlauf</div>
                    <div v-if="activeOption == 'overview'" class="navi_mini" style="height: 40vh; overflow-y:scroll;">
                        <ul v-for="overview in atmData.history" v-bind:key="overview.id">
                            <li v-if="overview.value == 0" class="">{{ overview.name }}<span
                                class=""
                                style="float:right"
                            >{{ new Intl.NumberFormat('fr-CA').format(overview.value) }} $</span>
                                <hr>
                            </li>
                            <li v-if="overview.value >= 1 && overview.name == 'Geldautomat - Auszahlung'" class="">
                                {{ overview.name }}<span
                                class="negative"
                                style="float:right"
                            >- {{ new Intl.NumberFormat('fr-CA').format(overview.value) }} $ Vwz: Kredit</span>
                                <hr>
                            </li>
                            <li v-else-if="overview.value >= 1">{{ overview.name }}<span
                                class="positiv"
                                style="float:right"
                            >{{ new Intl.NumberFormat('fr-CA').format(overview.value) }} $</span>
                                <hr>
                            </li>
                            <li v-if="overview.value < 0">{{ overview.name }}<span class="negative" style="float:right"> {{
                                    new Intl.NumberFormat('fr-CA').format(overview.value)
                                                                                                                         }} $</span>
                                <hr>
                            </li>
                        </ul>
                    </div>
                </div>

                <!--Einzahlen-->
                <div v-if="activeOption == 'einzahlung'" class="modul">
                    <div class="title pos" @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')">
                        Einzahlung <span
                        v-on:click="activeOption='overview'; whichActive = 0; resetModules('deposit')"
                        class="card_shadow inter"
                    ><i class="fas fa-arrow-left"></i></span></div>
                    <div class="payment">
                        <div class="icon_payment"><i class="fas fa-hand-holding-usd"></i></div>
                        <input
                            class="card_shadow input-number"
                            v-on:keyup.enter="deposit()"
                            v-model="depositAmount"
                            v-on:input="checkAmount('deposit')"
                            type="number"
                            min="0"
                            required
                            max="10000000"
                            name=""
                            value=""
                            placeholder="Betrag"
                        >
                        <button
                            :disabled="isDisabled"
                            @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                            class="inter"
                            v-on:click="processSteps('deposit')"
                            value="Zahlung tätigen"
                            type="submit"
                        >Betrag einzahlen
                        </button>
                        <hr />
                        <button
                            @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                            class="card_shadow inter"
                            v-on:click="processSteps('depositAll');"
                            value="Zahlung tätigen"
                            type="submit"
                        >Alles einzahlen
                        </button>
                    </div>
                </div>

                <!--Auszahlen-->
                <div v-if="activeOption == 'auszahlung'" class="modul">
                    <div class="title pos">Auszahlung <span
                        v-on:click="activeOption='overview'; whichActive = 0; resetModules('withdraw')"
                        class="card_shadow inter"
                    ><i
                        class="fas fa-arrow-left"
                        @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                    ></i></span></div>
                    <div class="payment" style="">
                        <div class="icon_payment"><i class="fas fa-wallet"></i></div>
                        <input
                            class="card_shadow input-number"
                            v-model="withdrawAmount"
                            v-on:keyup.enter="processSteps('withdraw')"
                            v-on:input="checkAmount('withdraw')"
                            type="number"
                            min="0"
                            max="10000000"
                            name=""
                            value=""
                            placeholder="Betrag"
                        >
                        <button
                            :disabled="isDisabled"
                            @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                            class="card_shadow inter"
                            v-on:click="processSteps('withdraw');"
                            value="Zahlung tätigen"
                            type="submit"
                        >Betrag auszahlen
                        </button>
                    </div>
                </div>

                <!--Überweisung-->
                <div v-if="activeOption == 'uberweisung'" class="modul">
                    <div class="title pos" @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')">
                        Überweisung tätigen <span
                        v-on:click="activeOption='overview'; whichActive = 0; resetModules('transfer')"
                        class="card_shadow inter"
                    ><i class="fas fa-arrow-left"></i></span></div>
                    <div class="payment" style="">
                        <div class="icon_payment"><i class="fas fa-comments-dollar"></i></div>
                        <input
                            class="card_shadow "
                            type="text"
                            v-model="transferTarget"
                            name=""
                            value=""
                            placeholder="Kontoinhaber"
                        >
                        <input
                            class="card_shadow input-number"
                            v-on:input="checkAmount('transfer')"
                            v-model="transferAmount"
                            type="number"
                            min="0"
                            max="10000000"
                            name=""
                            value=""
                            placeholder="Betrag"
                        >
                        <input
                            class="card_shadow "
                            type="text"
                            v-model="transferPurpose"
                            name=""
                            value=""
                            placeholder="Grund (Optional)"
                        >
                        <button
                            :disabled="isDisabled"
                            @click.prevent="playSound('http://enrico-kirsch.de/buttonclick.wav')"
                            class="inter card_shadow"
                            v-on:click="processSteps('transfer');"
                            value="Zahlung tätigen"
                            type="submit"
                        >Überweisung tätigen
                        </button>
                    </div>
                </div>
                <div class="paymentpending" style="display: none">
                    <div class="icon_payment">
                        <div class="loading">
                            <div class="lds-facebook">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="paymentdone" style="display: none">
                    <div class="icon_payment">
                        <div class="loading">
                            <div class="check bounce animated"><i class="fas fa-check-circle"></i></div>
                            <br>
                            <span>Zahlung erfolgreich !</span>
                        </div>
                    </div>
                </div>
                <!--MODULE ENDE------------------------------------------------------------------------------------------------------------------>
            </div>
        </div>

        <!--Footer------------------------------------------------------------------------------------------------------------------>
        <div class="bottom_menu">
            <hr>
            <div style="float:left;">{{ atmData.bankId }} | {{ atmData.title }}</div>
            <div style="float:right;">SOFTWARE Fleeca v0.64</div>
        </div>
    </div>


</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Bank',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            atmData: JSON.parse(this.data),
            /* atmData: {
                name: "Thomas Mayer",
                money: 1110,
                balance: 1110,
                overviewTotal: [{text: "Harz 4",betrag: 23030},{text: "Entwicklersteuer",betrag: 23030}],
                overviewIn: [{betrag: 23030},{betrag: 23030},{betrag: 23030}],
                overviewOut: [{betrag: -23030},{betrag: -23030},{betrag: -23030}],
                overviewInTransfer: [{name: "Unbekannt",betrag: 23030},{name: "Walter Hartz",betrag: 23030},{name: "Walter Hartz",betrag: 23030}],
                overviewOutTransfer: [{name: "Simon Hooker",betrag: -23030},{name: "Walter Hartz",betrag: -23030},{name: "Walter Hartz",betrag: -23030}],
            },*/
            depositAmount  : null,
            withdrawAmount : null,
            transferAmount : null,
            transferTarget : '',
            transferPurpose: '',
            transferAnonym : false,
            activeOption   : 'overview',
            whichActive    : false,
            isDisabled     : false,

        }
    },
    methods: {
        checkAmount (type) {
            if (type == 'transfer') {
                if ((this.atmData.balance - this.transferAmount) < 0) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
                if (this.transferAmount > 10000000) {
                    this.transferAmount = 10000000
                } else if (this.transferAmount < 0) {
                    this.transferAmount = 0
                }
            } else if (type == 'withdraw') {
                console.log(this.withdrawAmount)
                if ((this.atmData.balance - this.withdrawAmount) < 0) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
                if (this.withdrawAmount > 10000000) {
                    this.withdrawAmount = 10000000
                } else if (this.withdrawAmount < 0) {
                    this.withdrawAmount = 0
                }
            } else if (type == 'deposit') {
                if ((this.atmData.money - this.depositAmount) <= 0) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
                if (this.depositAmount > 10000000) {
                    this.depositAmount = 10000000
                } else if (this.depositAmount < 0) {
                    this.depositAmount = 0
                }
            }
        },
        playSound (sound) {
            if (sound) {
                var audio = new Audio(sound)
                audio.play()
            }
        },
        deposit () {
            if (this.depositAmount !== null && this.depositAmount > 0 && this.depositAmount < 10000001 && (this.atmData.money - this.depositAmount) >= 0) {
                this.atmData.balance = parseInt(this.atmData.balance) + parseInt(this.depositAmount)
                this.atmData.money   = parseInt(this.atmData.money) - parseInt(this.depositAmount)
                this.triggerServer('bankDeposit', this.depositAmount)
            }
        },
        depositAll () {
            if (this.atmData.money !== null && this.atmData.money > 0 && this.atmData.money < 30000001) {
                this.atmData.balance = parseInt(this.atmData.balance) + parseInt(this.atmData.money)
                this.triggerServer('bankDeposit', this.atmData.money)
            }
        },
        withdraw () {
            if (this.withdrawAmount !== null && this.withdrawAmount > 0 && this.withdrawAmount < 10000001 && (this.atmData.balance - this.withdrawAmount) >= 0) {
                this.atmData.money = parseInt(this.atmData.money) + parseInt(this.withdrawAmount)
                console.log('WithdrawAmount: ' + this.withdrawAmount)
                this.atmData.balance = parseInt(this.atmData.balance) - parseInt(this.withdrawAmount)
                this.triggerServer('bankPayout', this.withdrawAmount)
            }
        },
        transfer () {
            if (this.transferAmount !== null && this.transferAmount > 0 && this.transferAmount < 10000001 && this.transferTarget !== null && (this.atmData.balance - this.transferAmount) >= 0) {
                this.atmData.balance = parseInt(this.atmData.balance) - parseInt(this.transferAmount)
                this.triggerServer('bankTransfer', this.transferAmount, this.transferTarget, this.transferPurpose)
            }
        },
        processSteps (actionType) {
            let vm          = this
            let paymentDiv  = document.getElementsByClassName('payment')[0]
            let pendingDiv  = document.getElementsByClassName('paymentpending')[0]
            let doneDiv     = document.getElementsByClassName('paymentdone')[0]
            // disable all SPANS (card_shadow inter) while payment pending
            const nodeItems = document.getElementsByClassName('card_shadow inter')
            for (const c of nodeItems) {
                c.style.pointerEvents = 'none'
            }
            paymentDiv.style.display = 'none'
            pendingDiv.style.display = 'block'
            setTimeout(function () {pendingDiv.style.display = 'none'}, 5000)
            setTimeout(function () {
                doneDiv.style.display = 'block'
                for (const c of nodeItems) {
                    c.style.pointerEvents = 'auto'
                    console.log('Spans enabled')
                }
            }, 5000)
            if (actionType == 'deposit') {
                setTimeout(function () {vm.deposit()}, 5000)
            } else if (actionType == 'depositAll') {
                setTimeout(function () {vm.depositAll()}, 5000)
            } else if (actionType == 'withdraw') {
                setTimeout(function () {vm.withdraw()}, 5000)
            } else if (actionType == 'transfer') {
                setTimeout(function () {vm.transfer()}, 5000)
            }
        },
        resetModules (vModelName) {
            let paymentDiv = document.getElementsByClassName('payment')[0]
            let doneDiv    = document.getElementsByClassName('paymentdone')[0]
            if (vModelName == 'deposit') {
                this.depositAmount = null
            } else if (vModelName == 'withdraw') {
                this.withdrawAmount = null
            } else if (vModelName == 'transfer') {
                this.transferAmount  = null
                this.transferTarget  = ''
                this.transferPurpose = ''
            }
            doneDiv.style.display    = 'none'
            paymentDiv.style.display = 'block'
            //this.activeOption = 'overview';
        },
        terminate () {
            this.dismiss()
        },
    },
    mounted () {
    },
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css?family=Oswald:300&display=swap');

.clear {clear: both;}

.wrapper {color: #fff;font-family: 'Oswald', sans-serif;position: relative; z-index: 900; width: 100%;height: 100vh;overflow: hidden;background-image: url('../../assets/bank/bg.png');background-size: cover;font-size: 1.5vh;animation: fadeIn 0.5s;}

.left_menu {position: absolute; width: 25%; height: 95vh; left: 0vh; animation: slideinleft 1s;}

.right_menu {position: absolute; width: 25%; height: 95vh; right: 0vh; animation: slideinright 1s;}

.bottom_menu {position: absolute; height: 5vh; bottom: 0vh; left: 5vh; right: 5vh; font-size: 1.3vh; color: #575757}

.inner {padding: 5vh;}

.menu_logo {text-align: center;}

.menu_logo img {height: 14vh; text-align: center; padding-bottom: 6vh;}

.balance {font-size: 4vh;}

.balance span {font-size: 2vh;}

hr {opacity: 0.3;}

.title {margin: 3vh 0vh;font-size: 2.5vh; font-weight: 300}

.title .material-icons {font-size: 2.7vh; }

.card_visa {height: 17vh;width: 92%;border-radius: 0.5vh;margin-bottom: 2vh;background: rgb(23, 19, 19);background: radial-gradient(circle, rgba(23, 19, 19, 1) 0%, rgba(23, 19, 19, 0.7595413165266106) 100%);background-image: url('../../assets/bank/cardbg.png');background-size: cover;}

.card_shadow_positiv {
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    -moz-box-shadow:    inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    box-shadow:         inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
}

.card_shadow_negativ {
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
    -moz-box-shadow:    inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
    box-shadow:         inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
}

.card_shadow {
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    -moz-box-shadow:    inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    box-shadow:         inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
}

.paymentpending {
    background:    rgb(102, 58, 17);
    background:    linear-gradient(153deg, rgba(102, 58, 17, 0.200717787114846) 0%, rgba(166, 111, 23, 0.235189075630253) 100%);
    border-radius: 0.5vh;
    height:        25vh;
    padding-top:   7.5vh;
    transition:    500ms all;
}

.paymentdone {
    background:    rgb(51, 84, 75);
    background:    linear-gradient(153deg, rgba(51, 84, 75, 0.200717787114846) 0%, rgba(42, 82, 20, 0.2791491596638656) 100%);
    border-radius: 0.5vh;
    height:        25vh;
    padding-top:   5vh;
    transition:    500ms all;
}

.bounce {
    -webkit-animation-name: bounce;
    animation-name:         bounce;
}

@keyframes bounce {
    0%, 20%, 40%, 60%, 80%, 100% {transform: translateY(0);}
    50% {transform: translateY(-5px);}
}

.animated {
    -webkit-animation-duration:        0.5s;
    animation-duration:                1.2s;
    -webkit-animation-fill-mode:       both;
    animation-fill-mode:               both;
    -webkit-animation-timing-function: linear;
    animation-timing-function:         linear;
    animation-iteration-count:         infinite;
    -webkit-animation-iteration-count: infinite;
}

.paymentdone span {
    font-size: 2.1vh;
}

.card_visa_inner {padding: 2vh;position: relative;}

.card_visa_logo {position: absolute;top: 2.3vh; right: 2vh;}

.card_visa_logo img {height: 3vh; }

.card_balance_title {opacity: 0.6}

.card_balance_sum {color: #fff; font-size: 2.5vh;}

.card_balance_number {position: relative;letter-spacing: 0.5em; height: 5vh; line-height: 5vh;}

.card_balance_lastnumber {position: absolute; right: 1vh; top: 0.3vh}

.card_balance_frist {opacity: 0.6}

.navi_mini {height: 2vh;}

.navi_mini ul {margin: 0; padding: 0;}

.navi_mini ul li {
    display:         inline-block;
    line-height:     2vh;
    height:          2vh;
    width:           100%;
    font-size:       1.7vh;
    margin-bottom:   2vh;

    padding:         0.5vh;
    background-size: cover;
    border-radius:   0.5vh;
}

.navi_mini ul li span {
    font-size: 1.4vh;
}

.negative {color: red;}

.positiv {color: green;}

.flex-container {
    display:   flex;
    flex-wrap: nowrap;
}

.flex-container > div {
    background-image: url(../../assets/bank/cardbg.png);
    width:            100%;
    margin:           0.5vh;
    height:           15vh;
    border-radius:    0.5vh;
    text-align:       center;
    line-height:      3.2vh;
    padding-top:      3vh;
}

.flex-container > div > .material-icons, .fas {
    padding-top: 1vh;
    font-size:   3vh;
}

.inter:hover {
    cursor:            pointer;
    -webkit-transform: scale(1);
    -moz-transform:    scale(1);
    -ms-transform:     scale(1);
    -o-transform:      scale(1);
    transform:         scale(1.05);
    transition:        200ms all;
}

.inter {transition: 200ms all;}

.pos {position: relative;}

.pos span {
    float:            left;
    height:           4vh;
    width:            4vh;
    border-radius:    0.5vh;
    text-align:       center;
    line-height:      3vh;
    background-image: url('../../assets/bank/cardbg.png');
    margin-right:     1.0vh;
}

.pos2 {text-align: right;}

.pos2 span {
    float:            right;
    height:           4vh;
    width:            4vh;
    border-radius:    0.5vh;
    text-align:       center;
    line-height:      3.8vh;
    background-image: url('../../assets/bank/cardbg.png');
    margin-left:      1.0vh;
}

.pos2 .fas {font-size: 2.3vh;}

.fa-arrow-left {padding-top: 1.2vh; font-size: 1.6vh;}

.icon_payment {text-align: center; padding-bottom: 2vh;}

.icon_payment .fas {font-size: 8vh; text-align: center; padding: 1vh;}

.payment input {width: 100%; height: 5vh;background-image: url('../../assets/bank/cardbg.png'); background-color: transparent; border: 0; border-radius: 0.5vh; text-align: center; color: #fff;font-size: 1.6vh; margin-bottom: 2vh;}

.payment button {width: 100%; height: 5vh;background-image: url('../../assets/bank/cardbg.png'); background-color: transparent; border: 0; border-radius: 0.5vh; text-align: center; color: #fff;font-size: 1.6vh; }

input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin:             0;
}

input[type=number] {
    -moz-appearance: textfield;
}

.isselected {
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    -moz-box-shadow:    inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    box-shadow:         inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
}


@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}


@keyframes slideinleft {
    0% { left: -1000vh; }
    100% { left: 0vh; }
}

@keyframes slideinright {
    0% { right: -1000vh; }
    100% { right: 0vh; }
}


::-webkit-scrollbar {
    width:            0.5vh;
    background-image: url('../../assets/bank/cardbg.png');
}

/* Track */
::-webkit-scrollbar-track {
    background-image: url('../../assets/bank/cardbg.png');
    background-color: transparent;


}

/* Handle */
::-webkit-scrollbar-thumb {
    background-image: url('../../assets/bank/cardbg.png');
    background-color: #000 !important;
    border:           0px !important;
    border-radius:    0.5vh;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #ccc;
}

.lds-facebook {
    display:  inline-block;
    position: relative;
    width:    80px;
    height:   80px;
}

.lds-facebook div {
    display:    inline-block;
    position:   absolute;
    left:       8px;
    width:      16px;
    background: #fff;
    animation:  lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook div:nth-child(1) {
    left:            8px;
    animation-delay: -0.24s;
}

.lds-facebook div:nth-child(2) {
    left:            32px;
    animation-delay: -0.12s;
}

.lds-facebook div:nth-child(3) {
    left:            56px;
    animation-delay: 0;
}

@keyframes lds-facebook {
    0% {
        top:    8px;
        height: 64px;
    }
    50%, 100% {
        top:    24px;
        height: 32px;
    }
}
</style>
<!-- components.Windows.show("newBank", '{"playername": "Markus Frilling", "money": 1000,"balance": 550, "history": [{"name": "Bank", "value": 500}, {"name": "Bank 2", "value": 1500}]}') -->
<!-- components.Windows.show('newBank','{"name": "Thomas Mayer","money": 1110,"balance": 1110,"overviewTotal": [{"text": "Harz 4","betrag": 23030},{"text": "Entwicklersteuer","betrag": 23030}],"overviewIn": [{"betrag": 23030},{"betrag": 23030},{"betrag": 23030}],"overviewOut": [{"betrag": 23030},{"betrag": 23030},{"betrag": 23030}],"overviewInTransfer": [{"name": "Unbekannt","betrag": 23030},{"name": "Walter Hartz","betrag": 23030},{"name": "Walter Hartz","betrag": 23030}],"overviewOutTransfer": [{"name": "Simon Hooker","betrag": 23030},{"name": "Walter Hartz","betrag": 23030},{"name": "Walter Hartz","betrag": 23030}]}') -->
