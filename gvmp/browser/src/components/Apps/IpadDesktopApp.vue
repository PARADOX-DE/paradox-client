<template>
    <v-ons-page>
        <div class="desktop">
            <div class="apps">
                <div class="app" v-for="app in apps" :key="app.id" v-on:click="openApp(app)">
                    <img v-bind:src="getImageLoader(app.icon)" width="30px" />
                    <p>{{ app.name }}</p>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../BaseApp'
import SupportOverviewApp from './support/ticket/SupportOverviewApp'
import SupportVehicleApp from './support/vehicles/SupportVehicleApp'

export default {
    name: 'IpadDesktopApp',

    extends: BaseApp,

    data () {
        return {
            apps: [],
        }
    },
    methods: {
        responseIpadApps (apps) {
            this.apps = JSON.parse(apps)
        },
        openApp (app) {
            switch (app.appName) {
                case 'SupportOverviewApp':
                    this.pageStack.push(SupportOverviewApp)
                    break
                case 'SupportVehicleApp':
                    this.pageStack.push(SupportVehicleApp)
                    break
                // case 'Browser':
                //     this.pageStack.push(Browser)
                //     break
            }
        },
        getImageLoader (image) {
            return require('@/assets/computer_apps/' + image)
        },
    },
    mounted () {
        this.triggerServer('requestIpadApp')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/shadow";
@import "../../../stylesheets/components/color";

.apps {
    display: grid;
    padding: 2vh;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-template-rows: max-content;
    grid-gap: 2vh;

    .app {
        transition: background-color 0.2s ease-in, outline 0.1s;
        display: flex;
        flex-direction: column;
        align-items: center;
        outline: 0px solid rgba(3, 166, 255, 0.9);

        &:hover {
            background-color: rgba(3, 166, 255, 0.3);
            outline: 2px solid rgba(3, 166, 255, 0.9);
        }

        img {
            width: 70%;
            height: auto;
        }

        p {
            font-size: 0.8vw;
            color: white;
            text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 35px rgba(255, 255, 255, 0.3);
        }

    }
}

.desktop {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: black;
    background: rgba(35, 35, 35, 1) url('https://www.gvmp.de/upload/icon_w.png') no-repeat center center;
    background-size: 10%;

    .apps {
        flex-shrink: 1;
        flex-grow: 1;
        overflow-y: auto;
    }

    .bar {
        background-color: rgba(1, 1, 1, .8);

        div {
            color: #fff;
        }

    }
}
</style>

<!-- components.Hud.visible = true -->
<!-- components.Computer.show("DesktopApp", '{"apps": [{"id": "PoliceApp", "name": "Polizei App", "icon": "https://image.flaticon.com/icons/svg/858/858320.svg"}]}') -->
<!-- components.DesktopApp.responseComputerApps('[{"id": "ServiceListApp", "name": "ServiceListApp", "icon": "https://image.flaticon.com/icons/svg/771/771618.svg"}]') -->