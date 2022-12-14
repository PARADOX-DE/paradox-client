<template>
    <div class="computer" v-if="app">
        <div class="md-imac md-glare">
            <div class="md-body">
                <div class="md-top">
                    <div class="md-camera"></div>
                    <div class="md-screen">
                        <component :is="app" :data="data"></component>
                    </div>
                </div>
            </div>

            <div class="md-base" v-if="false">
                <div class="md-stand"></div>
                <div class="md-opening"></div>
            </div>
        </div>
    </div>
</template>

<script>
import ComputerMainScreen from '../Apps/ComputerMainScreen'
import BaseComponent from '../BaseComponent'

export default {
    name      : 'Computer',
    extends   : BaseComponent,
    components: {
        ComputerMainScreen,
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
.computer {
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
