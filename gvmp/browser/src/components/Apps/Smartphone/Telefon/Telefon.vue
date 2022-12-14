<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Telefon
            </div>
        </v-ons-toolbar>

        <div class="content">
            <v-ons-list-title>
                Verlauf
            </v-ons-list-title>

            <div class="verlauf-content">
                <v-ons-list>
                    <v-ons-list-item
                        modifier="nodivider"
                        v-for="phone in phoneData"
                        :key="phone.time"
                        @click="call(phone.number)"
                        tappable
                    >
                        <div class="left">
                            <v-ons-icon
                                v-if="phone.method === 'outgoing'"
                                icon="ion-md-call"
                                style="color: red;"
                                class="list-item__icon"
                            ></v-ons-icon>

                            <v-ons-icon
                                v-if="phone.method === 'incoming'"
                                icon="ion-md-call"
                                style="color: green;"
                                class="list-item__icon"
                            ></v-ons-icon>
                        </div>

                        <div class="center">
                            {{ phone.number }} [{{ phone.time }}]
                        </div>
                    </v-ons-list-item>
                </v-ons-list>
            </div>

            <div class="dial-content">
                <v-ons-list>
                    <v-ons-list-item>
                        <div class="left">
                            <v-ons-icon icon="ion-md-call" class="list-item__icon"></v-ons-icon>
                        </div>

                        <div class="center">
                            <input
                                class="text-input"
                                type="number"
                                ref="phoneNumber"
                                placeholder="Nummer eingeben..."
                                v-model="number"
                            />
                        </div>
                    </v-ons-list-item>
                </v-ons-list>

                <div class="dial-field color-background dark-top">
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('1')">1</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('2')">2</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('3')">3</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('4')">4</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('5')">5</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('6')">6</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('7')">7</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('8')">8</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('9')">9</v-ons-button>
                    <v-ons-button modifier="dial-btn quiet" @click="addToNumber('0')">0</v-ons-button>
                </div>
            </div>

            <v-ons-fab position="bottom right" modifier="mini" style="background-color: green;" @click="CallUser">
                <v-ons-icon icon="md-phone" style="color: white;"></v-ons-icon>
            </v-ons-fab>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'Telefon',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            number   : null,
            phoneData: [],
        }
    },

    mounted () {
        this.focusNumberInput()
    },

    methods: {
        CallUser () {
            if (this.number == null || this.number <= 0) return

            this.triggerServer('callUserPhone', this.number)
        },

        responsePhoneCalls (response) {
            this.phoneData = JSON.parse(response)

            this.phoneData.reverse()
        },

        call (number) {
            if (number != null) {
                this.triggerServer('callUserPhone', number)
            }
        },

        addToNumber (number) {
            if (this.number == null || this.number <= 0) {
                this.number = parseInt(number)

                return
            }

            let numberString = String(this.number)

            numberString += number
            this.number = parseInt(numberString)
        },

        focusNumberInput () {
            this.$refs.phoneNumber.focus()
        },
    },
}
</script>

<style lang="scss" scoped>
.verlauf-content {
    width: 100%;
    height: 30%;
    overflow-y: auto;
}

.dial-content {
    width: 100%;
    height: 61%;
    overflow-y: hidden;
    border-top: 1px solid #5e5e5e;
}

.dial-field {
    display: flex;
    border-radius: 3%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    padding: 1%;
    justify-content: center;
}

.button--dial-btn {
    margin: 2% 4%;
    background-color: transparent !important;
    padding: 1% 0;
    height: 10%;
    width: 25%;
    border-radius: 5%;
    color: white;
}
</style>
