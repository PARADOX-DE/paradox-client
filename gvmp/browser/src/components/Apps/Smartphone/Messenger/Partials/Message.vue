<template>
    <div
        class="message-container"
        :class="{
            'emoji-only': hasOnlyEmojis,
            'big-emoji': hasOnlyEmojis && emojiCount <= 3,
            'has-gps': hasGps,
            'has-image': hasImage,
            'has-contact': hasContact,
            'has-lotto': hasLotto,
            'them': isReceiver,
            'me': !isReceiver,
        }"
    >
        <div class="message-content">
            <div class="gps" v-if="hasGps">
                <div
                    class="mapImage"
                    :style="convertMapCoordinatesToImagePosition()"
                    @click="$emit('gpsSelected', messageData)"
                >
                    <i
                        style="color: #e5851e"
                        class="fas fa-map-marker-alt fa-2x naviCenter"
                    ></i>
                </div>
            </div>

            <div class="contact" v-else-if="hasContact && contactData !== null">
                <div class="contact-info-header">
                    <v-ons-icon
                        icon="ion-md-contact"
                        style="color: #888; font-size: 25px !important; display: inline-block; margin-right: .5vh"
                    ></v-ons-icon>

                    Kontakt
                </div>

                <div class="contact-info-container">
                    <span class="contact-name">
                        {{ contactData.name }}
                    </span>

                    <span class="contact-number">
                        {{ contactData.number }}
                    </span>
                </div>

                <div class="contact-action-container" v-if="isReceiver">
                    <v-ons-row>
                        <v-ons-col style="text-align: center">
                            <v-ons-button class="icon-button grey" @click="$emit('callContact', contactData)">
                                <v-ons-icon
                                    icon="ion-md-call"
                                ></v-ons-icon>
                            </v-ons-button>
                        </v-ons-col>

                        <v-ons-col style="text-align: center">
                            <v-ons-button class="icon-button grey" @click="$emit('smsContact', contactData)">
                                <v-ons-icon
                                    icon="ion-md-chatboxes"
                                ></v-ons-icon>
                            </v-ons-button>
                        </v-ons-col>

                        <v-ons-col style="text-align: center">
                            <v-ons-button class="icon-button grey" @click="$emit('addContact', contactData)">
                                <v-ons-icon
                                    icon="ion-md-add"
                                ></v-ons-icon>
                            </v-ons-button>
                        </v-ons-col>
                    </v-ons-row>
                </div>
            </div>

            <div class="message" v-else v-html="fullParsedMessage"></div>
        </div>

        <div class="time">
            <span>
                <template v-if="isReceiver">
                    {{ cleanUpName(messageData.sender) }} -
                </template>

                {{ messageData.date }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.message-container {
    margin-bottom: 0.9910802775024777vh;
    width: 100%;

    .message-content {
        overflow: hidden;
    }

    .emoji {
        height: 1.1892963330029733vh !important;
        width: 1.1892963330029733vh !important;
    }

    &.emoji-only {
        &.big-emoji {
            .emoji {
                height: 3.1714568880079286vh !important;
                width: 3.1714568880079286vh !important;
            }
        }
    }

    .contact,
    .message {
        background-color: #404040;
        padding: 0.9910802775024777vh 1.1892963330029733vh;
        max-width: 90%;
        min-width: 5%;
        border-radius: 0.49554013875123887vh;
    }

    .contact {
        min-width: 90%;
    }

    .contact {
        padding: 0 !important;

        .contact-info-container {
            padding: 0.9910802775024777vh 1.1892963330029733vh;

            .contact-name {
                white-space: nowrap;
                font-size: 18px;
                display: block;
                line-height: 18px;
            }

            .contact-number {
                font-size: 12px;
                color: #909090;
                line-height: 12px;
                display: block;
            }
        }

        .contact-info-header {
            background-color: #4c4c4c;
            padding: 0.9910802775024777vh 1.1892963330029733vh;
            border-top-left-radius: 0.49554013875123887vh;
            border-top-right-radius: 0.49554013875123887vh;

            .ons-icon {
                padding: 0 !important;
            }
        }

        .contact-action-container {
            background-color: #4c4c4c;
            padding: 0.9910802775024777vh 1.1892963330029733vh;
            border-bottom-left-radius: 0.49554013875123887vh;
            border-bottom-right-radius: 0.49554013875123887vh;
        }
    }

    &.emoji-only {
        .message {
            padding-bottom: 0.6937561942517344vh;
        }

        &.big-emoji {
            .message {
                padding-bottom: 0.39643211100099107vh;
            }
        }
    }

    .gps {
        width: 19.028741328047573vh;

        .mapImage {
            width: 100%;
            border-radius: 0.49554013875123887vh;
            height: 14.866204162537166vh;
            background: url('../../../../../assets/messenger/map.png') no-repeat;
            position: relative;
        }

        .naviCenter {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
            margin-left: 1.5857284440039643vh;
            margin-top: 0.39643211100099107vh;
        }
    }

    .time {
        color: #686868;
        font-size: 9px;
    }

    &.them {
        .time {
            text-align: left;
        }

        .gps {
            float: left;

            .mapImage {
                border-bottom-left-radius: 0;
            }
        }

        .contact {
            .contact-action-container {
                border-bottom-left-radius: 0;
            }
        }

        .contact,
        .message {
            float: left;
            border-bottom-left-radius: 0;
        }
    }

    &.me {
        .time {
            text-align: right;
        }

        .gps {
            float: right;

            .mapImage {
                border-bottom-right-radius: 0;
            }
        }

        .contact {
            .contact-info-header {
                background-color: #502608;
            }

            .contact-action-container {
                border-bottom-right-radius: 0;
            }
        }

        .contact,
        .message {
            float: right;
            border-bottom-right-radius: 0;
            background-color: #64320a;
        }
    }
}
</style>

<script>
import Twemoji from 'twemoji'

export default {
    props: ['messageData'],

    computed: {
        /**
         * Detects if current user is the receiver of the message.
         *
         * @return {boolean}
         */
        isReceiver () {
            return !this.messageData.receiver
        },

        /**
         * Detects if the message has gps data.
         *
         * @return {boolean}
         */
        hasGps () {
            return this.messageData.message.indexOf('GPS$$') >= 0
        },

        /**
         * Detects if the message has contact data.
         *
         * @return {boolean}
         */
        hasContact () {
            return this.messageData.message.indexOf('CONTACT$$') >= 0
        },

        /**
         * Split contact data into it's parts.
         *
         * @return {null|{name: string, number: number}}
         */
        contactData () {
            if (!this.hasContact) return null

            let data = this.messageData.message.split('$$')

            return {
                name  : data[1],
                number: data[2],
            }
        },

        /**
         * Detects if the message has Lotto data.
         *
         * @return {boolean}
         */
        hasLotto () {
            return this.messageData.message.indexOf('LOTTO$$') >= 0
        },

        /**
         * Detects if the message has an image.
         *
         * @return {boolean}
         */
        hasImage () {
            return this.messageData.message.indexOf('IMAGE$$') >= 0
        },

        /**
         * Count of emojis in message.
         *
         * @return {number}
         */
        emojiCount () {
            let count = 0

            this.$emojiConverter.replaceShortcodesWith(this.messageData.message, () => count++)

            return count
        },

        /**
         * Detects if the message contains emoji only.
         *
         * @return {boolean}
         */
        hasOnlyEmojis () {
            return this.$emojiConverter.replaceShortcodesWith(this.messageData.message, () => '').trim() === ''
        },

        /**
         * Replaces shortcodes saved to the database with its unicode charakters.
         *
         * @return {string}
         */
        unicodeMessage () {
            return this.$emojiConverter.replaceShortcodesWith(
                this.messageData.message,
                function (unicodeChar, shortcode, name, object) {
                    if (unicodeChar) {
                        return unicodeChar
                    } else if (object.url) {
                        // @todo: Add custom emoji support e.g. teams.
                        return name
                    } else {
                        return shortcode
                    }
                },
            )
        },

        /**
         * Full parsed message.
         *
         * @return {string}
         */
        fullParsedMessage () {
            return Twemoji.parse(this.unicodeMessage)
        },
    },

    methods: {
        /**
         * Convert GTA map coordinates to image background position in %.
         *
         * @return {{backgroundPosition: string}}
         */
        convertMapCoordinatesToImagePosition () {
            let calcHelper,
                gps = this.messageData.message.split('$$')

            let corX = 45.7
            if (gps[1] > 0) {
                corX = corX + (gps[1] / 120)
            } else {
                calcHelper = gps[1] / 120
                corX       = corX - (calcHelper * -1)
            }

            let corY = 67.6
            if (gps[2] > 0) {
                corY = corY - (gps[2] / 120)
            } else {
                calcHelper = gps[2] / 120
                corY       = corY + (calcHelper * -1)
            }

            return {
                backgroundPosition: (corX + '%' + corY + '%'),
            }
        },

        /**
         * Remove favorite state from user name.
         *
         * @param name
         *
         * @return {string}
         */
        cleanUpName (name) {
            return name.indexOf('000FAV') >= 0 ? name.split('00FAV')[1] : name
        },
    },
}
</script>