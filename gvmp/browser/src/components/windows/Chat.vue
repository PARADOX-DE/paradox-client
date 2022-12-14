<template>
    <div>
        <input
            ref="chat"
            class="chat"
            type="text"
            v-model="message"
            v-on:keyup.enter="handleChatMessage"
            v-on:keyup.esc="disableChat"
            spellcheck="false"
            placeholder="Befehl eingeben.."
        />
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Chat',

    extends: BaseWindow,

    data () {
        return {
            message : '',
            messages: [],
            index   : -1,
        }
    },
    methods: {
        disableChat () {
            this.message = ''
            this.setChatFlag(false)
            this.dismiss()
        },
        handleChatMessage () {
            let userInput = this.message.substr(1)
            if (this.message != '' && this.message.charAt(0) == '/') {
                this.triggerServer('PlayerChat', userInput)
                this.trigger('pushCommand', JSON.stringify({ message: this.message }))
            }
            this.message = ''
            this.setChatFlag(false)
            this.dismiss()
        },
        setChatFlag (flag) {
            this.trigger('setChatFlag', flag)
        },
        onKeyUp (event) {
            if (!this.messages.length) return
            if (event.keyCode === 38) {
                this.index++
                if (this.index >= this.messages.length) {
                    this.index = this.messages.length - 1
                }
            } else if (event.keyCode === 40) {
                this.index--
                if (this.index <= 0) {
                    this.index = 0
                }
            } else if (event.keyCode === 13) {
                this.handleChatMessage()
            } else if (event.keyCode === 27) {
                this.disableChat()
            }
        },
        responseLastCommands (lastCommands) {
            this.messages = lastCommands.split(',')
        },
    },
    watch  : {
        index (index) {
            this.message = this.messages[index]
        },
    },
    created () {
        this.$nextTick(() => this.$refs.chat.focus())
    },
    mounted () {
        this.setChatFlag(true)
        window.addEventListener('keyup', this.onKeyUp)
    },
    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>

<style lang="scss" scoped>
input::placeholder {
    color: white;
}

.chat {
    border-radius: 1vh;
    margin-top: 1vh;
    margin-left: 1vh;
    background: rgba(128, 128, 128, 0.7);
    width: 40vh;
    padding-left: 1vh;
    color: #fff;
    font-size: 1.5vh;
    border: none;
    font-family: arial;
}
</style>