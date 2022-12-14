<template>
    <div class="phone" :style="{display: visible}">
        <div class="device-s10">
            <div class="overflow">
                <div class="shadow"></div>
            </div>

            <div class="camera" v-if="false">
                <div class="linse"></div>
            </div>

            <div class="speaker"></div>

            <div class="power-button"></div>

            <div class="volume-button"></div>

            <div class="additional-button"></div>

            <div @click="homeButton()" class="home-button"></div>

            <div class="screen" :style="{display: visibleNormalScreen}">
                <component :is="appNormal" :data="dataNormal"></component>
            </div>

            <div class="screen" :style="{display: visiblePhoneScreen}">
                <component :is="appPhone" :data="dataPhone"></component>
            </div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'
import PhoneMainScreen from '../Apps/Smartphone/PhoneMainScreen'
import CallManageApp from '../Apps/Smartphone/CallManageApp'

export default {
    name: 'Smartphone',

    extends: BaseComponent,

    components: {
        PhoneMainScreen,
        CallManageApp,
    },

    data () {
        return {
            appNormal          : '',
            dataNormal         : {},
            appPhone           : '',
            dataPhone          : {},
            isWidescreen       : false,
            time               : '',
            visible            : 'none',
            visibleNormalScreen: 'none',
            visiblePhoneScreen : 'none',
            beforeVisible      : false,
        }
    },

    methods: {
        show (app, data = null) {
            if (this.visibleNormalScreen === 'none' && this.visiblePhoneScreen === 'none') {
                if (app === 'CallManageApp') {
                    this.visiblePhoneScreen = 'block'
                    this.dataPhone          = data
                    this.appPhone           = app
                } else {
                    this.visibleNormalScreen = 'block'
                    this.dataNormal          = data
                    this.appNormal           = app
                    this.visible             = 'block'
                }
            } else {
                if (app === 'CallManageApp') {
                    if (this.visible === 'block') {
                        this.beforeVisible = true
                    }

                    this.dataPhone           = data
                    this.appPhone            = app
                    this.visibleNormalScreen = 'none'
                    this.visiblePhoneScreen  = 'block'
                } else {
                    this.appNormal  = app
                    this.dataNormal = data
                    this.visible    = 'block'
                }
            }
        },

        invisible () {
            if (this.visiblePhoneScreen !== 'block') {
                this.beforeVisible = false
            }

            this.visible = 'none'
        },

        change () {
            if (this.visiblePhoneScreen === 'block' || this.visible === 'none') {
                this.visiblePhoneScreen = 'none'
                this.appPhone           = ''
                this.dataPhone          = {}

                if (Boolean(this.beforeVisible) === false || this.visible === 'none') {
                    this.visible = 'none'
                    this.trigger('cleanSmartphone', [])
                } else {
                    this.visibleNormalScreen = 'block'
                    this.trigger('activateCursor', [])
                    this.beforeVisible = false
                }
            } else if (this.visibleNormalScreen === 'block') {
                this.appPhone      = ''
                this.dataPhone     = {}
                this.beforeVisible = false
            }
        },

        refreshSmartphone () {
            this.visible             = 'none'
            this.visiblePhoneScreen  = 'none'
            this.visibleNormalScreen = 'none'
        },

        showCallScreen () {
            this.visiblePhoneScreen  = 'block'
            this.visibleNormalScreen = 'none'
        },

        homeButton () {
            if (this.visibleNormalScreen === 'block' && this.visible === 'block') {
                this.trigger('getHomeScreen', [])
            } else if (this.visiblePhoneScreen === 'block' && this.visible === 'block') {
                this.trigger('getHomeScreenCall', [])

                this.visiblePhoneScreen  = 'none'
                this.visibleNormalScreen = 'block'
            }
        },

        onKeyUp: function (event) {
            if (event.key === 'n' && this.visiblePhoneScreen === 'block' && this.visibleNormalScreen === 'none' && this.visible === 'block') {
                this.trigger('callDeclined', [])
            } else if (event.key === 'j' && this.visiblePhoneScreen === 'block' && this.visibleNormalScreen === 'none' && this.visible === 'block') {
                this.trigger('callAccepted', [])
            } else if (event.key === 'm' && this.visiblePhoneScreen === 'block' && this.visibleNormalScreen === 'none' && this.visible === 'block') {
                this.trigger('micmute', [])
            } else if (event.key === 'ArrowUp') {
                this.homeButton()
            }
        },
    },

    mounted () {
        window.addEventListener('keyup', this.onKeyUp)
    },

    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>

<style lang="scss" scoped>
.smartphone {
    .page {
        height: inherit;
        width: inherit;
        position: relative;
    }

    .md-screen {
        z-index: 1;
        overflow-y: auto;
    }
}

.device-s10 {
    width: 25vh;
    height: 50vh;
    background-color: #000;
    border-radius: 2vh;

    margin-right: 1vh;
    margin-bottom: 1vh;
    border-color: #a9a9a9;
    border-style: solid;
    border-width: 0.27vh;
}

.device-s10 .screen {
    width: 24vh;
    margin-left: 0.25vh;
    position: relative;
    height: 47.75vh;
    margin-top: 0.75vh;
    z-index: 3;
    //background: white;
    overflow: hidden;
    border-radius: 1.3125vh;
    box-shadow: none;
}

.device-s10 .overflow {
    width: 25vh;
    height: 50vh;
    position: absolute;
    border-radius: 2vh;
    overflow: hidden;
}

.device-s10 .overflow .shadow {
    //box-shadow: inset 0 0 1vh 0 white, inset 0 0 1vh 0 rgba(255, 255, 255, 0.01), 0 0 1vh 0 white, 0 0 0.25vh 0 rgba(255, 255, 255, 0.05);
    height: 50vh;
    position: absolute;
    content: '';
    width: 23.7vh;
    border-radius: 2vh;
    z-index: 5;
    left: 0.4vh;
    pointer-events: none;
}

.device-s10 .time {
    left: 1.5vh;
    position: absolute;
    top: 1.9vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}

.device-s10 .camera {
    height: 1.75vh;
    width: 1.75vh;
    margin-left: 21.5vh;
    position: absolute;
    margin-top: 1.8vh;
    background: #000;
    z-index: 10;
    border-radius: 100%;
}

.device-s10 .camera .linse {
    height: 0.75vh;
    width: 0.75vh;
    margin-left: 0.5vh;
    position: absolute;
    margin-top: 0.5vh;
    background: #303030;
    z-index: 10;
    border-radius: 100%;
}

.device-s10 .speaker {
    height: 0.4vh;
    width: 5vh;
    margin-left: 10vh;
    position: absolute;
    background: #303030;
    z-index: 1;
    border-bottom-left-radius: 1vh;
    border-bottom-right-radius: 1vh;
}

.device-s10 .home-button {
    height: 0.4vh;
    width: 5vh;
    margin-left: 10vh;
    position: absolute;
    top: 48vh;
    background: #fff;
    z-index: 20;
    border-radius: 1vh;
    border-color: #000;
    border-style: solid;
    border-width: 0.054vh;
}

.device-s10 .power-button {
    height: 4vh;
    width: 0.3vh;
    margin-left: 24.35vh;
    position: absolute;
    margin-top: 10vh;
    background: #303030;
    z-index: 20;
    border-top-right-radius: 1vh;
    border-bottom-right-radius: 1vh;
}

.device-s10 .volume-button {
    height: 8vh;
    width: 0.3vh;
    margin-left: -0.3vh;
    position: absolute;
    margin-top: 6vh;
    background: #303030;
    z-index: 20;
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
}

.device-s10 .additional-button {
    height: 4vh;
    width: 0.3vh;
    margin-left: -0.3vh;
    position: absolute;
    margin-top: 18vh;
    background: #303030;
    z-index: 20;
    border-top-left-radius: 1vh;
    border-bottom-left-radius: 1vh;
}
</style>