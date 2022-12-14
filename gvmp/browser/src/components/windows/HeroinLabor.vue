<template>
    <div id="wrapper">
        <div id="meth-bg" style="height:25vh">
            <div class="top text-center">
                <div id="status-lampe" class="float-left">
                    <div class="led-box">
                        <div :class="[{'led-green': methData.status},{'led-red': !methData.status}]"></div>
                    </div>
                    <p class="share-tech-font">Status</p>
                </div>
                <h3 class="float-left ml-5 roboto-font">Heroin Labor</h3>
                <div id="terminate" @click="terminate">
                    <i class="fa fa-times"></i>
                </div>
            </div>
            <div class="bottom roboto-font text-center">
                <button class="gvmputton gvmputton-green gvmputton-md gvmputton-block" @click="startHeroinLabor">Start
                </button>
                <button class="gvmputton gvmputton-red gvmputton-md gvmputton-block" @click="stopHeroinLabor">Stop
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'HeroinLabor',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            methData: JSON.parse(this.data),
        }
    },
    methods: {
        startHeroinLabor () {
            if (this.methData.status === false) {
                this.methData.status = true
                this.triggerServer('toggleHerionLabor', this.methData.status)
            }
        },
        stopHeroinLabor () {
            if (this.methData.status === true) {
                this.methData.status = false
                this.triggerServer('toggleHerionLabor', this.methData.status)
            }
        },
        terminate () {
            this.dismiss()
        },
    },
    mounted () {

    },
    computed: {
  
    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/methlabor";
@import "../../../stylesheets/gvmp_v2";
</style>