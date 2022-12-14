<template>
    <div id="app">
        <Windows />
        <Hud />
    </div>
</template>

<script>
import Windows from './components/Windows'
import Hud from './components/hud/Hud'

export default {
    components: {
        Windows,
        Hud,
    },
}
</script>

<style lang="scss">
@import "../stylesheets/ingame.scss";
@import "../stylesheets/fuchsi.css";
@import "../stylesheets/components/devices/devices.scss";

body {
    touch-action: initial !important;
}
</style>
