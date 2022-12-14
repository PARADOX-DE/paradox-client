<template>
    <div id="Infocard">
        <transition name="fade">
            <div
                class="message"
                v-if="show"
                v-bind:style="{ 'background-image': 'url(' + backgroundImage(imgSrc) + ')', borderLeftColor: color }"
            >
                <p>{{ content }}</p>
                <table style="font-size: 0.98rem; margin: 0 0 -0.5rem -0.5rem; padding-left: 0.5rem; background-color: rgba(0,0,0,0.68);width:110%;position:absolute;bottom:0.5rem;">
                    <tr v-for="(value, key) in data" :key="key">
                        <td width="20%" style="font-weight:bold;">{{ key }}:</td>
                        <td>{{ value }}</td>
                    </tr>
                </table>
            </div>
        </transition>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'Infocard',
    extends: BaseComponent,
    data () {
        return {
            content : '',
            data    : [],
            duration: 0,
            timeout : '',
            imgSrc  : '',
            color   : '',
            show    : false,
        }
    },
    methods: {
        remove      : function () {
            this.show = false
        },
        pushInfocard: function (content, color, imgSrc, duration, data) {
            this.content  = content
            this.data     = JSON.parse(data)
            this.duration = duration
            this.color    = color
            this.imgSrc   = imgSrc
            this.show     = true
            this.timeout  = setTimeout(this.remove, this.duration)
        },
        backgroundImage (imgSrc) {
            return require('@/assets/hud_wallpaper/' + imgSrc)
        },
    },
}
</script>

<style lang="scss" scoped>

.fade-leave-active,
.fade-enter-active {
    transition: 2s, opacity 0.5s,;
}

.fade-enter {
    opacity: 0;
    transform: translate(100%, 0);
}

.fade-leave-to {
    opacity: 0;
    transform: translate(100%, 0);
}

.message {
    min-height: 12vh;
    min-width: 25vw;
    color: white;
    border-left: 6px solid rgba(51, 51, 51, 0.69);
    padding: 0.5rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-color: rgba(51, 51, 51, 0.69);
    font-size: 1.5rem;
    text-shadow: 1px 1px black;
    font-weight: normal;
    margin-bottom: 1rem;
    position: relative;
}

.clearfix {
    clear: both;
}
</style>

<!--  check -->