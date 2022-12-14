<template>
    <div>
        <component v-bind:is="componentName" :data="getdata"></component>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import LifeInvader from './TextInputBox/LifeInvader'
import Fuelstation from './TextInputBox/Fuelstation'
import Default from './TextInputBox/Default'

export default {
    name: 'TextInputBox',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            componentName: '',
            datacopy     : [],
            getdata      : this.data,
        }
    },

    components: {
        LifeInvader,
        Fuelstation,
        Default,
    },

    methods: {
        show: function (window, data = null) {
            this.data          = data
            this.componentName = window
            this.dismiss()
        },
        setProfile (number, money) {

            if (JSON.parse(this.data).textBoxObject.Callback == 'LifeInvaderPurchaseAd') {
                this.datacopy                       = JSON.parse(this.data)
                this.datacopy.textBoxObject.Title   = money
                this.datacopy.textBoxObject.Message = number
                this.getdata                        = JSON.stringify(this.datacopy)
                this.trigger('setblur', JSON.stringify({ x: 0, y: 0 }))
                this.componentName = 'LifeInvader'
            } else if (JSON.parse(this.data).textBoxObject.Callback == 'fillvehicle') {
                this.datacopy                       = JSON.parse(this.data)
                this.datacopy.textBoxObject.Title   = money
                this.datacopy.textBoxObject.Message = number
                this.getdata                        = JSON.stringify(this.datacopy)
                this.componentName                  = 'Fuelstation'
            } else {
                this.trigger('setblur', JSON.stringify({ x: 0, y: 0 }))
                this.componentName = 'Default'
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.card {
    background-color: rgba(23, 23, 23, 0.7);
    border-radius: 0%;
    font-family: Tahoma;
    border-top: 1rem solid #f57c00;
}

.secondary {
    border-radius: 0%;
    background-color: rgba(24, 23, 23, 0.7) !important;
}
</style>