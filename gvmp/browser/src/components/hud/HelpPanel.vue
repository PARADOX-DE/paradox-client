<template>
    <div class="panel help" v-show="showHelpPanel">
        <div class="indicator"></div>
        <div>
            <img src="../../assets/hud_icons/inventory.svg" />
            <span>I</span>
        </div>
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="#FFFFFF"
                    d="M16,18H7V4H16M11.5,22A1.5,1.5 0 0,1 10,20.5A1.5,1.5 0 0,1 11.5,19A1.5,1.5 0 0,1 13,20.5A1.5,1.5 0 0,1 11.5,22M15.5,1H7.5A2.5,2.5 0 0,0 5,3.5V20.5A2.5,2.5 0 0,0 7.5,23H15.5A2.5,2.5 0 0,0 18,20.5V3.5A2.5,2.5 0 0,0 15.5,1Z"
                />
            </svg>
            <span>F2</span>
        </div>
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#FFFFFF" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
            <span>X</span>
        </div>
        <div>
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="#FFFFFF"
                    d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"
                />
            </svg>
            <span>Y</span>
        </div>
        <div v-if="voiceRadioVisible">
            <svg width="24" height="24" viewBox="0 0 24 24">
                <path
                    fill="#FFFFFF"
                    d="M9,2A1,1 0 0,0 8,3C8,8.67 8,14.33 8,20C8,21.11 8.89,22 10,22H15C16.11,22 17,21.11 17,20V9C17,7.89 16.11,7 15,7H10V3A1,1 0 0,0 9,2M10,9H15V13H10V9Z"
                />
            </svg>
            <span>&#11138;</span>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'HelpPanel',
    extends: BaseComponent,
    data () {
        return {
            showHelpPanel    : false,
            voiceRadioVisible: false,
        }
    },
    methods: {
        toggle () {
            this.showHelpPanel = this.showHelpPanel ? false : true
        },
    },
}
</script>

<style lang="scss" scoped>

</style>