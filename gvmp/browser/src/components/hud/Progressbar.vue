<template>
    <div id="Progressbar">
        <transition name="fade">
            <div v-if="show" class="progress-bar blue stripes">
                <div class="text" v-text="progress.toFixed() + '%'"></div>
                <span class="progress-bar-fill" v-bind:style="{ width: progress + '%' }"></span>
            </div>
        </transition>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'Progressbar',
    extends: BaseComponent,
    data () {
        return {
            duration: 0,
            progress: 0,
            interval: 0,
            timeout : 0,
            show    : false,
        }
    },
    methods: {
        remove        : function () {
            this.show = false
            clearInterval(this.interval)
            this.interval = 0
            this.progress = 0
        },
        upProgress    : function () {
            var multiplier = this.duration / 1000
            this.progress  = this.progress + (100 / multiplier)
            if (this.progress > 100) {
                this.progress = 0
                this.show     = false
                clearInterval(this.interval)
                this.interval = 0
                this.trigger('StopProgressbar', [])
            }
        },
        setProgressbar: function (duration) {
            this.show     = true
            this.progress = 0
            this.interval = 0
            this.timeout  = 0
            this.duration = duration
            this.interval = setInterval(this.upProgress, 1000)
        },
    },
}
</script>

<style lang="scss" scoped>

.fade-leave-active,
.fade-enter-active {
    transition: 0.3s, opacity 0.3s;
}

.fade-enter {
    transform: translate(0, -100%);
    opacity: 0;
}

.fade-leave-to {
    transform: translate(0, 100%);
    opacity: 0;
}

.progress-bar {
    width: 20.1rem;
    height: 1.9rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.15rem 0.1rem 0.1rem 0.1rem;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, .2);
    transform: skewX(40deg);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
}

.progress-bar-fill {
    display: inline-block;
    height: 100%;
    background-color: rgba(218, 114, 0, 0.8);
    border-radius: 3px;
    transition: width 500ms ease-in-out;
    text-align: center;
}

.text {
    width: 100%;
    color: #fff;
    text-shadow: 1.2px 1.2px black;
    position: absolute;
    display: inline;
    text-align: center;
    letter-spacing: 1.2px;
    z-index: 666;
    margin-top: 0.02rem;
    transform: skewX(-40deg);
}


</style>

<!--  check -->