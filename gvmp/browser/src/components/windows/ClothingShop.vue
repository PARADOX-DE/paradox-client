<template>
    <div class="wrapper">
        <div class="bottom" style="position: absolute; bottom: 0; right: 0; z-index: 9999">
            <div style="color: black; position: relative">
                <div
                    class="bg-black gvmp-rounded gvmp-p-1"
                    style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
                >
                    <i class="fas fa-mouse gvmp-mr-1"></i> (Rechtsklick halten & bewegen): Kamera bewegen

                    <span
                        class="gvmp-ml-3"
                        v-if="currentSlot !== null"
                    >
                        <kbd class="gvmp-mr-1">X</kbd> Bereich
                        <span v-show="leftRightSlots.includes(currentSlot.Id)">(links)</span> ran-/raus zoomen
                    </span>

                    <span
                        class="gvmp-ml-3"
                        v-if="currentSlot !== null && leftRightSlots.includes(currentSlot.Id)"
                    >
                        <kbd class="gvmp-mr-1">Y</kbd> Bereich
                        <span v-show="leftRightSlots.includes(currentSlot.Id)">(rechts)</span> ran-/raus zoomen
                    </span>
                </div>
            </div>
        </div>

        <div class="left">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">{{ shop.name }}</h3>

                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-red" @click="dismissLocal">
                    <i class="fas fa-times fa-fw"></i>
                </button>
            </div>

            <hr class="gvmp-my-3">

            <div
                v-if="currentSlot !== null && currentCategory === null"
                class="gvmp-d-flex gvmp-align-items-center gvmp-mb-3"
            >
                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-grow gvmp-mr-2" @click="unselectSlot">
                    <i class="fas fa-chevron-left fa-fw"></i>
                </button>

                <span class="gvmp-h5">{{ currentSlot.Name }}</span>
            </div>

            <div
                v-else-if="currentSlot !== null && currentCategory !== null"
                class="gvmp-d-flex gvmp-align-items-center gvmp-mb-3"
            >
                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-grow gvmp-mr-2" @click="unselectCategory">
                    <i class="fas fa-chevron-left fa-fw"></i>
                </button>

                <span class="gvmp-h5" v-if="categories.length > 1">{{ currentCategory.Name }}</span>

                <span class="gvmp-h5" v-if="categories.length === 1">{{ currentSlot.Name }}</span>
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
                    class="gvmp-p-3 bg-black gvmp-rounded"
                >
                    <i class="fas fa-spinner fa-spin fa-fw gvmp-mr-1" style="display: inline-block !important;"></i>
                    Lädt...
                </li>

                <li
                    v-if="(!slots || (slots && slots.length === 0)) && !loading"
                    class="gvmp-p-3 bg-red gvmp-rounded"
                >
                    Keine Kleidung verfügbar.
                </li>
            </ul>

            <ul
                style="height: 70vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentSlot !== null && currentCategory === null"
            >
                <li v-for="(category, idx) in categories" :key="category.Id" ref="categories">
                    <button
                        type="button"
                        class="gvmp-p-3 gvmp-btn gvmp-mb-2 gvmp-btn-block gvmp-text-left gvmp-d-flex gvmp-align-items-center"
                        :class="{active: idx === selectedIdx}"
                        @click="selectCategory(category)"
                        @mouseenter="selectedIdx = -1"
                    >
                        {{ category.Name }}
                    </button>
                </li>

                <li
                    v-if="loading"
                    class="gvmp-p-3 bg-black gvmp-rounded"
                >
                    <i class="fas fa-spinner fa-spin fa-fw gvmp-mr-1" style="display: inline-block !important;"></i>
                    Lädt...
                </li>

                <li
                    v-if="(!categories || (categories && categories.length === 0)) && !loading"
                    class="gvmp-p-3 bg-red gvmp-rounded"
                >
                    Keine Kleidung verfügbar.
                </li>
            </ul>

            <ul
                style="height: 70vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentSlot !== null && currentCategory !== null"
            >
                <li v-for="(cloth, idx) in clothes" :key="cloth.Id" ref="clothes">
                    <div
                        class="gvmp-p-3 bg-black hoverable gvmp-rounded gvmp-mb-2 gvmp-text-left"
                        :class="{active: idx === selectedIdx}"
                        @mouseenter="selectedIdx = -1"
                        @click="dress(cloth)"
                    >
                        <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                            {{ cloth.Name }}

                            <span class="price">{{ formatPrice(cloth.Price) }}</span>
                        </div>

                        <div class="gvmp-d-flex gvmp-justify-end gvmp-mt-1">
                            <button
                                type="button"
                                class="gvmp-btn gvmp-btn-sm gvmp-btn-green gvmp-mr-1"
                                @click.stop="dress(cloth)"
                            >
                                Anprobieren <i class="gvmp-ml-1 fas fa-tshirt fa-fw"></i>
                            </button>

                            <button
                                type="button"
                                class="gvmp-btn gvmp-btn-sm gvmp-btn-green"
                                @click.stop="selectCloth(cloth)"
                            >
                                In den Warenkorb <i class="gvmp-ml-1 fas fa-shopping-basket fa-fw"></i>
                            </button>
                        </div>
                    </div>
                </li>

                <li
                    v-if="loading"
                    class="gvmp-p-3 bg-black gvmp-rounded"
                >
                    <i class="fas fa-spinner fa-spin fa-fw gvmp-mr-1" style="display: inline-block !important;"></i>
                    Lädt...
                </li>

                <li
                    v-if="(!clothes || (clothes && clothes.length === 0)) && !loading"
                    class="gvmp-p-3 bg-black gvmp-rounded"
                >
                    Keine Kleidung verfügbar.
                </li>
            </ul>
        </div>

        <div class="right">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">Ankleide</h3>

                <button
                    class="gvmp-btn gvmp-btn-sm"
                    @click="moveWearingToCart"
                    v-show="Object.keys(wearing).length > 0"
                >
                    Alle in den Warenkorb <i class="gvmp-ml-2 fas fa-chevron-down"></i>
                </button>
            </div>

            <hr class="gvmp-my-3">

            <p class="gvmp-mb-1">
                Diese Kleidung behältst du an wenn du sie kaufst.
            </p>

            <ul style="height: 20vh; margin: 0 -1rem 5rem -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden">
                <li v-for="(data, slot) in wearing" :key="slot" ref="wearItems">
                    <div @click="undress(slot)" class="gvmp-p-3 gvmp-mb-2 gvmp-btn gvmp-btn-block">
                        <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                            <div>
                                <img
                                    :src="getImagePath(getSlotIcon(slot))"
                                    :alt="data.slotName"
                                    class="gvmp-mr-3"
                                    style="height: 24px; width: 24px"
                                >

                                {{ data.cloth.Name }}
                            </div>

                            <span class="price">{{ formatPrice(data.cloth.Price) }}</span>
                        </div>

                        <div class="gvmp-d-flex gvmp-justify-end gvmp-mt-1">
                            <button
                                class="gvmp-btn gvmp-btn-sm gvmp-btn-red gvmp-mr-1"
                                @click.stop="undress(slot)"
                            >
                                Ausziehen <i class="fas fa-times gvmp-ml-1"></i>
                            </button>

                            <button
                                class="gvmp-btn gvmp-btn-sm gvmp-btn-green"
                                @click.stop="selectCloth(data.cloth)"
                            >
                                In den Warenkorb <i class="fas fa-shopping-cart gvmp-ml-1"></i>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>

            <div v-show="cart.length > 0 || keepCart">
                <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                    <h3 class="gvmp-h3">Warenkorb</h3>

                    <div>
                        <button type="button" class="gvmp-btn gvmp-btn-sm" @click="cart = []">
                            Warenkorb leeren <i class="gvmp-ml-2 fas fa-repeat fa-fw"></i>
                        </button>
                    </div>
                </div>

                <hr class="gvmp-my-3">

                <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between gvmp-mb-3">
                    <span class="gvmp-h5">Gesamtpreis</span>

                    <span class="gvmp-h5">{{ formatPrice(cartPrice) }}</span>
                </div>

                <ul style="height: 30vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden">
                    <li v-for="item in cart" :key="item.Id" ref="cartItems">
                        <div class="gvmp-p-3 gvmp-mb-2 gvmp-btn gvmp-btn-block" @click="removeFromCart(item)">
                            <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                                {{ item.Name }}
                            </div>

                            <div class="gvmp-d-flex gvmp-justify-between">
                                <span style="color: #c3c3c3">{{ item.slotName }} / {{ item.categoryName }}</span>

                                <span class="price">{{ formatPrice(item.Price) }}</span>
                            </div>

                            <div class="gvmp-d-flex gvmp-justify-end gvmp-mt-1">
                                <button
                                    class="gvmp-btn gvmp-btn-sm gvmp-btn-red gvmp-mr-1"
                                    @click.stop="removeFromCart(item)"
                                >
                                    Entfernen <i class="fas fa-times gvmp-ml-1"></i>
                                </button>

                                <button
                                    class="gvmp-btn gvmp-btn-sm gvmp-btn-green"
                                    @click.stop="dress(item)"
                                >
                                    Anprobieren <i class="fas fa-tshirt gvmp-ml-1"></i>
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>

                <button class="gvmp-btn gvmp-mt-3 gvmp-btn-block" @click="buy">
                    Kaufen
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'ClothingShop',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            shop: JSON.parse(this.data),

            slots      : null,
            currentSlot: null,

            categories     : null,
            currentCategory: null,

            clothes: null,

            // Keep cart visible if it was.
            keepCart: false,

            cart: [],

            wearing: {},

            loading: false,

            selectedIdx            : 0,
            lastSelectedIdxSlot    : 0,
            lastSelectedIdxCategory: 0,

            zoomedX: false,
            zoomedY: false,

            /////////////////////////////////////////////////

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

    /**
     * For testing we add some special moves here.
     */
    created () {
        // No data given
        if (!this.shop) this.shop = {}

        // Missing Shop Name
        if (!this.shop.name) this.shop.name = 'Test Shop 1 (auto)'

        // Missing Slots Data
        if (!this.shop.slots) this.shop.slots = [
            // Clothes
            { Id: 1, Name: 'Masken' },
            { Id: 4, Name: 'Hosen' },
            { Id: 6, Name: 'Schuhe' },
            { Id: 7, Name: 'Accessories' },
            { Id: 8, Name: 'Unterbekleidung' },
            { Id: 11, Name: 'Oberbekleidung' },

            // Props
            { Id: 'p-0', Name: 'Hut' },
            { Id: 'p-1', Name: 'Brille' },
            { Id: 'p-2', Name: 'Ohr' },
            { Id: 'p-6', Name: 'Uhr' },
            { Id: 'p-7', Name: 'Arm' },
        ]

        if (this.shop.hasOwnProperty('slots')) {
            this.slots = this.shop.slots
        }

        // If categories given per data input,
        // select first slot.
        //
        // THIS IS FOR TESTS ONLY!
        if (this.shop.hasOwnProperty('categories')) {
            this.categories  = this.shop.categories
            this.currentSlot = this.slots[0]
        }

        // If clothes given per data input,
        // select first slot and first category.
        // If no categories given, example categories will be created.
        //
        // THIS IS FOR TESTS ONLY!
        if (this.shop.hasOwnProperty('clothes')) {
            // Add missing categories if not given.
            if (!this.shop.hasOwnProperty('categories')) {
                this.categories = [
                    { Id: 1, Name: 'Cat 1' },
                    { Id: 2, Name: 'Cat 2' },
                ]
            }

            this.clothes         = this.shop.clothes
            this.currentSlot     = this.slots[0]
            this.currentCategory = this.categories[0]
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

    methods: {
        /**
         * Moves wearing items to shopping cart.
         *
         * Nice to have!
         */
        moveWearingToCart () {
            for (let slot in this.wearing) {
                this.addToCartFromWearing(this.wearing[slot])
            }
        },

        /**
         * Tell the Server that the player wants to buy
         * his shopping cart.
         */
        buy () {
            if (this.cart.length === 0) return

            let wearingData = []

            // Prepare data for easy JSON parsing on server side.
            for (let slot in this.wearing) {
                let data = this.wearing[slot]

                wearingData.push({
                    Id  : data.cloth.Id,
                    Slot: slot,
                })
            }

            // We also send the collected wearing data for a better wearing
            // after leaving the shop.
            this.triggerServer('clothingShopBuy', JSON.stringify(this.cart), JSON.stringify(wearingData))

            // Simple dismiss!
            this.dismiss()
        },

        /**
         * Select a given slot and request categories from remote server.
         *
         * @param slot
         */
        selectSlot (slot) {
            this.currentSlot = slot
            this.loading     = true

            this.triggerServer('clothingShopLoadCategories', slot.Id)
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
         * Select a given category and request clothes from remote server.
         *
         * @param category
         */
        selectCategory (category) {
            this.currentCategory = category
            this.loading         = true

            this.triggerServer('clothingShopLoadClothes', category.Id, this.currentSlot.Id)
        },

        /**
         * Unselect the selected category.
         */
        unselectCategory () {
            this.currentCategory = null
            this.clothes         = null
            this.loading         = false

            if (this.categories.length === 1) {
                this.unselectSlot()
            }
        },

        /**
         * Select given cloth and add it to the shopping cart.
         */
        selectCloth (cloth) {
            this.addToCart(cloth)
        },

        /**
         * Tell the server to dress a given cloth.
         * Dressed clothes are saved and displayed.
         *
         * @param cloth
         */
        dress (cloth) {
            if (this.wearing.hasOwnProperty(this.currentSlot.Id)) {
                this.wearing[this.currentSlot.Id] = {
                    slotName: this.currentSlot.Name,
                    catName : this.currentCategory.Name,
                    cloth   : cloth,
                }
            } else {
                this.$set(this.wearing, this.currentSlot.Id, {
                    slotName: this.currentSlot.Name,
                    catName : this.currentCategory.Name,
                    cloth   : cloth,
                })
            }

            this.triggerServer('clothingShopDress', cloth.Id, this.currentCategory.Id, this.currentSlot.Id)
        },

        /**
         * Tell the server to undress a given slot.
         *
         * @param slotId
         */
        undress (slotId) {
            this.$delete(this.wearing, slotId)

            this.triggerServer('clothingShopUndress', slotId)
        },

        /**
         * Callback if the user has selected a slot.
         *
         * @param categoriesJson
         */
        responseClothingShopCategories (categoriesJson) {
            // If the player has been left the slot before it has been loaded, simply do nothing.
            if (this.currentSlot === null) return

            this.categories = JSON.parse(categoriesJson)

            if (this.categories.length === 1) {
                this.selectCategory(this.categories[0])

                return
            }

            this.loading = false
        },

        /**
         * Callback if the user has selected a category.
         *
         * @param clothesJson
         */
        responseClothingShopClothes (clothesJson) {
            // If the player has been left the category before it has been loaded, simply do nothing.
            if (this.currentCategory === null) return

            this.clothes = JSON.parse(clothesJson.replace(/(\r\n|\n|\r)/gm, ''))
            this.loading = false
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
         * Add the given cloth to the shopping cart from wearing.
         *
         * @param wearing
         */
        addToCartFromWearing (wearing) {
            let found = this.cart.some(el => el.Id === wearing.cloth.Id)

            // Add items once only!
            if (found) return

            wearing.cloth.slotName     = wearing.slotName
            wearing.cloth.categoryName = wearing.catName

            this.cart.push(wearing.cloth)
        },

        /**
         * Add the given cloth to the shopping cart.
         *
         * @param cloth
         */
        addToCart (cloth) {
            let found = this.cart.some(el => el.Id === cloth.Id)

            // Add items once only!
            if (found) return

            cloth.slotName     = this.currentSlot.Name
            cloth.categoryName = this.currentCategory.Name

            this.cart.push(cloth)
        },

        /**
         * Remove cloth from shopping cart.
         *
         * @param cloth
         */
        removeFromCart (cloth) {
            this.cart = this.cart.filter(obj => obj.Id !== cloth.Id)
        },

        /**
         * Close the shop.
         */
        dismissLocal () {
            this.triggerServer('clothingShopReset')

            this.dismiss()
        },

        /**
         * Make sure that the selected item is in view if arrow keys are used.
         */
        fixScrolling (alignToTop = false) {
            if (this.selectedIdx === -1) return

            let elem = null

            if (this.currentSlot === null && this.currentCategory === null) {
                elem = this.$refs.slots[this.selectedIdx]
            }

            if (this.currentSlot !== null && this.currentCategory === null) {
                elem = this.$refs.categories[this.selectedIdx]
            }

            if (this.currentSlot !== null && this.currentCategory !== null) {
                elem = this.$refs.clothes[this.selectedIdx]
            }

            if (!elem) return

            elem.scrollIntoView(alignToTop)
        },

        /**
         * Format the price according to us currency rules.
         *
         * @param price
         *
         * @returns {string}
         */
        formatPrice (price) {
            return Number(price).toLocaleString(
                'en-US',
                {
                    style                : 'currency',
                    currency             : 'USD',
                    minimumFractionDigits: 0,
                },
            )
        },

        /**
         * Arrow down handler.
         */
        onArrowDown (evt) {
            evt.preventDefault()

            let length = this.slots.length

            if (this.currentSlot !== null) length = this.categories.length
            if (this.currentCategory !== null) length = this.clothes.length

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
            if (this.currentSlot !== null) length = this.categories.length
            if (this.currentCategory !== null) length = this.clothes.length

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

            // If no category is selected, it must be a category selection.
            if (this.currentCategory === null) {
                this.selectCategory(this.categories[this.selectedIdx])
                this.lastSelectedIdxCategory = this.selectedIdx
                this.selectedIdx             = 0

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
            if (this.currentCategory !== null) {
                this.unselectCategory()
                this.selectedIdx = this.lastSelectedIdxCategory
                this.fixScrolling()

                return
            }

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
    },

    watch: {
        /**
         * Make sure that the shopping cart will not disappear if it was visible.
         *
         * @param value
         */
        cart (value) {
            if (this.keepCart) return

            if (value.length > 0) this.keepCart = true
        },
    },

    computed: {
        /**
         * Actual sum of all cart items.
         *
         * @returns {*|number}
         */
        cartPrice () {
            return this.cart.reduce((a, b) => a + (b['Price'] || 0), 0)
        },
    },
}
</script>

<style scoped>
body {
    padding: 0;
    margin:  0;
}

.wrapper {
    color:           #fff;
    font-family:     'Oswald', sans-serif;
    position:        relative;
    width:           100%;
    height:          100vh;
    overflow:        hidden;
    background-size: cover;
    font-size:       1rem;
    animation:       fade-in 0.5s;
    z-index:         99999;
}

.left,
.right {
    position: absolute;
    width:    35rem;
    height:   100%;
    padding:  5rem;
}

.right {
    right:      0;
    animation:  slide-in-right 0.5s;
    background: linear-gradient(-90deg, rgba(0, 0, 0, 0.900717787114846) 10%, rgba(0, 0, 0, 0) 100%);
}

.left {
    left:       0;
    animation:  slide-in-left 0.5s;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.900717787114846) 10%, rgba(0, 0, 0, 0) 100%);
}

hr {
    opacity: 0.3;
}

.price {
    color:       #1dff1d;
    font-weight: 700;
}

.fas {
    line-height: inherit !important;
    display:     inline !important;
}

.bg-black {
    color:      white;
    box-shadow: inset 0 0 0 0.02rem rgba(112, 112, 112, 0.8);
    background: rgba(0, 0, 0, 0.5);
}

.bg-black.active, .bg-black.hoverable:hover {
    background-color: rgba(0, 0, 0, 0.9);
    cursor:           pointer;
}

.bg-red {
    color:      #f00;
    box-shadow: inset 0 0 0 0.02rem rgba(112, 112, 112, 0.8);
    background: rgba(100, 2, 2, 0.5);
}

@keyframes slide-in-right {
    0% { right: -250vh; }
    100% { right: 0; }
}

@keyframes slide-in-left {
    0% { left: -1000vh; }
    100% { left: 0; }
}

@keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
}

::-webkit-scrollbar {
    width:  2px;
    height: 2px;
}

::-webkit-scrollbar-button {
    width:  0;
    height: 0;
}

::-webkit-scrollbar-thumb {
    background:    #e1e1e1;
    border:        0 none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
    background: #fff;
}

::-webkit-scrollbar-thumb:active {
    background: #000;
}

::-webkit-scrollbar-track {
    background:    #666;
    border:        0px none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
    background: #666;
}

::-webkit-scrollbar-track:active {
    background: #333;
}

::-webkit-scrollbar-corner {
    background: transparent;
}

kbd, .key {
    display:               inline-block;
    min-width:             1em;
    padding:               .2em .3em;
    font:                  normal .85em/1 "Oswald", Lucida, Arial, sans-serif;
    text-align:            center;
    text-decoration:       none;
    -moz-border-radius:    .3em;
    -webkit-border-radius: .3em;
    border-radius:         .3em;
    border:                none;
    cursor:                default;
    -moz-user-select:      none;
    -webkit-user-select:   none;
    user-select:           none;

    background:            rgb(80, 80, 80);
    background:            -moz-linear-gradient(top, rgb(60, 60, 60), rgb(80, 80, 80));
    background:            -webkit-gradient(linear, left top, left bottom, from(rgb(60, 60, 60)), to(rgb(80, 80, 80)));
    color:                 rgb(250, 250, 250);
    text-shadow:           -1px -1px 0 rgb(70, 70, 70);
    -moz-box-shadow:       inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);
    -webkit-box-shadow:    inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);
    box-shadow:            inset 0 0 1px rgb(150, 150, 150), inset 0 -.05em .4em rgb(80, 80, 80), 0 .1em 0 rgb(30, 30, 30), 0 .1em .1em rgba(0, 0, 0, .3);
}
</style>