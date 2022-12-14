<template>
    <div id="flexbox">
        <!--        v-bind:class="[ flyerData.vertical ? 'v-image' : 'h-image' ]"-->
        <div id="flyer">
            <div class="flyer-card">
                <div class="flyer-header">
                    <span class="flyer-title">{{ flyerData.title }}</span>
                    <span class="flyer-action">
                        <v-ons-icon icon="md-close" @click="terminate()"></v-ons-icon>
                    </span>
                    <div class="clearfix"></div>
                </div>
                <div class="flyer-body">
                    <div class="flyer-image">
                        <img :src="flyerData.url" :alt="flyerData.title">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Flyer',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            flyerData: JSON.parse(this.data),
            /* flyerData: {
                title: "Testbild",
                url: "https://prnt.sc/kka97j",
                vertical: false
            },*/
        }
    },
    methods: {
        terminate () {
            this.dismiss()
        },
    },
    mounted () {

    },
}
</script>

<style lang="scss" scoped>
@import "../../../stylesheets/gvmp/gvmp_colors";
@import "../../../stylesheets/gvmp/interfaces/windows/flyer";
</style>
