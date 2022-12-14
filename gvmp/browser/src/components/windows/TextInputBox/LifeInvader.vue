<template>
    <div id="template">
        <div class="lifeinvaderlogo">
            <img class="logoimg" src="../../../assets/lifeinvader/logo.png" />
            <button class="cancelbtn" @click="cancel"></button>
        </div>
        <div id="advertising">
            <img class="titleimg" src="../../../assets/lifeinvader/title1.png" />
            <div id="inputadvertising">
                <textarea
                    style="width: 30.24vh; height: 9.375vh; resize: none; border-radius: 0.46875vh; font-size: 2vh; font-family: Arial;"
                    placeholder="Ihr Werbetext hier..."
                    :maxlength="maxadlength()"
                    type="text"
                    v-model="content"
                    autofocus
                />
            </div>
        </div>
        <div id="contactdata">
            <img class="titleimg" src="../../../assets/lifeinvader/title2.png" />
            <div id="inputcontactdata">
                <h5 style="padding-top: 1.5vh;">
                    Telefonnummer: <input class="numberInput" v-model="number" type="number" />
                </h5>
                <h5>
                    Preis: {{ setprice() }}$
                </h5>
                <div id="advertbutton">
                    <button class="button imgpay" @click="pay"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../../BaseWindow'

export default {
    name: 'LifeInvader',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            content   : '',
            money     : parseInt(JSON.parse(this.data).textBoxObject.Title),
            number    : JSON.parse(this.data).textBoxObject.Message,
            inputData : JSON.parse(this.data),
            charAmount: 0,
            newMessage: '',
        }
    },
    methods: {
        handle () {
            if (this.content == '') return
            this.triggerServer(this.inputData.textBoxObject.Callback, this.content)
            this.dismiss()
        },
        pay () {
            if (this.content != '' && this.number != 's') {
                this.content = this.content.replace(/(\r\n|\n|\r)/gm, ' ')
                this.checkInput()
                this.content = this.content + '$$$$' + this.number
                this.handle()
            }
        },
        checkInput () {
            for (this.charAmount = 0; this.charAmount < this.content.length; this.charAmount++) {
                if ([' ', 'ä', 'ö', 'ü', 'ß', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-', '_', '|', '§', '$', '%', '&', '#', ':', '*', '+', '?', '!', '='].indexOf(this.content[this.charAmount].toLowerCase()) == -1) {
                    this.newMessage += '-'
                } else {
                    this.newMessage += this.content[this.charAmount]
                }
            }
            this.content    = ''
            this.content    = this.newMessage
            this.newMessage = ''
        },
        cancel () {
            this.dismiss()
        },
        setprice () {
            var price = this.content.length
            price     = price + this.number.length
            price     = price + 4
            price     = price * 5
            return price
        },
        maxadlength () {
            var maxlength = 96 - this.number.length - 4
            var maxprice  = 96 * 5
            if (this.money < maxprice) {
                maxprice  = Math.floor(this.money / 5)
                maxlength = maxprice - this.number.length - 4
                if (maxlength < 0) {
                    maxlength = 0
                }
            }
            return maxlength
        },
    },
}
</script>

<style lang="scss" scoped>
#template {
    width: 37.5vh;
    height: 56.25vh;
    background-color: #fff;
    border-radius: 0.3125vh;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

#advertising {
    width: 33.465vh;
    height: 16.59vh;
    margin-left: 1.969vh;
    margin-top: 2.4375vh;
    background-color: #5e5e5e;
    border-radius: 0.46875vh;
    position: relative;
}

#contactdata {
    width: 33.465vh;
    height: 18.945vh;
    margin-left: 1.969vh;
    margin-top: 2.4375vh;
    background-color: #5e5e5e;
    border-radius: 0.46875vh;
}

h5 {
    font-family: Arial;
    font-size: 2vh;
    color: #000;
    margin: 0;
    margin-top: 0.7vh;
    text-align: center;
}

.numberInput {
    font-family: Arial;
    font-size: 2vh;
    color: #000;
    width: 6vh;
    margin: 0;
    padding: 0;
}

#inputadvertising {
    width: 30.24vh;
    height: 9.375vh;
    margin-left: 1.5945vh;
    margin-top: 0.75vh;
    background-color: #fff;
    border-radius: 0.46875vh;
}

#inputcontactdata {
    width: 30.24vh;
    height: 11.7195vh;
    margin-left: 1.5945vh;
    margin-top: 0.75vh;
    background-color: #fff;
    border-radius: 0.46875vh;
    text-align: center;
}

#advertbutton {
    margin-top: 0.65625vh;
    text-align: center;
}

.button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 28.125vh;
    height: 3.0945vh;
}

.imgpay {
    background: url(../../../assets/lifeinvader/buybtn.png);
    background-size: cover;
}

.button:disabled {
    opacity: 0.25;
}

.lifeinvaderlogo {
    position: relative;
}

.lifeinvaderlogo .cancelbtn {
    background: url(../../../assets/lifeinvader/closebtn.png);
    background-size: cover;
    background-color: transparent;
    background-repeat: no-repeat;
    position: absolute;
    top: 0%;
    right: 0%;
    border: none;
    width: 3.75vh;
    height: 2.907vh;
}

.titleimg {
    width: 33.465vh;
    height: 4.125vh;
}

.logoimg {
    width: 37.5vh;
    height: 13.407vh;
}

input[type='number'] {
    -moz-appearance: textfield;
    border-bottom-style: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>