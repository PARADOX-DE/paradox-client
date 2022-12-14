<template>
    <div class="fishing" v-if="activeFishing" style="">
        <div v-if="angeln === false" class=" fishingbtn begin"><img
            alt="self-Logo"
            :src="require('@/assets/fishingrodin.png')"
            v-on:click="startFishing()"
        ><span>Angel auswerfen</span></div>
        <div v-else-if="fish" class=" fishingbtn fish "><img
            class="bounce"
            alt="self-Logo"
            :src="require('@/assets/fishingrodout.png')"
            v-on:click="finishFishing()"
        ><span>Angel einholen</span></div>
        <div v-else class=" fishingbtn abort "><img
            alt="self-Logo"
            :src="require('@/assets/fishingrodout.png')"
            v-on:click="finishFishing()"
        ><span>Angel einholen</span></div>
        <div class=" fishingbtn koeder"><img
            alt="self-Logo"
            :src="require('@/assets/koeder.png')"
            v-on:click="koederFishing()"
        ><span>Koeder anbringen</span></div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name: 'Fishing',
    extends: BaseComponent,
    data () {
        return {
            activeFishing: false,
            angeln       : false,
            fish         : false,
        }
    },
    methods: {
        finishFishing () {
            this.triggerServer('stopFishing')
        },
        startFishing () {
            this.triggerServer('startFishing')
        },
        koederFishing () {
            this.triggerServer('addKoeder')
        },
        showfishing (state) {
            this.activeFishing = state
        },
        setAngelState (state) {
            this.angeln = state
        },
        setFishState (state) {
            this.fish = state
        },
    },
    mounted () {
    },
}
</script>

<style lang="scss" id="keyframes" scoped>

.fishing {
    position: relative;
    top: 10vh;
    margin: 0 auto;
}

.fishingbtn {
    margin: 0vh 1vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff !important;
    border-radius: 0.35em !important;
    transition: 200ms all;
    padding: 1vh;
    height: 7vh;
    width: 7.5vh;
    float: left;
    border: 0.1vh solid #2f2f2f;
}

.fishingbtnclose {
    margin: 0vh 1vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff !important;
    border-radius: 0.35em !important;
    transition: 200ms all;
    padding: 0 0.5vh;
    float: left;
    border: 0.1vh solid #2f2f2f;
}

.fishingbtn span {
    display: none;
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff !important;
    padding: 1vh;
    border-radius: 0.3em;
    width: 20vh;
    text-align: center;
    top: -12vh;
    left: -8vh;
}

.fishingbtn:hover > span {
    display: block;
}

.fishingbtn img {
    height: 5vh;
    width: 5vh;
}

.abort {
    background: #b27e2d;
    transition: 200ms all;
}

.abort:hover {
    background: rgba(255, 0, 0, 0.5);
    transition: 200ms all;
}

.fish {
    background: #72b22d;
    transition: 200ms all;
}

.fish:hover {
    background: #b22d2d;
    transition: 200ms all;
}

.end:hover {
    background: #b22d2d;
    transition: 200ms all;
    color: #fff;
}

.begin:hover {
    background: #b27e2d;
    transition: 200ms all;
}

.koeder:hover {
    background: #b27e2d;
    transition: 200ms all;
}

.amount {
    position: absolute;
    top: 0.5vh;
    right: 1.5vh;
}

.bounce {
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    border-radius: 50%;
    animation: bounce 2s infinite;
    -webkit-animation: bounce 2s infinite;
    -moz-animation: bounce 2s infinite;
    -o-animation: bounce 2s infinite;
}

.end {
    text-align: center;
}

.end i {
    font-size: 4vh;
    padding-top: 0.5vh;
    color: #1b1b1b;
    opacity: 0.5;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-5px);
    }
    60% {
        transform: translateY(-8px);
    }
}

</style>