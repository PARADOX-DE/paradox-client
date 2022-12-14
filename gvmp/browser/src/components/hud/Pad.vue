<template>
    <div class="pad" v-if="app">
        <div class="md-ipad md-black-device md-landscape">
            <div class="md-body">
                <div class="md-front-camera"></div>

                <div class="md-screen">
                    <component :is="app" :data="data"></component>
                </div>

                <button class="md-home-button"></button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'
import PadMainScreen from '../Apps/PadMainScreen'

export default {
    name      : 'Pad',
    extends   : BaseComponent,
    components: {
        PadMainScreen,
    },
    data () {
        return {
            app : '',
            data: {},
        }
    },
    methods: {
        show: function (app, data = null) {
            this.data = data
            this.app  = app
        },
    },
}
</script>

<style lang="scss" scoped>
.pad {
    font-size: 1.8vh;

    .page {
        height: inherit;
        width: inherit;
        position: relative;
    }
}

.md-top:after {
    z-index: -1;
}
</style>