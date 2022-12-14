<template>
    <div class="gvmp-wrapper">
        <wheel
            :items="wheelItems"
            :visible="wheelOpen"
            click-to-select
            label-field="name"
            image-path="@/assets/nmenu/"
            @selected="onWheelSelection"
            :wheel-description="wheelDescription"
            :blacklist="[1]"
        ></wheel>

        <div class="gvmp-right" v-if="wheelOpen === false">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">Animationen</h3>
            </div>

            <hr class="gvmp-hr gvmp-my-3">

            <p class="gvmp-mb-3">
                Welche Animation soll als Favorit gespeichert werden?
            </p>

            <div id="animation-favorites-list-container">
                <input
                    placeholder="Suchen..."
                    class="fuzzy-search gvmp-input gvmp-rounded gvmp-mb-2"
                    id="animationFavoritesListSearch"
                >

                <ul
                    class="animation-favorites-list"
                    style="max-height: 50vh; margin: 0 -1rem 5rem -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                >
                    <li
                        class="gvmp-p-1 gvmp-mb-2 gvmp-btn gvmp-btn-block gvmp-text-left"
                        v-for="(animation, idx) in animations"
                        :key="idx"
                        @click="selectAnimation(animation)"
                    >
                        <span class="name">{{ animation.Name }}</span>
                    </li>
                </ul>
            </div>

            <button class="gvmp-btn gvmp-mt-3 gvmp-btn-block" @click="dismissLocal">
                Abbrechen
            </button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import Wheel from '../hud/Wheel'

const List = require('list.js')

export default {
    name: 'AnimationWheelFavoritesList',

    extends: BaseWindow,

    props: {
        data: String,
    },

    components: {
        Wheel,
    },

    data () {
        return {
            animations: JSON.parse(this.data).animations,

            selectedAnimation: null,

            listJsOptions: {
                valueNames: [
                    'name',
                ],

                listClass: 'animation-favorites-list',

                item:
                    '<li class="gvmp-p-1 gvmp-mb-2 gvmp-btn gvmp-btn-block gvmp-text-left">' +
                    '<span class="name"></span>' +
                    '</li>',
            },

            listJsInstance: null,

            playerAnimations: [],
            wheelOpen       : false,
        }
    },

    destroyed () {
        document.removeEventListener('keydown', this.onKeyDown)
    },

    mounted () {
        document.addEventListener('keydown', this.onKeyDown)

        let _this = this

        this.$nextTick(() => {
            // Focus input field
            document.getElementById('animationFavoritesListSearch').focus()

            // Create list
            _this.listJsInstance = new List(
                document.getElementById('animation-favorites-list-container'),
                _this.listJsOptions,
            )
        })
    },

    computed: {
        wheelDescription () {
            if (this.selectedAnimation === null) return ''

            return 'Auf welchen Slot soll "' + this.selectedAnimation.Name + '" gelegt werden?'
        },

        wheelItems () {
            let list  = [],
                _this = this

            /*
                Preload images and add a description if
                the slot can be swapped.
            */
            this.playerAnimations.map(function (v) {
                let item = {
                    name: v.name,
                    icon: _this.getImageLoader(v.icon),
                    slot: v.slot,
                }

                // Slot 0 and 1 can not be swapped.
                if (v.slot !== 0 && v.slot !== 1) {
                    item.description = 'Austauschen'
                }

                if (v.slot === 0) {
                    item.name = 'Abbrechen'
                }

                list.push(item)

                return v
            })

            return list
        },
    },

    methods: {
        /**
         * Handler if the user has selected an animation item from
         * the searchable list.
         *
         * @param animation
         */
        selectAnimation (animation) {
            this.selectedAnimation = animation

            this.showWheel()
        },

        /**
         * Show the wheel by the getAnimationShortcuts client event.
         */
        showWheel () {
            this.trigger('getAnimationShortcuts', '[]')
        },

        /**
         * Callback handler after the getAnimationShortcuts client event has been called.
         *
         * @param
         */
        setDataItemsAnimation: function (playerAnimations) {
            this.playerAnimations = JSON.parse(playerAnimations)

            if (this.playerAnimations.length === 0) return

            this.wheelOpen = true
        },

        /**
         * Handler when the user has selected a slot via the wheel.
         *
         * @param playerAnimationItem
         */
        onWheelSelection (playerAnimationItem) {
            if (this.selectedAnimation === null) return

            if (playerAnimationItem.slot === 0 || playerAnimationItem.slot === 1) {
                this.wheelOpen = false

                return
            }

            this.wheelOpen = false

            this.triggerServer('AnimationShortcutSetSlot', playerAnimationItem.slot, this.selectedAnimation.Id)

            this.selectedAnimation = null
            this.listJsInstance.reset()
        },

        /**
         * Load images within the path below.
         *
         * @param image
         */
        getImageLoader (image) {
            return require('@/assets/nmenu/' + image)
        },

        /**
         * Add some handler for some keys.
         * Player love to use their keyboard.
         *
         * @param evt
         */
        onKeyDown (evt) {
            switch (evt.key) {
                case 'Escape':
                    this.onEscape(evt)

                    break
            }
        },

        /**
         * Escape will close the window.
         */
        onEscape () {
            this.dismissLocal()
        },

        /**
         * Close the window.
         */
        dismissLocal () {
            this.dismiss()
        },
    },
}
</script>