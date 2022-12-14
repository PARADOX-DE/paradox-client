<template>
    <div class="gvmp-wrapper">
        <div class="gvmp-bottom" style="position: absolute; bottom: 0; right: 0; z-index: 9999">
            <div style="color: black; position: relative">
                <div
                    class="gvmp-bg-black gvmp-rounded gvmp-p-1"
                    style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
                >
                    <i class="fas fa-mouse gvmp-mr-1"></i> (Rechtsklick halten & bewegen): Kamera bewegen
                </div>
            </div>
        </div>

        <div class="gvmp-left">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">Kleiderschrank</h3>

                <div>
                    <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-mr-1" @click="altkleider">
                        <i class="fas fa-shopping-bag fa-fw"></i> Altkleider
                    </button>

                    <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-mr-1" @click="outfits">
                        <i class="fas fa-tshirt fa-fw"></i> Outfits
                    </button>

                    <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-red" @click="dismissLocal">
                        <i class="fas fa-times fa-fw"></i>
                    </button>
                </div>
            </div>

            <hr class="gvmp-hr gvmp-my-3">

            <div
                v-if="currentSlot !== null"
                class="gvmp-d-flex gvmp-align-items-center gvmp-mb-3"
            >
                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-grow gvmp-mr-2" @click="unselectSlot">
                    <i class="fas fa-chevron-left fa-fw"></i>
                </button>

                <span class="gvmp-h5">{{ currentSlot.Name }}</span>
            </div>

            <ul
                style="height: 80vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentSlot === null"
            >
                <li v-for="(slot, idx) in slots" :key="slot.Id" ref="slots">
                    <button
                        type="button"
                        class="gvmp-p-3 gvmp-btn gvmp-mb-2 gvmp-btn-block gvmp-text-left gvmp-d-flex gvmp-align-items-center"
                        :class="{active: idx === selectedIdx}"
                        @click="selectSlot(slot)"
                        @mouseenter="selectedIdx = -1"
                    >
                        <img
                            :src="getImagePath(getSlotIcon(slot.Id))"
                            :alt="slot.Name"
                            class="gvmp-mr-3"
                            style="height: 32px; width: 32px"
                        >

                        {{ slot.Name }}
                    </button>
                </li>

                <li
                    v-if="loading"
                    class="gvmp-p-3 gvmp-bg-black gvmp-rounded"
                >
                    <i class="fas fa-spinner fa-spin fa-fw gvmp-mr-1" style="display: inline-block !important;"></i>
                    Lädt...
                </li>

                <li
                    v-if="(!slots || (slots && slots.length === 0)) && !loading"
                    class="gvmp-p-3 gvmp-bg-red gvmp-rounded"
                >
                    Keine Kleidung verfügbar.
                </li>
            </ul>

            <ul
                style="height: 70vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentSlot !== null"
            >
                <li v-for="(cloth, idx) in clothes" :key="cloth.Id" ref="clothes">
                    <button
                        type="button"
                        class="gvmp-p-3 gvmp-btn gvmp-mb-2 gvmp-btn-block gvmp-text-left gvmp-d-flex gvmp-align-items-center"
                        :class="{active: idx === selectedIdx}"
                        @mouseenter="selectedIdx = -1"
                        @click="dress(cloth)"
                    >
                        {{ cloth.Name }}
                    </button>
                </li>

                <li
                    v-if="loading"
                    class="gvmp-p-3 gvmp-bg-black gvmp-rounded"
                >
                    <i class="fas fa-spinner fa-spin fa-fw gvmp-mr-1" style="display: inline-block !important;"></i>
                    Lädt...
                </li>

                <li
                    v-if="(!clothes || (clothes && clothes.length === 0)) && !loading"
                    class="gvmp-p-3 gvmp-bg-black gvmp-rounded"
                >
                    Keine Kleidung verfügbar.
                </li>
            </ul>
        </div>

        <div class="gvmp-right">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">Ankleide</h3>
            </div>

            <hr class="gvmp-hr gvmp-my-3">

            <ul style="height: 75vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden">
                <li v-for="(data, slot) in wearing" :key="slot" ref="wearItems">
                    <div class="gvmp-p-3 gvmp-mb-2 gvmp-btn gvmp-btn-block">
                        <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                            <div>
                                <img
                                    :src="getImagePath(getSlotIcon(slot))"
                                    :alt="slot"
                                    class="gvmp-mr-3"
                                    style="height: 24px; width: 24px"
                                >

                                {{ data.Name }}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <button class="gvmp-btn gvmp-mt-3 gvmp-btn-block" @click="dismissLocal">
                Verlassen
            </button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Wardrobe',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            wardrobe: JSON.parse(this.data),

            slots      : null,
            currentSlot: null,

            clothes: null,

            wearing: {},

            loading: false,

            selectedIdx            : 0,
            lastSelectedIdxSlot    : 0,
            lastSelectedIdxCategory: 0,

            zoomedX: false,
            zoomedY: false,

            slotIconMapping: {
                // Clothes
                0 : '',
                1 : 'masks.png',        // Maske
                2 : '',
                3 : 'body.png',         // Körper
                4 : 'legs.png',         // Hose
                5 : 'backpack.png',     // Rucksack
                6 : 'shoes.png',        // Schuhe
                7 : 'accessories.png',  // Accessories
                8 : 'undershirts.png',  // Unterbekleidung
                9 : '',
                10: '',                 // Markierung
                11: 'tops.png',         // Oberbekleidung

                // Props
                'p-0': 'hat.png',       // Hut
                'p-1': 'glasses.png',   // Brille
                'p-2': 'ears.png',      // Ohr
                'p-3': '',
                'p-4': '',
                'p-5': '',
                'p-6': 'wrist.png',     // Uhr
                'p-7': 'wrist.png',     // Arm
            },

            leftRightSlots: ['p-2', 'p-6', 'p-7'],

            defaultSlotIcon: 'no-icon.svg',

            currentMousePositionX: null,
        }
    },

    mounted () {
        document.addEventListener('keydown', this.onKeyDown)
        document.addEventListener('mousedown', this.onMouseDown)
        document.addEventListener('mouseup', this.onMouseUp)
    },

    destroyed () {
        document.removeEventListener('keydown', this.onKeyDown)
        document.removeEventListener('mousedown', this.onMouseDown)
        document.removeEventListener('mouseup', this.onMouseUp)
    },

    created () {
        if (this.wardrobe.hasOwnProperty('slots')) {
            this.slots = this.wardrobe.slots
        }

        if (this.wardrobe.hasOwnProperty('wearing')) {
            this.wearing = this.wardrobe.wearing
        }
    },

    methods: {
        /**
         * Select a given slot and request categories from remote server.
         *
         * @param slot
         */
        selectSlot (slot) {
            this.currentSlot = slot
            this.loading     = true

            this.triggerServer('wardrobeLoadClothes', slot.Id)
        },

        /**
         * Unselect the selected slot.
         */
        unselectSlot () {
            this.currentSlot = null
            this.categories  = null
            this.clothes     = null
            this.loading     = false

            // Also reset focused slot.
            if (this.zoomedX || this.zoomedY) {
                this.trigger('zoomOut', JSON.stringify([]))

                this.zoomedX = false
                this.zoomedY = false
            }
        },

        /**
         * Callback if the user has selected a category.
         *
         * @param clothesJson
         */
        responseWardrobeClothes (clothesJson) {
            // If the player has been left the category before it has been loaded, simply do nothing.
            if (this.currentCategory === null) return

            this.clothes = JSON.parse(clothesJson.replace(/(\r\n|\n|\r)/gm, ''))
            this.loading = false
        },

        /**
         * Tell the server to dress a given cloth.
         * Dressed clothes are saved and displayed.
         *
         * @param cloth
         */
        dress (cloth) {
            if (this.wearing.hasOwnProperty(this.currentSlot.Id)) {
                this.wearing[this.currentSlot.Id] = cloth
            } else {
                this.$set(this.wearing, this.currentSlot.Id, cloth)
            }

            this.triggerServer('wardrobeDress', cloth.Id, this.currentSlot.Id)
        },

        /**
         * Close the wardrobe.
         */
        dismissLocal () {
            this.triggerServer('wardrobeSave')

            this.dismiss()
        },

        /**
         * Get slot icon by slot_id.
         *
         * @param slot_id
         */
        getSlotIcon (slot_id) {
            if (this.slotIconMapping.hasOwnProperty(slot_id) && this.slotIconMapping[slot_id] !== '') {
                return this.slotIconMapping[slot_id]
            }

            return this.defaultSlotIcon
        },

        /**
         * Get image path.
         *
         * @param img
         */
        getImagePath (img) {
            return 'img/clothing/' + img
        },

        /**
         * Make sure that the selected item is in view if arrow keys are used.
         */
        fixScrolling (alignToTop = false) {
            if (this.selectedIdx === -1) return

            let elem = null

            if (this.currentSlot === null) {
                elem = this.$refs.slots[this.selectedIdx]
            }

            if (this.currentSlot !== null) {
                elem = this.$refs.clothes[this.selectedIdx]
            }

            if (!elem) return

            elem.scrollIntoView(alignToTop)
        },

        /**
         * Arrow down handler.
         */
        onArrowDown (evt) {
            evt.preventDefault()

            let length = this.slots.length

            if (this.currentSlot !== null) length = this.clothes.length

            if (this.selectedIdx < (length - 1)) {
                this.selectedIdx = this.selectedIdx + 1
            } else {
                this.selectedIdx = 0
            }

            this.fixScrolling()
        },

        /**
         * Arrow up handler.
         */
        onArrowUp (evt) {
            evt.preventDefault()

            let length = this.slots.length

            if (this.currentSlot !== null) length = this.clothes.length

            if (this.selectedIdx === 0) {
                this.selectedIdx = (length - 1)

                this.fixScrolling()

                return
            }

            if (this.selectedIdx === -1) this.selectedIdx = 0
            if (this.selectedIdx > 0) this.selectedIdx = this.selectedIdx - 1

            this.fixScrolling()
        },

        /**
         * Enter will select the active slot, category or but
         * the selection to the wearing list.
         */
        onEnter () {
            // -1 = nothing selected
            if (this.selectedIdx === -1) return

            // If no slot is selected, it must be a slot selection.
            if (this.currentSlot === null) {
                this.selectSlot(this.slots[this.selectedIdx])
                this.lastSelectedIdxSlot = this.selectedIdx
                this.selectedIdx         = 0

                return
            }

            // Slot and Category are selected. So add cloth to cart.
            this.dress(this.clothes[this.selectedIdx])
            this.lastSelectedIdx = this.selectedIdx
        },

        /**
         * Backspace will go back a category or slot.
         */
        onBackspace () {
            if (this.currentSlot !== null) {
                this.unselectSlot()
                this.selectedIdx = this.lastSelectedIdxSlot
                this.fixScrolling()
            }
        },

        /**
         * Escape will close the shop.
         */
        onEscape () {
            this.dismissLocal()
        },

        /**
         * X will Zoom to the selected position.
         */
        onX () {
            if (this.currentSlot === null) return

            if (this.zoomedX) {
                this.trigger('zoomOut', JSON.stringify([]))

                this.zoomedY = false
                this.zoomedX = false

                return
            }

            this.zoomedX = true
            this.zoomedY = false

            this.trigger('zoomToSlot', JSON.stringify({
                slot: this.currentSlot.Id,
                isY : false,
            }))
        },

        /**
         * Sometimes you need a left right zoom position.
         * Right can be zoomed with Y key.
         *
         * But only for wrist, watch & ear
         */
        onY () {
            let allowed = this.leftRightSlots

            if (this.currentSlot === null) return

            if (!allowed.includes(this.currentSlot.Id)) return

            // Already zoomed on Y so zoom out.
            if (this.zoomedY) {
                this.trigger('zoomOut', JSON.stringify([]))

                this.zoomedY = false
                this.zoomedX = false

                return
            }

            this.zoomedY = true
            this.zoomedX = false

            this.trigger('zoomToSlot', JSON.stringify({
                slot: this.currentSlot.Id,
                isY : true,
            }))
        },

        /**
         * Add some handler for some keys.
         * Player love to use their keyboard.
         *
         * @param evt
         */
        onKeyDown (evt) {
            switch (evt.key) {
                case 'ArrowDown':
                    this.onArrowDown(evt)

                    break
                case 'ArrowUp':
                    this.onArrowUp(evt)

                    break
                case 'Backspace':
                    this.onBackspace(evt)

                    break
                case 'Enter':
                    this.onEnter(evt)

                    break
                case 'Escape':
                    this.onEscape(evt)

                    break
                case 'y':
                case 'Y':
                    this.onY()

                    break
                case 'x':
                case 'X':
                    this.onX()

                    break
            }
        },

        /**
         * By listen for movement offset on x-axis.
         *
         * @param evt
         */
        onMouseMove (evt) {
            let x            = evt.clientX,
                start        = this.currentMousePositionX,
                offset       = ((start - x) * -1),
                normalOffset = (offset / 5) // makes everything a little bit smoother!

            if (x < 0) return

            if (normalOffset > 90) return

            if (normalOffset < -90) return

            this.trigger('moveCam', JSON.stringify({
                offset: Math.ceil(normalOffset),
                slot  : this.currentSlot !== null ? this.currentSlot.Id : null,
                isX   : this.zoomedX,
                isY   : this.zoomedY,
            }))
        },

        /**
         * If the right button is pressed and hold,
         * we listen to some movement.
         *
         * @param evt
         */
        onMouseDown (evt) {
            switch (evt.button) {
                case 2: // right-click
                    document.addEventListener('mousemove', this.onMouseMove)

                    this.currentMousePositionX = evt.clientX

                    break
            }
        },

        /**
         * If the right button is released we don't listen to movement anymore.
         */
        onMouseUp () {
            document.removeEventListener('mousemove', this.onMouseMove)

            this.currentMousePositionX = null
        },

        /**
         * Request outfits menu from remote server.
         */
        outfits () {
            this.triggerServer('wardrobeOutfits')

            this.dismissLocal()
        },

        /**
         * Request altkleider menu from server.
         */
        altkleider () {
            this.triggerServer('wardrobeAltkleider')

            this.dismissLocal()
        },
    },
}
</script>