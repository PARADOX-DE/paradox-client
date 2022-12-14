<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button @click="prev()">
                    <v-ons-icon icon="md-chevron-left"></v-ons-icon>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Wallpaper
            </div>

            <div class="right" style="margin-left: -1vh;">
                <v-ons-toolbar-button @click="next()">
                    <v-ons-icon icon="md-chevron-right"></v-ons-icon>
                </v-ons-toolbar-button>
            </div>
        </v-ons-toolbar>

        <v-ons-carousel fullscreen swipeable auto-scroll overscrollable id="carousel">
            <v-ons-carousel-item
                v-for="wallpaper in wallpapers"
                :key="wallpaper.id"
                :style="{ 'background-image': 'url(' + backgroundImage(wallpaper.file) + ')' }"
                style="background-position:center center; background-size:cover;"
            >
                <div style="text-align: center; font-size: 1.9821605550049555vh; margin-top: 1.9821605550049555vh; color: #fff;">
                    <span>{{ wallpaper.name }}</span>
                </div>

                <v-ons-fab
                    modifier="mini"
                    position="bottom right"
                    @click="saveWallpaper(wallpaper.id)"
                >
                    <v-ons-icon icon="md-floppy"></v-ons-icon>
                </v-ons-fab>
            </v-ons-carousel-item>
        </v-ons-carousel>

        <v-ons-fab modifier="mini" position="bottom left" @click="pageBack">
            <v-ons-icon icon="md-arrow-left"></v-ons-icon>
        </v-ons-fab>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'SettingsEditWallpaperApp',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            wallpapers: [],

            selectedWallpaper: null,
            selectedFile     : '',
        }
    },

    methods: {
        responseWallpaperList (wallpapers) {
            this.wallpapers = JSON.parse(wallpapers)
        },

        prev () {
            let carousel = document.getElementById('carousel')
            carousel.prev()
        },

        next () {
            let carousel = document.getElementById('carousel')
            carousel.next()
        },

        saveWallpaper (id) {
            this.triggerServer('saveWallpaper', id)

            this.triggerServer('requestPhoneWallpaper')

            this.pageStack.pop()
        },

        pageBack () {
            this.pageStack.pop()
        },

        backgroundImage (file) {
            return require('@/assets/smartphone/wallpaper/' + file)
        },
    },

    mounted () {
        this.triggerServer('requestWallpaperList')
    },
}
</script>
