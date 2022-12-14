<template>
    <div class="gvmp-panel gvmp-d-flex gvmp-align-items-center" v-show="!state">
        <div class="money-container gvmp-d-flex gvmp-align-items-center">
            <i class="fa fa-usd"></i> <span>{{ Number(money).toLocaleString('de') }}</span>
        </div>

        <div class="voice-range-container">
            <svg
                style="text-shadow: -0.1vh 0 black, 0 0.1vh black, 0.1vh 0 black, 0 -0.1vh black;"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    v-if="voiceRange == 1 || voiceRange == 2 || voiceRange == 3" stroke="black" fill="#9E9E9E"
                    d="M9,5c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S6.8,5,9,5 M9,15c2.7,0,8,1.3,8,4v2H1v-2C1,16.3,6.3,15,9,15"
                ></path>

                <path
                    v-if="voiceRange == 1 || voiceRange == 2" stroke="black" fill="#9E9E9E"
                    d="M16.7,5c2,2.2,2,5.2,0,7.3L15,10.6c0.8-1.2,0.8-2.7,0-3.9L16.7,5"
                ></path>

                <path
                    v-if="voiceRange == 2" stroke="black" fill="#9E9E9E"
                    d="M19.5,2c3.9,4.1,3.9,10.1,0,14l-1.6-1.6c2.8-3.2,2.8-7.7,0-10.7L19.5,2z"
                ></path>

                <path
                    v-if="voiceRange == 4" stroke="black" fill="#9E9E9E"
                    d="M16,12V16A1,1 0 0,1 15,17C14.83,17 14.67,17 14.06,16.5C13.44,16 12.39,15 11.31,14.5C10.31,14.04 9.28,14 8.26,14L9.47,17.32L9.5,17.5A0.5,0.5 0 0,1 9,18H7C6.78,18 6.59,17.86 6.53,17.66L5.19,14H5A1,1 0 0,1 4,13A2,2 0 0,1 2,11A2,2 0 0,1 4,9A1,1 0 0,1 5,8H8C9.11,8 10.22,8 11.31,7.5C12.39,7 13.44,6 14.06,5.5C14.67,5 14.83,5 15,5A1,1 0 0,1 16,6V10A1,1 0 0,1 17,11A1,1 0 0,1 16,12M21,11C21,12.38 20.44,13.63 19.54,14.54L18.12,13.12C18.66,12.58 19,11.83 19,11C19,10.17 18.66,9.42 18.12,8.88L19.54,7.46C20.44,8.37 21,9.62 21,11Z"
                ></path>
            </svg>
        </div>

        <div v-if="voiceRadioActive" class="voice-radio-container">
            <div v-if="voiceRadioActiveType >= 0">
                <svg viewBox="0 0 298 298" width="24" height="24" v-bind:class="walkietalkieType">
                    <path d="m223.195,70h-49.221v-14.25c0-8.837-7.163-16-16-16-8.837,0-16,7.163-16,16v14.25h-15.322v-54c0-8.837-7.163-16-16-16s-16,7.163-16,16v54h-3.899c-9.472,0-17.153,7.678-17.153,17.15 0,5.341 0,11.714 0,18.858-0.052,0-0.103-0.008-0.155-0.008-8.723,0-15.794,7.071-15.794,15.794v15.663c0,8.723 7.071,15.794 15.794,15.794 0.052,0 0.103-0.007 0.155-0.008 0,46.564 0,100.454 0,127.608 0,9.474 7.678,17.15 17.153,17.15h132.442c9.472,0 17.153-7.678 17.153-17.15 0-42.608 0-151.056 0-193.7 2.84217e-14-9.476-7.678-17.151-17.153-17.151zm-13.709,59.363c0,2.975-2.411,5.387-5.386,5.387h-94.251c-2.975,0-5.386-2.412-5.386-5.387v-30.227c0-2.975 2.412-5.386 5.386-5.386h94.251c2.975,0 5.386,2.412 5.386,5.386v30.227z" />
                </svg>
            </div>
        </div>

        <div v-if="airRadioActive" class="voice-air-radio-container">
            <div v-if="airRadioActiveType >= 0">
                <svg
                    width="24.000000pt"
                    height="24.000000pt"
                    viewBox="0 0 24.000000 24.000000"
                    v-bind:class="airplaneType"
                >
                    <g
                        transform="translate(0.000000,24.000000) scale(0.100000,-0.100000)"
                        stroke="none" v-bind:class="airplaneType"
                    >
                        <path
                            d="M106 189 c-5 -34 -10 -40 -25 -36 -13 3 -21 -2 -24 -15 -3 -11 -9
                            -18 -14 -15 -4 3 -17 -7 -27 -21 l-19 -25 24 8 c13 4 38 8 54 9 25 1 30 -3 33
                            -25 2 -14 -4 -31 -12 -39 -25 -20 -19 -25 24 -25 43 0 49 5 24 25 -8 8 -14 25
                            -12 39 3 22 8 26 33 25 17 -1 41 -5 54 -9 l24 -8 -19 25 c-10 14 -23 24 -27
                            21 -5 -3 -11 4 -14 15 -3 13 -11 18 -24 15 -15 -4 -20 2 -25 36 -4 23 -10 41
                            -14 41 -4 0 -10 -18 -14 -41z"
                        />
                    </g>
                </svg>
            </div>
        </div>

        <div class="nutrition-container">
            <i class="fas fa-wine-glass" :class="getNutritionColor(nutritionDrinking)"></i>

            <i class="fas fa-utensils" :class="getNutritionColor(nutritionEating)"></i>
        </div>

        <div v-if="blackmoney > 0" class="black-money-container">
            <div class="inner gvmp-d-flex gvmp-align-items-center">
                <i class="fa fa-usd"></i> <span>{{ Number(blackmoney).toLocaleString('de') }}</span>
            </div>
        </div>

        <div class="aduty gvmp-d-flex gvmp-align-items-center" :class="{'visible': aduty}" v-if="aduty == true">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    class="st0" fill="#F44336"
                    d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,13.28L7.45,14.77L6.8,11.96L9,10.08L6.11,9.83L5,7.19L3.87,9.83L1,10.08L3.18,11.96L2.5,14.77L5,13.28Z"
                ></path>
            </svg>

            <span>Admin-Dienst</span>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'PlayerPanel',
    extends: BaseComponent,
    data () {
        let color

        if (this.voiceRadio == 0) {
            color = '#9e9e9e'
        } else if (this.voiceRadio == 1) {
            color = '#cddc39'
        } else {
            color = '#4caf50'
        }

        return {
            voiceRadioColor     : color,
            money               : 0,
            blackmoney          : 0,
            voiceRange          : 1,
            voiceRadio          : 0,
            voiceRadioActive    : false,
            voiceRadioActiveType: 0,
            airRadioActive      : false,
            airRadioActiveType  : 0,
            aduty               : false,
            state               : false,
            talking             : false,
            nutritionEating     : 1,
            nutritionDrinking   : 1,
        }
    },

    methods : {
        getNutritionColor (color) {
            switch (color) {
                case 1:
                    return 'white'
                case 2:
                    return 'yellow'
                case 3:
                    return 'green'
                case 4:
                    return 'red'
                default:
                    return 'white'
            }
        },
    },
    computed: {
        walkietalkieType: function () {
            return {
                'funkAus': this.voiceRadioActiveType == 0,
                'funkPTT': this.voiceRadioActiveType == 1,
                'funkDS' : this.voiceRadioActiveType == 2,
            }
        },

        airplaneType: function () {
            return {
                'funkAus': this.airRadioActiveType == 0,
                'funkPTT': this.airRadioActiveType == 1,
                'funkDS' : this.airRadioActiveType == 2,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.gvmp-panel {
    height: 3.3vh;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0 5vh 0 3vh;
    margin-top: -7vh;
    margin-right: -5vh;
    transform: skewX(-30deg);
    border-left: .2vh solid rgba(0, 0, 0, 0.9);
    border-bottom: .2vh solid rgba(0, 0, 0, 0.9);

    .money-container {
        min-width: 5vw;
        transform: skewX(30deg);

        i {
            //border-radius: 3vh;
            padding: 0.5vh 0;
            //fill: rgb(51, 255, 57);
            color: rgb(51, 255, 57);
            font-size: 1.8vh;
        }

        span {
            margin-left: .5vh;
            color: white;
            //padding: 0.5vh 3vh 0.5vh 1.5vh;
            font-size: 1.3vh;
        }
    }

    .voice-range-container {
        margin-left: 1vh;
        transform: skewX(30deg);

        svg {
            margin-top: .3vh;

            height: 2.4vh;
            width: 2.4vh;
        }
    }

    .voice-radio-container {
        margin-left: 1vh;
        transform: skewX(30deg);

        svg {
            margin-top: .3vh;

            height: 2vh;
            width: 2vh;
        }

        .funkAus {
            fill: rgba(255, 255, 255, 0.2);
        }

        .funkPTT {
            fill: orange;
        }

        .funkDS {
            fill: forestgreen;
        }
    }

    .voice-air-radio-container {
        margin-left: 1vh;
        transform: skewX(30deg);

        svg {
            margin-top: .3vh;

            height: 2vh;
            width: 2vh;
        }

        .funkAus {
            fill: rgba(255, 255, 255, 0.2);
        }

        .funkPTT {
            fill: orange;
        }

        .funkDS {
            fill: forestgreen;
        }
    }

    .nutrition-container {
        margin-left: 1vh;
        transform: skewX(30deg);

        i {
            margin-top: .4vh;
            font-size: 1.5vh;
        }

        i:first-child {
            margin-right: 1vh;
        }

        .white {
            color: white;
        }

        .yellow {
            color: yellow;
        }

        .green {
            color: #33ff39;
        }

        .red {
            color: red;
        }
    }

    .black-money-container {
        position: absolute;
        display: block;
        height: 3vh;
        background: rgba(0, 0, 0, 0.7);
        top: 3.3vh;
        margin-right: -5vh;
        padding: 0 7vh 0.8vh 2vh;
        right: 0;
        border-left: 0.2vh solid rgba(0, 0, 0, 0.9);
        border-bottom: 0.2vh solid rgba(0, 0, 0, 0.9);

        .inner {
            transform: skewX(30deg);

            i {
                padding: 0.5vh 0;
                color: rgba(255, 50, 50, 1);
                font-size: 1.8vh;
            }

            span {
                margin-left: .5vh;
                color: white;
                //padding: 0.5vh 3vh 0.5vh 1.5vh;
                font-size: 1.3vh;
            }
        }
    }

    .aduty {
        transform: skewX(30deg);
        position: absolute;
        top: 10vh;
        right: -2vh;
        color: black;

        span {
            color: black;
            font-size: 2vh;
            margin-left: 1vh;
        }

        svg {
            height: 2.5vh;
            width: 2.5vh;
        }
    }
}
</style>
