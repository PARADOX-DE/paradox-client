<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>

            <div class="center">
                Überweisung
            </div>
        </v-ons-toolbar>

        <v-ons-list>
            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-contact" class="list-item__icon"></v-ons-icon>
                </div>

                <div class="center">
                    <input
                        type="text"
                        class="text-input"
                        placeholder="Name eingeben..."
                        v-model="player"
                    />
                </div>
            </v-ons-list-item>

            <v-ons-list-item modifier="longdivider">
                <div class="left">
                    <v-ons-icon icon="ion-md-cash" class="list-item__icon"></v-ons-icon>
                </div>

                <div class="center">
                    <input
                        type="text"
                        class="text-input"
                        placeholder="Betrag eingeben..."
                        v-model="amount"
                    />
                </div>
            </v-ons-list-item>
        </v-ons-list>

        <section>
            <v-ons-button modifier="large" @click="transfer">
                Überweisen
            </v-ons-button>
        </section>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../../BaseApp'

export default {
    name: 'BankingAppTransfer',

    extends: BaseApp,

    props: ['pageStack'],

    data () {
        return {
            player: '',
            amount: '',
            error : '',

            bankingMaxCap: 0,
            bankingMinCap: 0,
            tax          : 0,
        }
    },

    methods: {
        transfer () {
            // Validate
            if (this.player === '' || this.amount === '' || this.amount === 0) {
                this.$ons.notification.toast('Bitte die Felder ausfüllen!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            if (/\d/.test(this.player)) {
                this.$ons.notification.toast('Bitte gültigen Namen eingeben!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            if (!this.isInt(this.amount)) {
                this.$ons.notification.toast('Bitte gültigen Betrag eingeben!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.amount = parseInt(this.amount)
            if (this.amount < this.bankingMinCap) {
                this.$ons.notification.toast('Überweisungen sind erst ab $' + this.convert(this.bankingMinCap) + ' möglich!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            if (this.amount > this.bankingMaxCap) {
                this.$ons.notification.toast('Zu Ihrer Sicherheit können nur Beträge bis $' + this.convert(this.bankingMaxCap) + ' überwiesen werden!', {
                    timeout: 3000,
                    class  : 'ons-toast-gvmp toast-error',
                })

                return
            }

            this.triggerServer('bankingAppTransfer', this.player, this.amount)
            this.pageStack.pop()
        },

        isInt (value) {
            return !isNaN(value) && (function (x) { return (x | 0) === x })(parseFloat(value))
        },

        convert (money) {
            return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        },

        responseBankingCap (maxCap, minCap) {
            this.bankingMaxCap = maxCap
            this.bankingMinCap = minCap
        },
    },

    mounted () {
        this.triggerServer('requestBankingCap')
    },
}
</script>
