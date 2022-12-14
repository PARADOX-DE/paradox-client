<template>
    <v-ons-page>
        <div class="desktop">
            <div class="apps">
                <div class="app pointerClass" v-for="app in apps" :key="app.id" v-on:click="openApp(app)">
                    <div class="app-image-holder">
                        <img v-bind:src="getImageLoader(app.icon)" :alt="app.name" />
                    </div>

                    <p>{{ app.name }}</p>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../BaseApp'
import PoliceAktenSearchApp from './police/akten/PoliceAktenSearchApp'
import MarketplaceApp from './marketplace/marketplaceApp'
import FahrzeugUebersichtApp from './vehicleoverview/vehicleOverviewApp'
import KennzeichenUebersichtApp from './plate/plateOverviewApp'
import VehicleClawUebersichtApp from './claw/clawOverviewApp'
import VehicleTaxApp from './vehicletax/VehicleTaxApp'
import ServiceOverviewApp from './servicelist/ServiceOverviewApp'
import VehicleImpoundApp from './vehicleimpound/VehicleImpoundApp'
import KFZRentApp from './kfzrent/KFZRentApp'
import HouseApp from './house/HouseApp'
import FraktionListApp from './fraktion/FraktionListApp'
import EmailApp from './email/EmailApp'
import ExportApp from './export/ExportApp'
import BusinessDetailApp from './businessdetail/BusinessDetailApp'
import StreifenApp from './streifen/StreifenApp'

export default {
    name: 'DesktopApp',

    extends: BaseApp,

    data () {
        return {
            apps: [],
        }
    },
    methods: {
        responseComputerApps (apps) {
            this.apps = JSON.parse(apps)
        },
        openApp (app) {
            switch (app.appName) {
                default:
                    break
                case 'PoliceAktenSearchApp':
                    this.pageStack.push(PoliceAktenSearchApp)
                    break
                case 'MarketplaceApp':
                    this.pageStack.push(MarketplaceApp)
                    break
                case 'FahrzeugUebersichtApp':
                    this.pageStack.push(FahrzeugUebersichtApp)
                    break
                case 'KennzeichenUebersichtApp':
                    this.pageStack.push(KennzeichenUebersichtApp)
                    break
                case 'VehicleClawUebersichtApp':
                    this.pageStack.push(VehicleClawUebersichtApp)
                    break
                case 'VehicleTaxApp':
                    this.pageStack.push(VehicleTaxApp)
                    break
                case 'ServiceOverviewApp':
                    this.pageStack.push(ServiceOverviewApp)
                    break
                case 'VehicleImpoundApp':
                    this.pageStack.push(VehicleImpoundApp)
                    break
                case 'KFZRentApp':
                    this.pageStack.push(KFZRentApp)
                    break
                case 'HouseApp':
                    this.pageStack.push(HouseApp)
                    break
                case 'FraktionListApp':
                    this.pageStack.push(FraktionListApp)
                    break
                case 'EmailApp':
                    this.pageStack.push(EmailApp)
                    break
                case 'ExportApp':
                    this.pageStack.push(ExportApp)
                    break
                case 'BusinessDetailApp':
                    this.pageStack.push(BusinessDetailApp)
                    break
                case 'StreifenApp':
                    this.pageStack.push(StreifenApp)
                    break
            }
        },
        getImageLoader (image) {
            if (!image) {
                return
            }

            return require('@/assets/computer_apps/' + image)
        },
    },
    mounted () {
        this.triggerServer('requestComputerApps')
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
    grid-template-columns: repeat(auto-fill, minmax(10vh, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(11vh, 1fr));
    //grid-template-rows: max-content;
    grid-gap: 3vh;

    .app {
        //transition: background-color 0.2s ease-in, outline 0.1s;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: 500ms all;

        &:hover {
            transition: 500ms all;
            transform: scale(1.05);
        }

        img {
            width: 5em;
            height: auto;
        }

        p {
            font-size: 0.65em;
            color: white;
            text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2), 0px -5px 35px rgba(255, 255, 255, 0.3);
        }
    }
}

.desktop {
    display: flex;
    flex-direction: column;
    height: 100%;
    //background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
    background-color: black;
    background: rgba(35, 35, 35, 1) url('https://www.gvmp.de/upload/icon_w.png') no-repeat center center;
    background-size: 10%;

    .apps {
        flex-shrink: 1;
        flex-grow: 1;
        overflow-y: auto;
    }

    .bar {
        background-color: rgba(1, 1, 1, .5);
        padding: 0.2em;
        font-size: 0.8em;

        div {
            color: #fff;
        }

    }

    .app {
        .app-image-holder {
            background-color: #343434;
            padding: 1vh !important;
            height: 10vh;
            width: 10vh;
            border-radius: 5px;

            img {
                height: 8vh;
                width: 8vh;
            }
        }

        p {
            margin-top: 1vh;
        }
    }
}

</style>

<!-- components.Hud.visible = true -->
<!-- components.Computer.show("DesktopApp", '{"apps": [{"id": "PoliceApp", "name": "Polizei App", "icon": "https://image.flaticon.com/icons/svg/858/858320.svg"}]}') -->
<!-- components.DesktopApp.responseComputerApps('[{"id": "ServiceListApp", "name": "ServiceListApp", "icon": "https://image.flaticon.com/icons/svg/771/771618.svg"}]') -->
<!-- [{"id":1,"appName":"KFZRentApp","name":"KFZ-Vermietung","icon":"../../assets/PoliceDesktop.svg"}] -->