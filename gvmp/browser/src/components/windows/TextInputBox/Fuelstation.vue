<template>
    <div id="template">
        <div class="fuelstationlogo">
            <img class="logoimg" src="../../../assets/fuelstation/logo.png" />
            <button class="cancelbtn" @click="cancel"></button>
        </div>
        <div id="spritpreis">
            <img class="titleimg" src="../../../assets/fuelstation/pricelogo.png" />
            <div id="inputspritpreis">
                <h1>{{ fuelstation.textBoxObject.CustomData.Price }}$ / Liter</h1>
                <h4>Dieser Preis kann sich jederzeit &auml;ndern!</h4>
            </div>
        </div>
        <div id="fuelmenge">
            <img class="titleimg" src="../../../assets/fuelstation/fuellogo.png" />
            <div id="inputfuelmenge">
                <h2 class="litertop">Liter: {{ liter }}</h2>
                <h2>Preis: {{ myprice }}$</h2>
                <div id="fuelbuttons">
                    <button class="button imgfuel" @mousedown="fuelstart" @mouseup="fuelstop"></button>
                    <button class="button imgpay" :disabled="!myprice" @click="pay"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../../BaseWindow'

var timer

export default {
    name: 'Fuelstation',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            fuelstation: JSON.parse(this.data),
            maxliter   : parseInt(JSON.parse(this.data).textBoxObject.CustomData.MaxLiter),
            maxprice   : parseInt(JSON.parse(this.data).textBoxObject.Title),
            fueltime   : parseInt(JSON.parse(this.data).textBoxObject.CustomData.FuelTime),
            myprice    : 0,
            liter      : 0,
            warn       : false,
        }
    },
    methods: {
        fuelstart () {
            clearInterval(timer)
            timer = setInterval(this.fuel, this.fueltime)
        },
        fuelstop () {
            clearInterval(timer)
        },
        fuel () {
            this.liter += 1
            this.myprice += this.fuelstation.textBoxObject.CustomData.Price
            if (this.myprice > this.maxprice && this.warn == false) {
                this.warn = true
                this.liter -= 1
                this.myprice -= this.fuelstation.textBoxObject.CustomData.Price
                clearInterval(timer)
            } else if (this.liter > this.maxliter) {
                this.liter -= 1
                this.myprice -= this.fuelstation.textBoxObject.CustomData.Price
                clearInterval(timer)
            }
        },
        pay () {
            clearInterval(timer)
            this.triggerServer(this.fuelstation.textBoxObject.Callback, this.liter)
            this.maxliter = 0
            this.maxprice = 0
            this.dismiss()
        },
        cancel () {
            clearInterval(timer)
            this.maxliter = 0
            this.maxprice = 0
            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
#template {
    width: 37.5vh;
    height: 56.25vh;
    background-color: #000;
    border-radius: 0.3125vh;
    margin-left: auto;
    margin-top: 25vh;
    margin-right: 2.25vh;
    z-index: 999;
}

#spritpreis {
    width: 33.465vh;
    height: 16.59vh;
    margin-left: 1.969vh;
    margin-top: 2.4375vh;
    background-color: #5e5e5e;
    border-radius: 0.46875vh;
    position: relative;
}

#fuelmenge {
    width: 33.465vh;
    height: 18.945vh;
    margin-left: 1.969vh;
    margin-top: 2.4375vh;
    background-color: #5e5e5e;
    border-radius: 0.46875vh;
}

#inputspritpreis {
    width: 30.24vh;
    height: 9.375vh;
    margin-left: 1.5945vh;
    margin-top: 0.75vh;
    background-color: #262626;
    border-radius: 0.46875vh;
}

#inputfuelmenge {
    width: 30.24vh;
    height: 11.7195vh;
    margin-left: 1.5945vh;
    margin-top: 0.75vh;
    background-color: #262626;
    border-radius: 0.46875vh;
}

h1 {
    font-family: Arial;
    font-weight: bold;
    font-size: 4.6875vh;
    color: #fff;
    margin: 0;
    text-align: center;
    padding-top: 1.125vh;
}

h2 {
    font-family: Arial;
    font-weight: bold;
    font-size: 2.8125vh;
    color: #fff;
    margin: 0;
    text-align: center;
}

.litertop {
    padding-top: 0.75vh;
}

h4 {
    font-family: Arial;
    font-weight: bold;
    font-size: 1.40625vh;
    color: #fff;
    margin: 0;
    text-align: center;
}

#fuelbuttons {
    margin-top: 0.65625vh;
    text-align: center;
}

.button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    width: 13.5945vh;
    height: 3.0945vh;
}

.imgfuel {
    background: url(../../../assets/fuelstation/fuelbtn.png);
    background-size: cover;
}

.imgpay {
    margin-left: 0.75vh;
    background: url(../../../assets/fuelstation/paybtn.png);
    background-size: cover;
}

.button:disabled {
    opacity: 0.25;
}

.fuelstationlogo {
    position: relative;
}

.fuelstationlogo .cancelbtn {
    background: url(../../../assets/fuelstation/close.png);
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
</style>