<template>
    <div class="wrapper_CarColor">
        <div class="right_CarColor">
            <color-picker
                theme="light"
                :color="color"
                :sucker-hide="true"
                :sucker-canvas="suckerCanvas"
                :sucker-area="suckerArea"
                @changeColor="changeColor"
            />
            <br />
            <div class="button confirm">Farbe Speichern</div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
    name: 'CarColor',

    extends: BaseWindow,

    components: {
        colorPicker,
    },

    props: {
        data: String,
    },

    data () {
        return {
            color       : '#59c7f9',
            suckerCanvas: null,
            suckerArea  : [],
            isSucking   : false,
            suckerhide  : true,
        }
    },
    methods : {
        changeColor (color) {
            const { r, g, b, a } = color.rgba
            this.color           = `rgba(${r}, ${g}, ${b}, ${a})`
            console.log(this.color)
        },
    },
    computed: {},
    mounted () {

    },
}
</script>

<style lang="scss" scoped>
.wrapper_CarColor {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    color: #000;
    font-size: 1.6vh;
    z-index: 9999;
}

.right_CarColor {
    float: right;
    margin-top: 25%;
    margin-right: 4vh;
    position: relative;
}
</style>
