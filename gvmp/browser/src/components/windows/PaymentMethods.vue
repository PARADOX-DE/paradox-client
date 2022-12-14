<template>
    <div class="payment-selection-window">
        <div class="header">
            <div class="header-title">
                Zahlungsmethode auswählen
            </div>
        </div>

        <p class="text">
            Wie möchtest du <span>{{ formatPrice(price) }}</span> bezahlen?
        </p>

        <div
            class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center payment-methods"
        >
            <a
                class="gvmp-d-flex gvmp-justify-center gvmp-align-items-center payment-method"
                @click="selectPaymentMethod('bank')"
            >
                <div class="payment-method-inner">
                    <i class="fas fa-credit-card"></i><br>
                    <span>Bankkonto</span>
                </div>
            </a>

            <a
                class="gvmp-d-flex gvmp-justify-center gvmp-align-items-center payment-method"
                @click="selectPaymentMethod('bar')"
            >
                <div class="payment-method-inner">
                    <i class="fas fa-wallet"></i><br>
                    <span>Bar</span>
                </div>
            </a>
        </div>

        <div class="gvmp-d-flex gvmp-justify-end gvmp-align-items-center payment-methods-actions">
            <button type="button" class="abort" @click="dismiss">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.payment-selection-window {
    position: absolute;
    top: 50%;
    left: 50%;
    height: auto;
    width: 500px;
    background-color: rgba(0, 0, 0, .8);
    transform: translate(-50%, -50%);
    border-bottom: 5px solid orange;

    .header {
        color: black;
        border-top: 1vh solid transparent;
        box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .5);

        .header-title {
            padding: 1vh;
            text-align: center;
            background-color: orange;
        }
    }

    .text {
        padding: 2vh;
        color: white;
        text-align: center;

        > span {
            color: orange;
        }
    }

    .payment-methods {
        margin: 0 2vh 2vh 2vh;
        height: 72%;

        a.payment-method {
            height: 200px;
            width: 48%;
            border: 1px solid dimgrey;
            background-color: rgba(0, 0, 0, .2);
            color: white;
            cursor: pointer;
            transition: all 0.2s 0s ease-in-out;

            > div.payment-method-inner {
                text-align: center;
                color: dimgrey;
                transition: all 0.2s 0s ease-in-out;

                i {
                    margin-bottom: 1vh;
                    font-size: 60px;
                    color: dimgrey;
                    transition: all 0.2s 0s ease-in-out;
                }
            }

            &:hover {
                border-color: orange;
                box-shadow: 0 0 4px rgba(0, 0, 0, .8);

                > div.payment-method-inner {
                    color: white;

                    i {
                        color: orange;
                    }
                }
            }
        }
    }

    .payment-methods-actions {
        margin: 0 2vh 2vh 2vh;

        button {
            padding: .5vh 1vh;
            border: 1px solid dimgrey;
            color: dimgrey;
            transition: all 0.2s 0s ease-in-out;
            cursor: pointer;
            background-color: rgba(0, 0, 0, .8);

            &:hover {
                border-color: white;
                color: white;
            }

            &.abort {
                border-color: orange;
                color: orange;

                &:hover {
                    background-color: orange;
                    color: black;
                }
            }
        }
    }
}
</style>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'PaymentMethods',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            price: parseInt(JSON.parse(this.data).price),
        }
    },

    methods: {
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
         * Send selected payment method to the server.
         *
         * @param method
         */
        selectPaymentMethod (method) {
            this.triggerServer('selectPaymentMethod', method)

            this.dismiss()
        },

        /**
         * Add some handler for some keys.
         * Player love to use their keyboard.
         *
         * @param evt
         */
        onKeyUp (evt) {
            switch (evt.key) {
                case 'Escape':
                    this.dismiss()

                    break
            }
        },
    },

    mounted () {
        document.addEventListener('keydown', this.onKeyUp)
    },

    destroyed () {
        document.removeEventListener('keydown', this.onKeyUp)
    },
}
</script>