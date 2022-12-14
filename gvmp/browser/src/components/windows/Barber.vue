<template>
    <div id="wrapper" class="jumbotron center card">
        <div id="frisur_box">
            <div class="hair">
                <div class="titel">Frisur</div>

                <div class="slidecontainer">
                    <p>
                        Frisur: <span>{{ currentHair.name }}</span>

                        <span
                            @click="loadDefault('setHairVariant')"
                            class="button_small"
                        >x</span>
                    </p>

                    <input
                        v-model.number="hairVariant"
                        type="range"
                        min="0"
                        :max="barber.hairs.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer">
                    <p>
                        Erste Haarfarbe: <span>{{ currentHairColor1.name }}</span>
                    </p>

                    <input
                        v-model.number="hair.color1"
                        type="range"
                        min="0"
                        :max="barber.colors.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer">
                    <p>
                        Zweite Haarfarbe: <span>{{ currentHairColor2.name }}</span>
                    </p>

                    <input
                        v-model.number="hair.color2"
                        type="range"
                        min="0"
                        :max="barber.colors.length - 1"
                        class="slider"
                    >
                </div>
            </div>

            <div class="beard">
                <div class="titel">Bart</div>

                <div class="slidecontainer">
                    <p>
                        Bartvariante: <span>{{ currentBeard.name }}</span>

                        <span
                            @click="loadDefault('setBeard')"
                            class="button_small"
                        >x</span>
                    </p>

                    <input
                        v-model.number="beard.variation"
                        type="range"
                        min="0"
                        :max="barber.beards.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer">
                    <p>
                        Barthaarfarbe: <span>{{ currentBeardColor.name }}</span>
                    </p>

                    <input
                        v-model.number="beard.color"
                        type="range"
                        min="0"
                        :max="barber.colors.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer">
                    <p>
                        Bartstärke: <span>{{ beard.opacity }}</span>
                    </p>

                    <input v-model.number="beard.opacity" type="range" min="0" max="1" step="0.01" class="slider">
                </div>
            </div>

            <div class="chestHair">
                <div class="titel">Brusthaare</div>

                <div class="slidecontainer">
                    <p>
                        Variante: <span>{{ currentChestHair.name }}</span>

                        <span
                            @click="loadDefault('setChestHair')"
                            class="button_small"
                        >x</span>
                    </p>

                    <input
                        v-model.number="chestHair.variation"
                        type="range"
                        min="0"
                        :max="barber.chests.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer">
                    <p> Haarfarbe: <span>{{ currentChestHairColor.name }}</span></p>

                    <input
                        v-model.number="chestHair.color"
                        type="range"
                        min="0"
                        :max="barber.colors.length - 1"
                        class="slider"
                    >
                </div>

                <div class="slidecontainer"><p> Stärke: <span>{{ chestHair.opacity }}</span></p>
                    <input v-model.number="chestHair.opacity" type="range" min="0" max="1" step="0.01" class="slider">
                </div>
            </div>

            <div id="button_close">
                <div class="kosten">Kosten: {{ formatPrice(total) }}</div>

                <div class="button2" @click="buy">Kaufen</div>

                <div class="button2_leave" @click="close">Verlassen</div>
            </div>

            <p style="font-size: .8rem; text-align: center; color: grey">
                Rechte Maustaste gedrückt halten, um die Kamera zu drehen.
            </p>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Barber',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        const res = JSON.parse(this.data)

        return {
            barber: res.barber,
            player: res.player,

            hairVariant: 0,

            hair: {
                color1: 0,
                color2: 0,
            },

            beard: {
                variation: 0,
                color    : 0,
                opacity  : 0,
            },

            chestHair: {
                variation: 0,
                color    : 0,
                opacity  : 0,
            },

            currentMousePositionX: null,
        }
    },

    methods: {
        buy () {
            this.triggerServer('barberShopBuy', this.total, this.getJsonString())

            this.dismiss()
        },

        close () {
            this.triggerServer('barberShopExit')

            this.dismiss()
        },

        loadDefault (type) {
            switch (type) {
                case 'setHairVariant':
                    this.trigger('setHairVariant', this.player.hair)
                    this.hairVariant = 0

                    return

                case 'setBeard':
                    this.trigger('setBeard', JSON.stringify({
                        variation: this.player.beard,
                        color    : this.currentBeardColor.customid,
                        opacity  : this.beard.opacity,
                    }))
                    this.beard.variation = 0

                    return

                case 'setChestHair':
                    this.trigger('setChestHair', JSON.stringify({
                        variation: this.player.chestHair,
                        color    : this.currentChestHairColor.customid,
                        opacity  : this.chestHair.opacity,
                    }))
                    this.chestHair.variation = 0

                    return
            }
        },

        getJsonString () {
            return JSON.stringify({
                hair            : this.currentHair.customid,
                hairColor       : this.currentHairColor1.customid,
                hairColor2      : this.currentHairColor2.customid,
                beard           : this.currentBeard.customid,
                beardColor      : this.currentBeardColor.customid,
                beardOpacity    : this.beard.opacity,
                chestHair       : this.currentChestHair.customid,
                chestHairColor  : this.currentChestHairColor.customid,
                chestHairOpacity: this.chestHair.opacity,
            })
        },

        setSliders () {
            this.barber.colors.forEach((color, index) => {
                //console.log(color, index);
                if (color.customid == this.player.hairColor) {
                    this.hair.color1 = index
                    console.log('1' + JSON.stringify(color), index, color.customid)
                }
                if (color.customid == this.player.hairColor2) {
                    this.hair.color2 = index
                    console.log('2' + JSON.stringify(color), index, color.customid)
                }
                if (color.customid == this.player.beardColor) {
                    this.beard.color = index
                    console.log('b' + JSON.stringify(color), index, color.customid)
                }
                if (color.customid == this.player.chestHairColor) {
                    this.chestHair.color = index
                    console.log('c' + JSON.stringify(color), index, color.customid)
                }
            })

            this.beard.opacity     = this.player.beardOpacity
            this.chestHair.opacity = this.player.chestHairOpacity
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

            // if (x < 0) return
            //
            // if (normalOffset > 90) return
            //
            // if (normalOffset < -90) return

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
    },

    watch: {
        hairVariant () {
            this.trigger('setHairVariant', this.currentHair.customid)
        },

        hair: {
            handler () {
                this.trigger('setHairColor', JSON.stringify({
                    color1: this.currentHairColor1.customid,
                    color2: this.currentHairColor2.customid,
                }))
            },

            deep: true,
        },

        beard: {
            handler () {
                this.trigger('setBeard', JSON.stringify({
                    variation: this.currentBeard.customid,
                    color    : this.currentBeardColor.customid,
                    opacity  : this.beard.opacity,
                }))
            },

            deep: true,
        },

        chestHair: {
            handler () {
                this.trigger('setChestHair', JSON.stringify({
                    variation: this.currentChestHair.customid,
                    color    : this.currentChestHairColor.customid,
                    opacity  : this.chestHair.opacity,
                }))
            },

            deep: true,
        },
    },

    computed: {
        total () {
            return (this.currentHair.customid == this.player.hair ? 0 : this.currentHair.price) +
                (this.currentHairColor1.customid == this.player.hairColor ? 0 : this.currentHairColor1.price) +
                (this.currentHairColor2.customid == this.player.hairColor2 ? 0 : this.currentHairColor2.price) +
                (this.currentBeard.customid == this.player.beard ? 0 : this.currentBeard.price) +
                (this.currentBeardColor.customid == this.player.beardColor ? 0 : this.currentBeardColor.price) +
                (this.beard.opacity == this.player.beardOpacity ? 0 : 100) +
                (this.currentChestHair.customid == this.player.chestHair ? 0 : this.currentChestHair.price) +
                (this.currentChestHairColor.customid == this.player.chestHairColor ? 0 : this.currentChestHairColor.price) +
                (this.chestHair.opacity == this.player.chestHairOpacity ? 0 : 100)
        },

        currentHair () {
            return this.barber.hairs[this.hairVariant]
        },

        currentHairColor1 () {
            return this.barber.colors[this.hair.color1]
        },

        currentHairColor2 () {
            return this.barber.colors[this.hair.color2]
        },

        currentBeard () {
            return this.barber.beards[this.beard.variation]
        },

        currentBeardColor () {
            return this.barber.colors[this.beard.color]
        },

        currentChestHair () {
            return this.barber.chests[this.chestHair.variation]
        },

        currentChestHairColor () {
            return this.barber.colors[this.chestHair.color]
        },
    },

    mounted () {
        this.barber.hairs.unshift({ price: 0, name: 'Aktuell', customid: this.player.hair })
        this.barber.beards.unshift({ price: 0, name: 'Aktuell', customid: this.player.beard })
        this.barber.chests.unshift({ price: 0, name: 'Aktuell', customid: this.player.chestHair })

        this.setSliders()

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
#wrapper {
    width: 100%;
    height: 100%;
    background-size: 100%;
    background-color: rgba(0, 0, 0, 0)
}

#wrapper #frisur_box {
    width: 20%;
    background: #fdfdfd;
    float: right;
    right: 2%;
    position: relative;
    max-width: 1000px;
    padding: 20px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    border-radius: 5px;
    overflow: hidden;
}

#wrapper #frisur_box .titel {
    font-weight: 800;
    font-size: 1.3rem;
    margin-bottom: 10px;
    margin-top: 20px;
    text-align: left;
}

#wrapper #frisur_box .close {
    border-radius: 5px;
    background: #fd9600;
    padding: 5px 10px 5px 10px;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    color: #000;
    font-size: 1.3rem;
}

#wrapper #frisur_box .close .close:hover {
    background: #fdde81;
}

#wrapper #frisur_box .button2 {
    bottom: 0px;
    background: #fd9600;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    width: 50%;
    margin: 20px auto 20px auto;
    color: #000;
}

#wrapper #frisur_box .button2:hover {
    background: #f9ad3f;
    cursor: pointer;
}

#wrapper #frisur_box .button_small {
    background: #fd9600;
    border-radius: 5px;
    text-align: center;
    color: #000;
    padding: 0 0.5rem 0 0.5rem;
    margin-left: 1rem;
}

#wrapper #frisur_box .button_small:hover {
    background: #f9ad3f;
    cursor: pointer;
}

#wrapper #frisur_box .slidecontainer {
    width: 100%;
    text-align: center;
}

#wrapper #frisur_box .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
}

#wrapper #frisur_box .slider .slider:hover {
    opacity: 1;
}

#wrapper #frisur_box .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #fd9600;
    cursor: pointer;
}

#wrapper #frisur_box #button_close {
    margin-top: 20px;
}

#wrapper #frisur_box .button2_leave {
    bottom: 0px;
    background: #ccc;
    color: #000;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    text-align: center;
    width: 50%;
    margin: 5px auto 5px auto;
}

#wrapper #frisur_box .button2_leave:hover {
    background: #a8a8a8;
    cursor: pointer;
}

#wrapper #frisur_box .kosten {
    font-weight: 800;
    font-size: 1.3rem;
    color: #000;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
</style>

<!-- components.Windows.show("Barber", JSON.stringify({"hairs":[{"Id":1,"Name":"male_Glatze","CustomisationId":0,"Price":0,"Gender":0},{"Id":2,"Name":"","CustomisationId":1,"Price":0,"Gender":0},{"Id":3,"Name":"","CustomisationId":2,"Price":0,"Gender":0},{"Id":4,"Name":"","CustomisationId":3,"Price":0,"Gender":0},{"Id":5,"Name":"","CustomisationId":4,"Price":0,"Gender":0},{"Id":6,"Name":"","CustomisationId":5,"Price":0,"Gender":0},{"Id":7,"Name":"","CustomisationId":6,"Price":0,"Gender":0},{"Id":8,"Name":"","CustomisationId":7,"Price":0,"Gender":0},{"Id":9,"Name":"","CustomisationId":8,"Price":0,"Gender":0},{"Id":10,"Name":"","CustomisationId":9,"Price":0,"Gender":0},{"Id":11,"Name":"","CustomisationId":10,"Price":0,"Gender":0},{"Id":12,"Name":"","CustomisationId":11,"Price":0,"Gender":0},{"Id":13,"Name":"","CustomisationId":12,"Price":0,"Gender":0},{"Id":14,"Name":"","CustomisationId":13,"Price":0,"Gender":0},{"Id":15,"Name":"","CustomisationId":14,"Price":0,"Gender":0},{"Id":16,"Name":"","CustomisationId":15,"Price":0,"Gender":0},{"Id":17,"Name":"","CustomisationId":16,"Price":0,"Gender":0},{"Id":18,"Name":"","CustomisationId":17,"Price":0,"Gender":0},{"Id":19,"Name":"","CustomisationId":18,"Price":0,"Gender":0},{"Id":20,"Name":"","CustomisationId":19,"Price":0,"Gender":0},{"Id":21,"Name":"","CustomisationId":20,"Price":0,"Gender":0},{"Id":22,"Name":"","CustomisationId":21,"Price":0,"Gender":0},{"Id":23,"Name":"","CustomisationId":22,"Price":0,"Gender":0},{"Id":24,"Name":"","CustomisationId":23,"Price":0,"Gender":0},{"Id":25,"Name":"","CustomisationId":24,"Price":0,"Gender":0},{"Id":26,"Name":"","CustomisationId":25,"Price":0,"Gender":0},{"Id":27,"Name":"","CustomisationId":26,"Price":0,"Gender":0},{"Id":28,"Name":"","CustomisationId":27,"Price":0,"Gender":0},{"Id":29,"Name":"","CustomisationId":28,"Price":0,"Gender":0},{"Id":30,"Name":"","CustomisationId":29,"Price":0,"Gender":0},{"Id":31,"Name":"","CustomisationId":30,"Price":0,"Gender":0},{"Id":32,"Name":"","CustomisationId":31,"Price":0,"Gender":0},{"Id":33,"Name":"","CustomisationId":32,"Price":0,"Gender":0},{"Id":34,"Name":"","CustomisationId":33,"Price":0,"Gender":0},{"Id":35,"Name":"","CustomisationId":34,"Price":0,"Gender":0},{"Id":36,"Name":"","CustomisationId":35,"Price":0,"Gender":0},{"Id":37,"Name":"","CustomisationId":36,"Price":0,"Gender":0},{"Id":48,"Name":"","CustomisationId":72,"Price":0,"Gender":0},{"Id":49,"Name":"","CustomisationId":73,"Price":0,"Gender":0}],"colors":[{"Id":1,"Name":"Emiliabraun","CustomisationId":0,"Price":10000},{"Id":2,"Name":"Schwarzbraun","CustomisationId":1,"Price":5000},{"Id":3,"Name":"Braun","CustomisationId":2,"Price":5000},{"Id":4,"Name":"Kastanienbraun","CustomisationId":3,"Price":5000},{"Id":5,"Name":"Ahornbraun","CustomisationId":4,"Price":5000},{"Id":6,"Name":"Bieberbraun","CustomisationId":5,"Price":5000},{"Id":7,"Name":"Orangebraun","CustomisationId":6,"Price":5000},{"Id":8,"Name":"Mittelbraun","CustomisationId":7,"Price":5000},{"Id":9,"Name":"Nurablond","CustomisationId":8,"Price":10000},{"Id":10,"Name":"Dunkelblond","CustomisationId":9,"Price":5000},{"Id":11,"Name":"Blond","CustomisationId":10,"Price":5000},{"Id":12,"Name":"Mittelblond","CustomisationId":11,"Price":5000},{"Id":13,"Name":"Aschblond","CustomisationId":12,"Price":5000},{"Id":14,"Name":"Goldblond","CustomisationId":13,"Price":5000},{"Id":15,"Name":"Honigblond","CustomisationId":14,"Price":5000},{"Id":16,"Name":"Platinblond","CustomisationId":15,"Price":5000},{"Id":17,"Name":"Safranblond","CustomisationId":16,"Price":5000},{"Id":18,"Name":"Kastanienblond","CustomisationId":17,"Price":5000},{"Id":19,"Name":"Rotbraun","CustomisationId":18,"Price":5000},{"Id":20,"Name":"Dunkelrot","CustomisationId":19,"Price":5000},{"Id":21,"Name":"Mittelrot","CustomisationId":20,"Price":5000},{"Id":22,"Name":"Hellrot","CustomisationId":21,"Price":5000},{"Id":23,"Name":"Rotorange","CustomisationId":23,"Price":5000},{"Id":24,"Name":"Kupfer","CustomisationId":24,"Price":5000},{"Id":25,"Name":"Kupferleuchtend","CustomisationId":25,"Price":5000},{"Id":26,"Name":"Dunkelgrau","CustomisationId":26,"Price":5000},{"Id":27,"Name":"Mittelgrau","CustomisationId":27,"Price":5000},{"Id":28,"Name":"Grau","CustomisationId":28,"Price":5000},{"Id":29,"Name":"Weiss","CustomisationId":29,"Price":5000},{"Id":30,"Name":"Aschviolette","CustomisationId":30,"Price":5000},{"Id":31,"Name":"Aschlila","CustomisationId":31,"Price":5000},{"Id":32,"Name":"Erikaviolette","CustomisationId":32,"Price":5000},{"Id":33,"Name":"Magenta","CustomisationId":33,"Price":5000},{"Id":34,"Name":"Pink","CustomisationId":34,"Price":5000},{"Id":35,"Name":"Rosa","CustomisationId":35,"Price":5000},{"Id":36,"Name":"Türkis","CustomisationId":36,"Price":5000},{"Id":37,"Name":"Türkisblau","CustomisationId":37,"Price":5000},{"Id":38,"Name":"Blau","CustomisationId":38,"Price":5000},{"Id":39,"Name":"Alpfelgrün","CustomisationId":39,"Price":5000},{"Id":40,"Name":"Grün","CustomisationId":40,"Price":5000},{"Id":41,"Name":"Tannengrün","CustomisationId":41,"Price":5000},{"Id":42,"Name":"Gelbgrün","CustomisationId":42,"Price":5000},{"Id":43,"Name":"Neongrün","CustomisationId":43,"Price":5000},{"Id":44,"Name":"Rasengrün","CustomisationId":44,"Price":5000},{"Id":45,"Name":"Gelbblond","CustomisationId":45,"Price":5000},{"Id":46,"Name":"Gelb","CustomisationId":46,"Price":5000},{"Id":47,"Name":"Gelborange","CustomisationId":47,"Price":5000},{"Id":48,"Name":"Orange","CustomisationId":48,"Price":5000},{"Id":49,"Name":"Leuchtorange","CustomisationId":49,"Price":5000},{"Id":50,"Name":"Neonorange","CustomisationId":50,"Price":5000},{"Id":51,"Name":"Signalorange","CustomisationId":51,"Price":5000},{"Id":52,"Name":"Signalrot","CustomisationId":52,"Price":5000},{"Id":53,"Name":"Rubinrot","CustomisationId":53,"Price":5000},{"Id":54,"Name":"Feuerrot","CustomisationId":54,"Price":5000},{"Id":55,"Name":"Mahagonibraun","CustomisationId":55,"Price":5000},{"Id":56,"Name":"Schokobraun","CustomisationId":56,"Price":5000},{"Id":57,"Name":"Nussbraun","CustomisationId":57,"Price":5000},{"Id":58,"Name":"Braun","CustomisationId":58,"Price":5000},{"Id":59,"Name":"Glanzbraun","CustomisationId":59,"Price":5000},{"Id":60,"Name":"Graubraun","CustomisationId":60,"Price":5000},{"Id":61,"Name":"Schwarz","CustomisationId":61,"Price":5000},{"Id":62,"Name":"Nuttenblond","CustomisationId":62,"Price":5000},{"Id":63,"Name":"Wasserstoffblond","CustomisationId":63,"Price":5000},{"Id":64,"Name":"Ahornrot","CustomisationId":22,"Price":5000}]}) ) -->