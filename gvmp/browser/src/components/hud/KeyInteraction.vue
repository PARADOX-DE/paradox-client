<template>
    <div class="interaction-circle" v-if="visible">
        <div class="overflow-circle">
            <div class="inner-circle">
                <p v-if="keys.length > 0">{{ keys[0] }}</p>
            </div>
            <div class="progress-circle" :style="'height:' + progress + '%'"></div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'KeyInteraction',
    extends: BaseComponent,
    data () {
        return {
            visible     : false,
            keys        : [],
            progress    : 0,
            progressStep: 0,
            possibleKeys: [
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z',
            ],
        }
    },
    methods: {
        onKeyUp : function (event) {
            this.sendKey(String.fromCharCode(event.keyCode))
        },
        start   : function () {
            this.keys         = this.generateKeys()
            this.visible      = true
            this.progress     = 0
            this.progressStep = 100 / this.keys.length
        },
        stop    : function () {
            this.visible = false
        },
        mounted : function () {
            window.addEventListener('keyup', this.onKeyUp)
        },
        detroyed: function () {
            window.removeEventListener('keyup', this.onKeyUp)
        },
        sendKey (key) {
            let keyToPress = this.keys.shift()
            let keyPressed = key.toUpperCase()
            if (keyToPress != keyPressed) {
                this.stop()
                //Todo: color progress circle red for 2 sec and replace letter with x icon
                return
            }
            this.progress += this.progressStep
            if (this.keys.length == 0) {
                //Sucessfully pressed all keys
                //Todo: color progress circle green for 2 sec and replace letter with check icon
                this.stop()
            }
        },
        generateKeys: function () {
            var keys = []
            for (var i = 0; i < 4; i++)
                keys.push(
                    this.possibleKeys[
                        Math.floor(Math.random() * this.possibleKeys.length)
                        ],
                )

            return keys
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/components/shadow";
@import "../../../stylesheets/components/color";

.interaction-circle {
    height: 10vw;
    width: 10vw;
    position: relative;

    .overflow-circle {
        overflow: hidden;
        border-radius: 100%;
        position: relative;
        width: 101%; // 101% fixes cutted border by overflow: hidden
        height: 101%;
        padding: 2vw;

        .inner-circle {
            border-radius: 100%;
            height: 6vw;
            width: 6vw;
            background-color: $light-blue-500;

            p {
                line-height: 6vw;
                color: white;
                text-align: center;
                font-size: 3vw;
            }
        }

        .progress-circle {
            height: 100%;
            width: 100%;
            position: absolute;
            background-color: $blue-500;
            bottom: 0;
            left: 0;
            z-index: -1;
            transition: height 0.2s linear;
        }
    }
}
</style>