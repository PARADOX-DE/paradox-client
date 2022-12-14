<template>
    <div class="ipad" v-if="app">
        <div class="marvel-device ipad landscape">
            <div class="camera"></div>
            <div class="screen">
                <component :is="app" :data="data"></component>
            </div>
            <div class="home"></div>
        </div>
        <!--
      <div class="md-ipad md-black-device md-glare">
        <div class="md-body">
          <div class="md-front-camera"></div>

          <div class="md-screen">
            <component :is="app" :data="data"></component>
          </div>

          <button class="md-home-button"></button>
        </div>
      </div>
            -->
    </div>
</template>

<script>
import IpadMainScreen from '../Apps/IpadMainScreen'
import BaseComponent from '../BaseComponent'

export default {
    name      : 'Ipad',
    extends   : BaseComponent,
    components: {
        IpadMainScreen,
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
.ipad {
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