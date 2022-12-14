<template>

    <div class="essensleiste" v-show="nutritionShow" :style="cssProps">


        <div class="wrapperfotitle" v-show="nutritions.kshow">

            <div class="wrapper">
                <span class="num">Kcal</span>

                <svg viewBox="0 0 100 100">
                    <circle class="kcal" r="40" cx="50" cy="50" />
                </svg>
            </div>
            <div class="outercircle"></div>
            <div class="nullbar"></div>
        </div>


        <div class="wrapperfotitle" v-show="nutritions.wshow">

            <div class="wrapper">
                <span class="num">H²o</span>

                <svg viewBox="0 0 100 100">
                    <circle class="H2O" r="40" cx="50" cy="50" />
                </svg>
            </div>
            <div class="outercircle"></div>
            <div class="nullbar"></div>
        </div>


        <div class="wrapperfotitle" v-show="nutritions.fshow">

            <div class="wrapper">
                <span class="num">Fett</span>

                <svg viewBox="0 0 100 100">
                    <circle class="Fett" r="40" cx="50" cy="50" />
                </svg>
            </div>
            <div class="outercircle"></div>
            <div class="nullbar"></div>
        </div>
        <div class="wrapperfotitle" v-show="nutritions.zshow">

            <div class="wrapper">
                <span class="num">Zucker</span>

                <svg viewBox="0 0 100 100">
                    <circle class="Zucker" r="40" cx="50" cy="50" />
                </svg>
            </div>
            <div class="outercircle"></div>
            <div class="nullbar"></div>
        </div>


    </div>

</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name: 'Nutrition',
    extends: BaseComponent,
    data () {
        return {
            nutritionShow: true,
            nutritions   : {
                wasser: 0,
                wshow : false,
                fett  : 0,
                fshow : false,
                kcal  : 0,
                kshow : false,
                zucker: 0,
                zshow : false,
            },
        }
    },
    methods: {
        responseNutrition (data) {
            //maxwert 251/100=2.51
            var obj = JSON.parse(data)
            obj.wasser *= 2.51
            obj.fett *= 2.51
            obj.kcal *= 2.51
            obj.zucker *= 2.51

            obj.wasser < 0 ? obj.wasser = 0 : ''
            obj.fett < 0 ? obj.fett = 0 : ''
            obj.kcal < 0 ? obj.kcal = 0 : ''
            obj.zucker < 0 ? obj.zucker = 0 : ''

            this.nutritions = obj
        },
    },
    mounted () {
    },
    computed: {
        cssProps () {
            return {
                '--wasser': this.nutritions.wasser,
                '--fett'  : this.nutritions.fett,
                '--kcal'  : this.nutritions.kcal,
                '--zucker': this.nutritions.zucker,
            }
        },
    },
}
</script>

<style lang="scss" id="keyframes" scoped>
.essensleiste {
    right: 0.5vh;
    opacity: 0.8;
    position: absolute;
    top: 17vh;
}

.wrapperfotitle {
    margin-bottom: 3vh;
    position: relative;
}

.wrapper {
    width: 5vh;
    height: 3.8vh;

    margin: 5% auto;
}


svg {
    width: 5vh;
    height: 5vh;
    transform: rotateZ(90deg);
    border-radius: 50%;
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
    clear: both;
}


.nullbar {
    background: black;
    height: 1vh;
    width: 0.2vh;
    position: absolute;
    bottom: -1.1vh;
    left: 2.5vh;
    z-index: 1
}

.outercircle {
    background: transparent;
    border: 0.2vh dashed #e79750;
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    position: absolute;;
    top: 0vh;
    left: 0vh;
    z-index: 1
}

.num {
    color: rgba(#fff, 0.8);
    left: 50%;
    top: 67%;
    z-index: 999;
    display: block;
    position: absolute;
    font-size: 1vh;
    transform: translate(-50%, -50%);
}

.mettile {
    color: rgba(#000, 0.8);
    left: 50%;
    top: 120%;
    z-index: 999;
    display: block;
    position: absolute;
    transform: translate(-50%, -50%);
}


.metabolismitem {
    text-align: center;
    width: 10vh;
    height: 10vh;
    position: absolute;
    bottom: 10vh;
    left: 10vh;
}

circle {
    fill: rgba(#000, 0.3);
    stroke: #a15d1c;
    stroke-width: 0.8vh;
    stroke-dasharray: 0 250;
}

.Zucker {
    animation: fillupZucker 3s forwards;
}

.Fett {
    animation: fillupFett 3s forwards;
}

.kcal {
    animation: fillupkcal 3s forwards;
}

.H2O {
    animation: fillupH2O 3s forwards;
}

@keyframes fillupZucker {
    to {

        stroke-dasharray: var(--zucker) 251;

    }
}

@keyframes fillupFett {
    to {

        stroke-dasharray: var(--fett) 251;

    }
}

@keyframes fillupkcal {
    to {

        stroke-dasharray: var(--kcal) 251;

    }
}

@keyframes fillupH2O {
    to {

        stroke-dasharray: var(--wasser) 251;

    }
}
</style>