<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Live News</div>
            <div class="right">
                <v-ons-toolbar-button>
                    <v-ons-icon icon="md-swap"></v-ons-icon>
                </v-ons-toolbar-button>
            </div>
        </v-ons-toolbar>
        <div>
            <iframe
                src="https://player.twitch.tv/?channel=weazelnewsgvmp"
                frameborder="0"
                allowfullscreen="false"
                scrolling="no"
                height="320px"
                width="100%"
            ></iframe>
        </div>
        <div>
            <small>FuchsTwitchBeta</small>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name: 'NewsLiveApp',
    extends: BaseApp,
    props: ['livenews'],
    data () {
        return {}
    },
    methods: {},
}
</script>

<style>
section {
    margin: 20px;
}
</style>
