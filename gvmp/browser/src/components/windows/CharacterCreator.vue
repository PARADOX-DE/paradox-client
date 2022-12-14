<template>
    <div id="gvmp-creator" class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
        <div class="left-menu">
            <div class="menu-header">
                <h1>Schönheitsklinik</h1>
            </div>

            <div class="menu-content">
                <div class="menu-section">
                    <div class="list-group">
                        <a
                            v-for="(part, idx) in parts"
                            :key="idx"
                            @click="selectPartCategory(idx)"
                            class="list-group-item gvmp-d-flex gvmp-justify-between gvmp-align-items-center"
                            :class="{ active: selectedPartCategory === idx }"
                        >
                            <span>{{ part.name }}</span>

                            <i class="fas fa-chevron-right fa-fw"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="menu-section" style="border-top: 1px solid #3e3e3e">
                <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                    <button
                        class="menu-btn secondary m-r-1 flex-full text-center"
                        :class="{active: gender.male}"
                        @click="changeGender(true)"
                    >
                        <i class="fas fa-mars fa-fw"></i> Männlich
                    </button>

                    <button
                        class="menu-btn secondary m-l-1 flex-full text-center"
                        :class="{active: !gender.male}"
                        @click="changeGender(false)"
                    >
                        <i class="fas fa-venus fa-fw"></i> Weiblich
                    </button>
                </div>
            </div>

            <div class="menu-footer">
                <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                    <button class="menu-btn secondary" @click="close">Abbrechen</button>

                    <div>
                        <span style="font-size: 1.4814814814814814vh">
                            Kosten: <span class="costs">{{ formatPrice(calculateTotal) }}</span>
                        </span>

                        <button class="menu-btn primary m-l-1" @click="finish">Fertig</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-menu">
            <div
                class="menu-section gvmp-d-flex gvmp-justify-between gvmp-align-items-center"
                style="border-bottom: 1px solid #3e3e3e; font-size: 1.4814814814814814vh"
            >
                {{ parts[selectedPartCategory].name }}

                <i class="fas fa-dice fa-fw" @click="random" style="color: #5e5e5e"></i>
            </div>

            <div class="menu-content" style="max-height: 80vh">
                <div class="menu-section">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="setting in getValidSettings" :key="setting.name">
                            <div class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center">
                                <span>{{ setting.name }}</span>

                                <span>{{ setting.value }}</span>
                            </div>

                            <input
                                v-model.number="setting.value"
                                type="range"
                                :min="setting.min"
                                :max="setting.max"
                                :step="setting.step"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'CharacterCreator',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        let obj = JSON.parse(this.data)

        return {
            selectedPartCategory: 0,

            currentMousePositionX: null,

            char: obj.customization,

            gender: {
                male   : true,
                default: true,
                price  : 500,
            },

            parts: [
                {
                    name    : 'Kopfform',
                    method  : 'setHeadBlendData',
                    settings: [
                        { name: 'Weibliche Gesichtsform', price: 100, value: 0, min: 0, max: 45, step: 1, default: 0 },
                        { name: 'Männliche Gesichtsform', price: 100, value: 0, min: 0, max: 45, step: 1, default: 0 },
                        { value: 0 },
                        { name: 'Hautfarbe 1', price: 100, value: 0, min: 0, max: 45, step: 1, default: 0 },
                        { name: 'Hautfarbe 2', price: 100, value: 0, min: 0, max: 45, step: 1, default: 0 },
                        { value: 0 },
                        {
                            name   : 'Formanteil weiblich/männlich',
                            price  : 100,
                            value  : 0,
                            min    : 0,
                            max    : 1,
                            step   : 0.1,
                            default: 0,
                        },
                        {
                            name   : 'Hautfarbenanteil weiblich/männlich',
                            price  : 100,
                            value  : 0,
                            min    : 0,
                            max    : 1,
                            step   : 0.1,
                            default: 0,
                        },
                        { value: 0 },
                        { value: false },
                    ],
                },
                {
                    name    : 'Gesicht',
                    method  : 'setFaceFeature',
                    settings: [
                        { name: 'Nasenbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nasenhöhe', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nasenlänge', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nasenrücken', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nasenspitze', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nasenverkrümmung', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Augenbrauenhöhe', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Augenbrauenbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Wangenknochenhöhe', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Wangenknochenbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Wangenbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Augen', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Lippen', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kieferbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kieferhöhe', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kinnlänge', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kinnposition', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kinnbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Kinnform', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                        { name: 'Nackenbreite', price: 100, value: 0, min: -1, max: 1, step: 0.1, default: 0 },
                    ],
                },
                {
                    name    : 'Frisur',
                    method  : 'setComponentVariation',
                    settings: [
                        { value: 2 },
                        { name: 'Frisur', price: 100, value: 0, min: 0, max: 20, step: 1, default: 0 },
                        { value: 0 },
                        { value: 0 },
                    ],
                },
                {
                    name    : 'Haarfarbe',
                    method  : 'setHairColor',
                    settings: [
                        { name: 'Farbe', price: 100, value: 0, min: 0, max: 50, step: 1, default: 0 },
                        { name: 'Stränenfarbe', price: 100, value: 0, min: 0, max: 50, step: 1, default: 0 },
                    ],
                },
                {
                    name    : 'Augenfarbe',
                    method  : 'setEyeColor',
                    settings: [
                        { name: 'Farbe', price: 100, value: 0, min: 0, max: 31, step: 1, default: 0 },
                    ],
                },
                {
                    name    : 'Augenbrauen',
                    method  : 'setHeadOverlay',
                    settings: [
                        { value: 2 },
                        { name: 'Art ', price: 100, value: 0, min: 0, max: 33, step: 1, default: 0 },
                        { name: 'Deckkraft ', price: 100, value: 0, min: 0, max: 1, step: 0.1, default: 0 },
                        { name: 'Farbe ', price: 100, value: 0, min: 0, max: 50, step: 1, default: 0 },
                        { value: 0 },
                    ],
                },
                {
                    name    : 'Alter',
                    method  : 'setHeadOverlay',
                    settings: [
                        { value: 3 },
                        { name: 'Art ', price: 100, value: 0, min: 0, max: 14, step: 1, default: 0 },
                        { name: 'Deckkraft ', price: 100, value: 0, min: 0, max: 1, step: 0.1, default: 0 },
                        { value: 0 },
                        { value: 0 },
                    ],
                },
                {
                    name    : 'Makeup',
                    method  : 'setHeadOverlay',
                    settings: [
                        { value: 4 },
                        { name: 'Art ', price: 100, value: 0, min: 0, max: 74, step: 1, default: 0 },
                        { name: 'Deckkraft ', price: 100, value: 0, min: 0, max: 1, step: 0.1, default: 0 },
                        { value: 0 },
                        { value: 0 },
                    ],
                },
                {
                    name    : 'Blush',
                    method  : 'setHeadOverlay',
                    settings: [
                        { value: 5 },
                        { name: 'Art ', price: 100, value: 0, min: 0, max: 6, step: 1, default: 0 },
                        { name: 'Deckkraft ', price: 100, value: 0, min: 0, max: 1, step: 0.1, default: 0 },
                        { name: 'Farbe ', price: 100, value: 0, min: 0, max: 50, step: 1, default: 0 },
                        { value: 0 },
                    ],
                },
                {
                    name    : 'Lippenstift',
                    method  : 'setHeadOverlay',
                    settings: [
                        { value: 8 },
                        { name: 'Art ', price: 100, value: 0, min: 0, max: 9, step: 1, default: 0 },
                        { name: 'Deckkraft ', price: 100, value: 0, min: 0, max: 1, step: 0.1, default: 0 },
                        { name: 'Farbe ', price: 100, value: 0, min: 0, max: 50, step: 1, default: 0 },
                        { value: 0 },
                    ],
                },
            ],
        }
    },

    methods: {
        selectPartCategory (idx) {
            this.removeListeners()

            this.selectedPartCategory = idx

            this.$nextTick(() => {
                this.addListeners()
            })
        },

        removeListeners () {
            let inputs = document.querySelectorAll('input[type="range"]'),
                _this  = this

            inputs.forEach(input => {
                input.removeEventListener('input', () => _this.setBackgroundSize(input))
            })
        },

        addListeners () {
            let inputs = document.querySelectorAll('input[type="range"]'),
                _this  = this

            inputs.forEach(input => {
                input.addEventListener('input', () => _this.setBackgroundSize(input))

                _this.setBackgroundSize(input)
            })
        },

        setBackgroundSize (input) {
            input.style.setProperty('--background-size', `${this.getBackgroundSize(input)}%`)
        },

        getBackgroundSize (input) {
            const min   = +input.min || 0
            const max   = +input.max || 100
            const value = +input.value

            return (value - min) / (max - min) * 100
        },

        changeGender (state) {
            if (this.gender.male === state) return

            this.trigger('changeGender', this.gender.male ? 0x9C9EFFD8 : 0x705E61F2)

            this.updateParts()
            this.gender.male = state
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

        random () {
            let _this = this

            this.getValidSettings.forEach(setting => {
                let rand = (Math.random() * (setting.max - setting.min + 1) + setting.min).toFixed(_this.countDecimals(setting.step))

                if (rand > setting.max) {
                    rand = setting.max
                }

                if (rand < setting.min) {
                    rand = setting.min
                }

                setting.value = _this.countDecimals(rand) >= 1 ? parseFloat(rand) : parseInt(rand)
            })

            this.$nextTick(() => {
                // Reset Background size...
                let inputs = document.querySelectorAll('input[type="range"]')

                inputs.forEach(input => {
                    _this.setBackgroundSize(input)
                })
            })
        },

        countDecimals (input) {
            if (Math.floor(input) === input) return 0

            let str = input.toString()

            if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
                return str.split('-')[1] || 0
            } else if (str.indexOf('.') !== -1) {
                return str.split('.')[1].length || 0
            }

            return str.split('-')[1] || 0
        },

        finish () {
            this.triggerServer('UpdateCharacterCustomization', this.convertJsonToServer(), this.calculateTotal)
            this.trigger('exit', true)
            this.dismiss()
        },

        close () {
            this.triggerServer('StopCustomization')
            this.dismiss()
        },

        convertJsonFromServer (data) {
            this.gender.male = this.gender.default = data.Gender === parseInt(0)

            for (const index in this.parts) {
                let part     = this.parts[index]
                let settings = part.settings
                if (part.method === 'setHeadBlendData') {
                    this.setValue(settings[0], data.Parents.MotherShape)
                    this.setValue(settings[1], data.Parents.FatherShape)
                    this.setValue(settings[3], data.Parents.MotherSkin)
                    this.setValue(settings[4], data.Parents.FatherSkin)
                    this.setValue(settings[6], data.Parents.Similarity)
                    this.setValue(settings[7], data.Parents.SkinSimilarity)
                } else if (part.method === 'setFaceFeature') {
                    for (let i = 0; i < 20; i++) {
                        this.setValue(settings[i], data.Features[i])
                    }
                } else if (part.method === 'setComponentVariation') {
                    this.setValue(settings[1], data.Hair.Hair)
                } else if (part.method === 'setHairColor') {
                    this.setValue(settings[0], data.Hair.Color)
                    this.setValue(settings[1], data.Hair.HighlightColor)
                } else if (part.method === 'setEyeColor') {
                    this.setValue(settings[0], data.EyeColor)
                } else if (part.method === 'setHeadOverlay') {
                    if (parseInt(settings[0].value) === 2) {
                        this.setValue(settings[1], data.Appearance[2].Value)
                        this.setValue(settings[2], data.Appearance[2].Opacity)
                        this.setValue(settings[3], data.EyebrowColor)
                    } else if (parseInt(settings[0].value) === 3) {
                        this.setValue(settings[1], data.Appearance[3].Value)
                        this.setValue(settings[2], data.Appearance[3].Opacity)
                    } else if (parseInt(settings[0].value) === 4) {
                        this.setValue(settings[1], data.Appearance[4].Value)
                        this.setValue(settings[2], data.Appearance[4].Opacity)
                    } else if (parseInt(settings[0].value) === 5) {
                        this.setValue(settings[1], data.Appearance[5].Value)
                        this.setValue(settings[2], data.Appearance[5].Opacity)
                        this.setValue(settings[3], data.BlushColor)
                    } else if (parseInt(settings[0].value) === 8) {
                        this.setValue(settings[1], data.Appearance[8].Value)
                        this.setValue(settings[2], data.Appearance[8].Opacity)
                        this.setValue(settings[3], data.LipstickColor)
                    }
                }
            }
        },

        setValue (value, data) {
            value.value   = parseFloat(data)
            value.default = parseFloat(data)
        },

        convertJsonToServer () {
            let json                    = {}
            json.Gender                 = this.gender.male ? 0 : 1
            json.Parents                = {}
            json.Parents.FatherShape    = this.parts[0].settings[1].value
            json.Parents.MotherShape    = this.parts[0].settings[0].value
            json.Parents.FatherSkin     = this.parts[0].settings[4].value
            json.Parents.MotherSkin     = this.parts[0].settings[3].value
            json.Parents.Similarity     = this.parts[0].settings[6].value
            json.Parents.SkinSimilarity = this.parts[0].settings[7].value
            json.Features               = []
            for (let i = 0; i < 20; i++) {
                json.Features[i] = this.parts[1].settings[i].value
            }
            json.Hair                = {}
            json.Hair.Hair           = this.parts[2].settings[1].value
            json.Hair.Color          = this.parts[3].settings[0].value
            json.Hair.HighlightColor = this.parts[3].settings[1].value
            json.Appearance          = this.char.Appearance
            json.Appearance[2]       = {
                Value  : this.parts[5].settings[1].value,
                Opacity: this.parts[5].settings[2].value,
            }
            json.Appearance[3]       = {
                Value  : this.parts[6].settings[1].value,
                Opacity: this.parts[6].settings[2].value,
            }
            json.Appearance[4]       = {
                Value  : this.parts[7].settings[1].value,
                Opacity: this.parts[7].settings[2].value,
            }
            json.Appearance[5]       = {
                Value  : this.parts[8].settings[1].value,
                Opacity: this.parts[8].settings[2].value,
            }
            json.Appearance[8]       = {
                Value  : this.parts[9].settings[1].value,
                Opacity: this.parts[9].settings[2].value,
            }
            json.Tattoos             = this.char.Tattoos
            json.EyebrowColor        = this.parts[5].settings[3].value
            json.BeardColor          = this.char.BeardColor
            json.EyeColor            = this.parts[4].settings[0].value
            json.BlushColor          = this.parts[8].settings[3].value
            json.LipstickColor       = this.parts[9].settings[3].value
            json.ChestHairColor      = this.char.ChestHairColor

            return JSON.stringify(json)
        },

        updateParts () {
            for (let i = 0; i < this.parts.length; i++) {
                this.trigger('changeCharacterPart', JSON.stringify(this.parts[i]))
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
        parts: {
            handler () {
                this.trigger('changeCharacterPart', JSON.stringify(this.parts[this.selectedPartCategory]))
            },
            deep: true,
        },
    },

    computed: {
        calculateTotal () {
            return this.parts.reduce((total, part) => {
                return total + part.settings.reduce((total, setting) => {
                    if (setting.value !== setting.default && setting.price != null) {
                        return total + setting.price
                    }

                    return total
                }, 0)
            }, this.gender.male !== this.gender.default ? this.gender.price : 0)
        },

        getValidSettings () {
            return this.parts[this.selectedPartCategory].settings.filter(s => s.name)
        },
    },

    mounted () {
        this.convertJsonFromServer(this.char)
        this.addListeners()

        document.addEventListener('mousedown', this.onMouseDown)
        document.addEventListener('mouseup', this.onMouseUp)
    },

    destroyed () {
        document.removeEventListener('mousedown', this.onMouseDown)
        document.removeEventListener('mouseup', this.onMouseUp)
    },
}
</script>

<style lang="scss" scoped>
#gvmp-creator {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    font-family: "Oswald", sans-serif;

    & * {
        transition: background-color 200ms, box-shadow 200ms, border-color 200ms;
    }

    .left-menu,
    .right-menu {
        width: 41.666666666666664vh; /* 450px */
        background-color: #1f1f1f;
        border-radius: 0.46296296296296297vh; /* 5px */
        box-shadow: 0 0 0.9259259259259259vh 0 #000; /* 10px */
        overflow: hidden;
        color: white;
    }

    .left-menu {
        margin-left: 2.962962962962963vh; /* 32px */
    }

    .right-menu {
        margin-right: 2.962962962962963vh; /* 32px */
    }

    .menu-header {
        padding: 1.8518518518518519vh 1.4814814814814814vh; /* 20px 16px */
        background-color: #2f2f2f;
        max-height: 10vh;
        border-bottom: 1px solid #3e3e3e;

        h1 {
            margin: 0;
            line-height: normal;
            font-size: 2.2222222222222223vh; /* 24px */
        }
    }

    .menu-content {
        overflow-y: auto;
        max-height: 60vh;
    }

    .menu-footer {
        border-top: 1px solid #3e3e3e;
        padding: 1.8518518518518519vh 1.4814814814814814vh; /* 20px 16px */
        background-color: #2f2f2f;
        max-height: 20vh;
    }

    .menu-section {
        padding: 1.8518518518518519vh 1.4814814814814814vh; /* 20px 16px */

        p {
            margin: 0;
            font-size: 1.4814814814814814vh; /* 16px */
        }
    }

    .list-group {
        margin: 0;
        padding: 0;

        .list-group-item {
            padding: 1.4814814814814814vh; /* 16px */
            background-color: #2f2f2f;
            border: 1px solid #000;
            border-radius: 0.46296296296296297vh; /* 5px */
            font-size: 1.4814814814814814vh; /* 16px */
            margin-bottom: 1.4814814814814814vh; /* 16px */

            &.active {
                background-color: #c24e00;
                border-color: #f60;
            }

            &:last-of-type {
                margin-bottom: 0;
            }
        }

        a.list-group-item:not(.active) {
            cursor: pointer;

            &:hover {
                background-color: #454545;
                //border-color: #2f2f2f;
                box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
            }
        }
    }

    /* Utilities */
    .costs {
        color: lawngreen;
    }

    .text-center {
        text-align: center;
    }

    .flex-full {
        flex: 1;
    }

    .text-secondary {
        color: #a0a0a0 !important;
    }

    .small {
        font-size: 1.1851851851851851vh !important; /* 12,8px */
    }

    .m-l-1 {
        margin-left: 0.7407407407407407vh !important; /* 8px */
    }

    .m-l-3 {
        margin-left: 1.4814814814814814vh !important; /* 16px */
    }

    .m-r-1 {
        margin-right: 0.7407407407407407vh !important; /* 8px */
    }

    .m-r-3 {
        margin-right: 1.4814814814814814vh !important; /* 16px */
    }

    .m-b-3 {
        margin-bottom: 1.4814814814814814vh !important; /* 16px */
    }

    .menu-btn {
        cursor: pointer;
        padding: 1.1111111111111112vh 1.4814814814814814vh; /* 12px 16px */
        border-radius: 0.46296296296296297vh; /* 5px */
        color: white;
        font-size: 1.4814814814814814vh; /* 16px */

        &:hover:not(.active) {
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
        }

        &:active:not(.active) {
            box-shadow: none;
        }

        &.secondary {
            background-color: #2f2f2f;
            border: 1px solid #000;

            &:hover:not(.active) {
                background-color: #454545;
            }
        }

        &.primary {
            background-color: #f60;
            color: #fff;
            border: 1px solid #c24e00;

            &:hover:not(.active) {
                background-color: #e05a00;
            }
        }

        &.active {
            background-color: #f60;
            color: #fff;
            border: 1px solid #c24e00;
        }
    }

    input[type="range"] {
        appearance: auto;
        color: rgb(16, 16, 16);
        cursor: default;
        padding: initial;
        border: initial;
        margin: 0.18518518518518517vh; /* 2px */
    }

    input[type='range'] {
        width: 100%;
    }

    input[type='range'],
    input[type='range']::-webkit-slider-runnable-track,
    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
    }

    input[type='range']::-webkit-slider-runnable-track {
        height: 0.2777777777777778vh; /* 3px */
        background: linear-gradient(to right, #f60, #f60), #5e5e5e;
        background-size: var(--background-size, 0%) 100%;
        background-repeat: no-repeat;
        border-radius: 0.46296296296296297vh; /* 5px */
    }

    input[type='range']::-webkit-slider-thumb {
        width: 1.4814814814814814vh; /* 15px */
        height: 1.4814814814814814vh; /* 15px */
        cursor: pointer;
        background: #c24e00;
        border: solid #f60 1px;
        border-radius: 50%;
        margin-top: -0.5555555555555556vh; /* 6px */
        box-shadow: 0 1px 0.2777777777777778vh rgba(0, 0, 0, 0.4); /* 3px */
    }
}
</style>