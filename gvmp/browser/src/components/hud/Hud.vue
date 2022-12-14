<template>
    <div v-if="visible">
        <component v-for="window in windows" :key="window.name" :is="window.name" :data="window.data"></component>

        <div class="top-center">
            <KeyInteraction />
            <GlobalNotification />
        </div>
        <XMenu />
        <NMenu />
        <NativeMenu />
        <div class="center">
            <Computer />
            <Laptop />
            <Ipad />

            <AntiAFK />
        </div>
        <div class="center-right">
        </div>
        <div class="top right">
            <PlayerPanel />
            <Nutrition />
        </div>
        <div class="top left">
            <PlayerNotification />

        </div>
        <Crosshair />
        <div class="bottom-center">
            <Progressbar />
            <Gangwar />
            <Paintball />
            <Fishing />
        </div>
        <div class="bottom right">
            <div>
                <div>
                    <PlayerInfo />
                    <IdCard />
                    <VehiclePanel />
                    <Licenses />
                    <Infocard />
                </div>
            </div>
            <Smartphone />
        </div>
        <div class="bottom left">
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'
import PlayerPanel from './PlayerPanel.vue'
import VehiclePanel from './VehiclePanel.vue'
import Crosshair from './Crosshair.vue'
import Smartphone from './Smartphone.vue'
import XMenu from './XMenu.vue'
import NMenu from './NMenu.vue'
import IdCard from './IdCard.vue'
import Licenses from './Licenses.vue'
import KeyInteraction from './KeyInteraction.vue'
import Computer from './Computer.vue'
import Laptop from './Laptop.vue'
import Ipad from './Ipad.vue'
import NativeMenu from './NativeMenu.vue'
import GlobalNotification from './GlobalNotification.vue'
import PlayerNotification from './PlayerNotification.vue'
import Progressbar from './Progressbar.vue'
import Gangwar from './Gangwar.vue'
import Paintball from './Paintball.vue'
import Infocard from './Infocard.vue'
import AntiAFK from './AntiAFK'
import Nutrition from './Nutrition'
import Fishing from './Fishing'
import PlayerInfo from './PlayerInfo.vue'

export default {
    name      : 'Hud',
    extends   : BaseComponent,
    components: {
        PlayerPanel,
        VehiclePanel,
        Crosshair,
        Smartphone,
        XMenu,
        NMenu,
        IdCard,
        Licenses,
        KeyInteraction,
        Computer,
        Laptop,
        Ipad,
        NativeMenu,
        GlobalNotification,
        PlayerNotification,
        Progressbar,
        Infocard,
        Gangwar,
        Paintball,
        PlayerInfo,
        AntiAFK,
        Nutrition,
        Fishing,
    },
    data () {
        return {
            visible: false,
            windows: [],
        }
    },
    methods: {
        addWindow   : function (window, data = null) {
            this.windows.push({ name: window, data: data })
        },
        removeWindow: function (window, dataFunction = null) {
            for (var i = this.windows.length - 1; i >= 0; i--) {
                if (this.windows[i].name === window) {
                    if (dataFunction != null) {
                        if (!dataFunction(window.data)) continue
                    }
                    this.windows.splice(i, 1)
                    return
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.center-right {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translate(0, -50%);
    right: 1vw;
}

.bottom {
    z-index: 1;
    position: absolute;
    display: flex;
    align-items: flex-end;

    &.right {
        bottom: 0;
        right: 0; //1vw;
    }

    .smartphone {
        margin-left: 1vw;
    }
    
}

.top.left {
    position: static;
}

.bottom.left {
    bottom: 0;
    left: 0;
}

.top {
    z-index: 1;
    position: absolute;
    top: 7vh;

    &.right {
        right: 1vw;
    }
}

.top-center {
    position: absolute;
    z-index: 1;
    top: 7vw;
    left: 50%;
    transform: translateX(-50%);
}

.bottom-center {
    position: absolute;
    z-index: 1;
    bottom: 7vw;
    left: 50%;
    transform: translateX(-50%);
}
</style>
