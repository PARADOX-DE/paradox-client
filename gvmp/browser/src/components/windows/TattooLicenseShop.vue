<template>
    <div class="gvmp-wrapper">
        <div class="gvmp-left">
            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                <h3 class="gvmp-h3">Tattoo Lizenzen</h3>

                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-red" @click="dismissLocal">
                    <i class="fas fa-times fa-fw"></i>
                </button>
            </div>

            <hr class="gvmp-my-3">

            <div
                v-if="currentZone !== null"
                class="gvmp-d-flex gvmp-align-items-center gvmp-mb-3"
            >
                <button type="button" class="gvmp-btn gvmp-btn-sm gvmp-btn-grow gvmp-mr-2" @click="unselectZone">
                    <i class="fas fa-chevron-left fa-fw"></i>
                </button>

                <span class="gvmp-h5">{{ currentZone.Name }}</span>
            </div>

            <ul
                style="height: 80vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentZone === null"
            >
                <li v-for="(zone, idx) in zones" :key="zone.Id" ref="zones">
                    <button
                        type="button"
                        class="gvmp-p-3 gvmp-btn gvmp-mb-2 gvmp-btn-block gvmp-text-left gvmp-d-flex gvmp-align-items-center"
                        :class="{active: idx === selectedIdx}"
                        @click="selectZone(zone)"
                        @mouseenter="selectedIdx = -1"
                    >
                        {{ zone.Name }}
                    </button>
                </li>
            </ul>

            <ul
                style="height: 70vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden"
                v-show="currentZone !== null"
            >
                <li v-for="(license, idx) in licenses" :key="license.Id" ref="licenses">
                    <div
                        class="gvmp-p-3 bg-black hoverable gvmp-rounded gvmp-mb-2 gvmp-text-left"
                        :class="{active: idx === selectedIdx}"
                        @mouseenter="selectedIdx = -1"
                        @click="addToCart(license)"
                    >
                        <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                            {{ license.Name }}

                            <span class="price">{{ formatPrice(license.Price) }}</span>
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
                    v-if="(!licenses || (licenses && licenses.length === 0)) && !loading"
                    class="gvmp-p-3 bg-black gvmp-rounded"
                >
                    Keine Lizenzen verfügbar.
                </li>
            </ul>
        </div>

        <div class="gvmp-right">
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

                <ul style="height: 70vh; margin: 0 -1rem; padding: 0 1rem; overflow-y: auto; overflow-x: hidden">
                    <li v-for="item in cart" :key="item.Id" ref="cartItems">
                        <div class="gvmp-p-3 gvmp-mb-2 gvmp-btn gvmp-btn-block" @click="removeFromCart(item)">
                            <div class="gvmp-d-flex gvmp-align-items-center gvmp-justify-between">
                                {{ item.Name }}
                            </div>

                            <div class="gvmp-d-flex gvmp-justify-between">
                                <span style="color: #c3c3c3">{{ item.zoneName }}</span>

                                <span class="price">{{ formatPrice(item.Price) }}</span>
                            </div>

                            <div class="gvmp-d-flex gvmp-justify-end gvmp-mt-1">
                                <button
                                    class="gvmp-btn gvmp-btn-sm gvmp-btn-red"
                                    @click.stop="removeFromCart(item)"
                                >
                                    Entfernen <i class="fas fa-times gvmp-ml-1"></i>
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
    name: 'TattooLicenseShop',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            zones              : JSON.parse(this.data).zones,
            currentZone        : null,
            selectedIdx        : 0,
            lastSelectedIdxZone: 0,
            licenses           : null,
            keepCart           : false,
            cart               : [],
            loading            : false,
        }
    },

    mounted () {
        document.addEventListener('keydown', this.onKeyDown)
    },

    destroyed () {
        document.removeEventListener('keydown', this.onKeyDown)
    },

    methods: {
        /**
         * Tell the Server that the player wants to buy
         * his shopping cart.
         */
        buy () {
            if (this.cart.length === 0) return

            this.triggerServer('buyTattooLicenses', JSON.stringify(this.cart))

            this.dismiss()
        },

        /**
         * Close the shop.
         */
        dismissLocal () {
            this.dismiss()
        },

        /**
         * Select a given slot and request categories from remote server.
         *
         * @param zone
         */
        selectZone (zone) {
            this.currentZone = zone
            this.loading     = true

            this.triggerServer('requestLicenseShopZoneLicenses', zone.Id)
        },

        /**
         * Handle server licenses response.
         *
         * @param licensesJson
         */
        responseLicenseShopZoneLicenses (licensesJson) {
            // If the player has been left the zone before it has been loaded, simply do nothing.
            if (this.currentZone === null) return

            this.licenses = JSON.parse(licensesJson)
            this.loading  = false
        },

        /**
         * Unselect the selected zone.
         */
        unselectZone () {
            this.currentZone = null
            this.licenses    = null
            this.loading     = false
        },

        /**
         * Add the given license to the shopping cart.
         *
         * @param license
         */
        addToCart (license) {
            let found = this.cart.some(el => el.Id === license.Id)

            // Add items once only!
            if (found) return

            license.zoneName = this.currentZone.Name

            this.cart.push(license)
        },

        /**
         * Remove license from shopping cart.
         *
         * @param license
         */
        removeFromCart (license) {
            this.cart = this.cart.filter(obj => obj.Id !== license.Id)
        },

        /**
         * Make sure that the selected item is in view if arrow keys are used.
         */
        fixScrolling (alignToTop = false) {
            if (this.selectedIdx === -1) return

            let elem = null

            if (this.currentZone === null) {
                elem = this.$refs.zones[this.selectedIdx]
            }

            if (this.currentZone !== null) {
                elem = this.$refs.licenses[this.selectedIdx]
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

            let length = this.zones.length
            if (this.currentZone !== null) length = this.licenses.length

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

            let length = this.zones.length
            if (this.currentZone !== null) length = this.licenses.length

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
         * Enter will select the active zone or put
         * the selection to the shopping cart.
         */
        onEnter () {
            // -1 = nothing selected
            if (this.selectedIdx === -1) return

            // If no zone is selected, it must be a zone selection.
            if (this.currentZone === null) {
                this.selectZone(this.zones[this.selectedIdx])
                this.lastSelectedIdxZone = this.selectedIdx
                this.selectedIdx         = 0

                return
            }

            // Zone is selected. So add license to cart.
            this.addToCart(this.licenses[this.selectedIdx])
        },

        /**
         * Backspace will go back a zone.
         */
        onBackspace () {
            if (this.currentZone !== null) {
                this.unselectZone()
                this.selectedIdx = this.lastSelectedIdxZone
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
            }
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
</style>