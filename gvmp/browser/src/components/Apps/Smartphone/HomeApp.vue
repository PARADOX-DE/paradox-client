<template>
    <v-ons-page>
        <div class="bgd" v-bind:style="{ 'background-image': 'url(' + backgroundImage(wallpaperFile) + ')' }">
            <p class="time">{{ time }}</p>
            <p v-if="flymode == false" class="fas fa-signal signal"></p>
            <p v-if="flymode == true" class="fas fa-plane flymode"></p>
            <p v-if="mute == true" class="fas fa-volume-off speaker"></p>
            <p v-if="anrufablehnen == true" class="fas fa-phone-slash phoneslash"></p>
            <div class="apps">
                <div class="app" v-for="app in apps" :key="app.id" v-on:click="selectApp(app)">
                    <img v-bind:src="imagePathFinder(app.icon)" class="imgFuchs" />
                    <p style="font-size: 1.2vh;" class="pFuchs">{{ app.name }}</p>
                </div>
            </div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'
import NewsApp from '../news/NewsApp'
import TeamApp from './Team/TeamApp'
import BusinessApp from './Business/BusinessApp'
import BankingApp from './Banking/BankingApp'
import TaxiApp from './Taxi/TaxiApp'
import GpsApp from './Gps/GpsApp'
import ContactsApp from './Contacts/ContactsApp'
import ProfileApp from './ProfileApp'
import FunkApp from './FunkApp'
import LifeInvaderApp from './LifeInvaderApp'
import MessengerApp from './Messenger/MessengerApp'
import TelefonApp from './Telefon/Telefon'
import SettingsApp from './Settings/SettingsApp'
import HitmanApp from '../hitman/HitmanApp'
import DarknetApp from '../darknet/DarknetApp'
import ServiceRequestApp from './Service/ServiceRequestApp'
import CalculatorApp from './CalculatorApp'

export default {
    name: 'HomeApp',

    extends: BaseApp,

    data () {
        return {
            apps         : [],
            wallpaperFile: 'park.jpg', //park.jpg
            call         : false,
            time         : '',
            flymode      : false,
            mute         : false,
            anrufablehnen: false,
            clock        : null,
        }
    },
    methods: {
        changefly () {
            if (this.flymode == true) {
                this.flymode = false
            } else if (this.flymode == false) {
                this.flymode = true
            }
        },
        changemute () {
            if (this.mute == true) {
                this.mute = false
            } else if (this.mute == false) {
                this.mute = true
            }
        },
        changeanrufablehnen () {
            if (this.anrufablehnen == true) {
                this.anrufablehnen = false
            } else if (this.anrufablehnen == false) {
                this.anrufablehnen = true
            }
        },
        imagePathFinder (url) {
            return 'img/' + url // 'img/' + url
        },
        responseApps (appsList) {
            this.apps = JSON.parse(appsList)
            //this.apps.push({id: 'CalculatorApp',name: 'Rechner',icon: 'calculator.png'})
        },
        responsePhoneWallpaper (wallpaper) {
            this.wallpaperFile = wallpaper
        },
        declineCall () {
            this.call = false
        },
        getHomeScreenCall () {
            this.call = true
        },
        changeclock () {
            this.time = new Date()
            this.time.setHours(this.time.getHours())
            if (this.time.getHours() < 10 && parseInt(this.time.getMinutes()) > 9) {
                this.time = '0' + this.time.getHours() + ':' + this.time.getMinutes()
            } else if (this.time.getHours() > 9 && this.time.getMinutes() < 10) {
                this.time = this.time.getHours() + ':0' + this.time.getMinutes()
            } else if (this.time.getHours() < 10 && this.time.getMinutes() < 10) {
                this.time = '0' + this.time.getHours() + ':0' + this.time.getMinutes()
            } else {
                this.time = this.time.getHours() + ':' + this.time.getMinutes()
            }
        },
        selectApp (app) {
            switch (app.id) {
                case 'NewsApp':
                    this.pageStack.push(NewsApp)
                    break
                case 'TeamApp':
                    this.pageStack.push(TeamApp)
                    break
                case 'BusinessApp':
                    this.pageStack.push(BusinessApp)
                    break
                case 'BankingApp':
                    this.pageStack.push(BankingApp)
                    break
                case 'TaxiApp':
                    this.pageStack.push(TaxiApp)
                    break
                case 'GpsApp':
                    this.pageStack.push(GpsApp)
                    break
                case 'ContactsApp':
                    this.pageStack.push(ContactsApp)
                    break
                case 'ProfileApp':
                    this.pageStack.push(ProfileApp)
                    break
                case 'FunkApp':
                    this.pageStack.push(FunkApp)
                    break
                case 'LifeInvaderApp':
                    this.pageStack.push(LifeInvaderApp)
                    break
                case 'MessengerApp':
                    this.pageStack.push(MessengerApp)
                    break
                case 'TelefonApp':
                    if (this.call == true) {
                        this.trigger('showCallScreen', [])
                    } else {
                        this.pageStack.push(TelefonApp)
                    }
                    break
                case 'SettingsApp':
                    this.pageStack.push(SettingsApp)
                    break
                case 'HitmanApp':
                    this.pageStack.push(HitmanApp)
                    break
                case 'DarknetApp':
                    this.pageStack.push(DarknetApp)
                    break
                case 'ServiceRequestApp':
                    this.pageStack.push(ServiceRequestApp)
                    break
                case 'CalculatorApp':
                    this.pageStack.push(CalculatorApp)
                    break
            }
        },
        backgroundImage (file) {
            return require('@/assets/smartphone/wallpaper/' + file)
        },
    },
    mounted () {
        this.clock = setInterval(this.changeclock, 1000)
        this.triggerServer('requestPhoneWallpaper')
        this.triggerServer('requestApps')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
.bgd {
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    height: 100%;
}

.apps {
    padding: 0.7vh;
    padding-top: 3vh;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .app {
        padding: 0.7vh;
        text-align: center;
        color: white;
    }
}

.time {
    left: 1.5vh;
    position: absolute;
    top: 0.9vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}

.signal {
    left: auto;
    right: 1.5vh;
    position: absolute;
    top: 1.2vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}

.flymode {
    left: auto;
    right: 1.5vh;
    position: absolute;
    top: 1.2vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}

.speaker {
    left: 17.5vh;
    position: absolute;
    top: 1.2vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}

.phoneslash {
    left: 17.5vh;
    position: absolute;
    top: 1.2vh;
    z-index: 4;
    font-size: 1.5vh;
    color: #fff;
}
</style>

<!--
components.Hud.visible = true
components.Smartphone.app = "PhoneMainScreen"
components.HomeApp.apps = [{"id": "NewsApp", "name": "News", "icon": "https://image.flaticon.com/icons/svg/744/744904.svg"}, {"id": "TeamApp", "name": "Team", "icon": "http://via.placeholder.com/50x50"}, {"id": "BusinessApp", "name": "Business", "icon": "http://via.placeholder.com/50x50"}, {"id": "TaxiApp", "name": "Taxi", "icon": "http://via.placeholder.com/50x50"}, {"id": "GpsApp", "name": "Gps", "icon": "http://via.placeholder.com/50x50"}, {"id": "ContactsApp", "name": "Contacts", "icon": "http://via.placeholder.com/50x50"}, {"id": "ProfileApp", "name": "Profil", "icon": "http://via.placeholder.com/50x50"}, {"id": "VehicleTracker", "name": "Fahrzeuge", "icon": "http://via.placeholder.com/50x50"}, {"id": "HouseApp", "name": "Haus", "icon": "http://via.placeholder.com/50x50"}]
-->