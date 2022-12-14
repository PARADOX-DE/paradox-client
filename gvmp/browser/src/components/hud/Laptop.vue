<template>
    <div class="laptop" v-if="app">
        <div class="md-macbook-pro md-glare">
            <div class="md-lid">
                <div class="md-camera"></div>

                <div class="md-screen">
                    <component :is="app" :data="data"></component>
                </div>
            </div>

            <div class="md-base" v-if="false"></div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'
import LaptopMainScreen from '../Apps/LaptopMainScreen'

export default {
    name      : 'Laptop',
    extends   : BaseComponent,
    components: {
        LaptopMainScreen,
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
.laptop {
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

<!-- components.get("Laptop").app = "GpsApp" -->