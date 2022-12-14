<template>
    <div style="position: relative;">
        <img id="death" width="100%" height="100%" src="../../assets/deathscreen.png">
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Death',

    extends: BaseWindow,

    data () {
        return {}
    },

    methods: {
        closeDeathScreen () {
            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
#death {
    opacity: 0.8;
}
</style>