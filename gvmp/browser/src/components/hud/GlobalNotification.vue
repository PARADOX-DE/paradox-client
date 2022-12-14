<template>
    <div id="GlobalNotification">
        <transition name="fade">
            <div v-if="show" class="GlobalNotification" v-bind:style="{ color: textcolor, borderColor: textcolor }">
                <div class="icons">
                    <span v-if="icon === 'glob'"><i class="fa fa-exclamation-triangle fa-2x"></i></span>
                    <span v-else-if="icon === 'dev'"><i class="fa fa-user-secret fa-2x"></i></span>
                    <span v-else-if="icon === 'gov'"><i class="fa fa-bullhorn fa-2x"></i></span>
                    <span v-else-if="icon === 'wed'"><i class="fa fa-bell fa-2x"></i></span>
                    <span v-else-if="icon === 'casino'"><i class="far fa-gem fa-2x"></i></span>
                </div>
                <div class="message">{{ message }}</div>
                <div class="clearfix"></div>
            </div>
            <!-- O: user-graduate, E: user-secret, Gov: user-shield -->
        </transition>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name   : 'GlobalNotification',
    extends: BaseComponent,
    data () {
        return {
            message  : '',
            duration : 0,
            timeout  : '',
            icon     : '',
            textcolor: '',
            show     : false,
        }
    },
    methods: {
        remove               : function () {
            this.show = false
        },
        setGlobalNotification: function (message, duration, textcolor, icon) {
            this.message   = message
            this.duration  = duration
            this.textcolor = textcolor
            this.icon      = icon
            this.show      = true
            this.timeout   = setTimeout(this.remove, this.duration)
        },
    },
}
</script>

<style lang="scss" scoped>

.fade-leave-active,
.fade-enter-active {
    transition: 2s, opacity 1s;
}

.fade-enter {
    transform: translate(-100%, 0);
    opacity: 0;
}

.fade-leave-to {
    transform: translate(100%, 0);
    opacity: 0;
}

.GlobalNotification {
    color: #e89900;
    margin-top: -6%;
    margin-left: auto;
    margin-right: auto;
    width: 60vh;
    height: auto;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    border-color: #e89900;
    padding: 1vh 1vh;
    position: relative;
}

.icons {
    padding: 1vh;
    position: absolute;
    top: 50%;
    left: -0vh;
    transform: translate(-50%, -50%);
    background-color: rgba(232, 153, 0, 1);
    border-radius: 0.35em;
    color: #fff;

    &.i {
        vertical-align: middle;
    }
}

.message {
    padding-left: 3em;
}

.clearfix {
    clear: both;
}

</style>

<!--  check -->