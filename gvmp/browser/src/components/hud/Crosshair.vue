<template>
    <div class="crosshairContainer" v-if="state > 0">
        <div v-if="state == 2" class="crosshair topRight"></div>
        <div v-if="state == 2" class="crosshair topLeft"></div>
        <div v-if="state == 2" class="crosshair bottomRight"></div>
        <div v-if="state == 2" class="crosshair bottomLeft"></div>
        <div v-if="state == 2" class="dot"></div>
        <div v-if="state == 1" class="circle"></div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'Crosshair',
    extends: BaseComponent,
    data () {
        return {
            state: 0,
        }
    },
    methods: {
        toggle () {
            if (this.state == 2) {
                this.state = 0
            } else {
                this.state++
            }
        },
        onKeyUp: function (event) {
            if (event.key == 'F4') {
                this.toggle()
            }
        },
    },
    mounted: function () {
        window.addEventListener('keyup', this.onKeyUp)
    },
}
</script>