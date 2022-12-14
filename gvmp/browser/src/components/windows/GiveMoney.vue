<template>
    <div class="givemoney">
        <div class="head">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr);">
                <h3>Geld geben</h3>
                <i v-on:click="terminate" class="fas fa-times"></i>
            </div>
        </div>

        <div class="content">
            <input class="secondary" placeholder="Geldbetrag" type="number" v-model="money" autofocus /><br>

            <button class="btn primary" :disabled="(money == null || money == 0)" v-on:click="handle">
                Bestätigen
            </button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'GiveMoney',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            moneyData: JSON.parse(this.data),
            money    : null,
        }
    },

    methods: {
        handle () {
            if (this.money == null) return
            this.triggerServer('GivePlayerMoney', this.moneyData.name, this.money)
            this.dismiss()
        },

        terminate () {
            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
.givemoney {
    margin-top: 37.3vh;
    border-radius: 1vh;
    background-color: rgba(0, 0, 0, 0.8);
    margin-left: auto;
    margin-right: auto;
    width: 41vh;
    height: 25.7vh;

    .head {
        border-top-right-radius: 1vh;
        border-top-left-radius: 1.7vh;
        background-color: rgba(218, 114, 0, 0.8);
        transform: skewX(40deg);
        margin: 0 4vh 0 2vh;

        h3 {
            margin-top: 1.5vh;
            margin-bottom: 1.5vh;
            font-size: 3vh;
            color: #ccc;
            font-weight: 400;
            margin-left: 3vh;
            width: 25vh;
            text-align: left;
            transform: skewX(-40deg);
        }

        i {
            font-size: 3.5vh;
            color: #ccc;
            text-align: right;
            margin-right: -2.5vh;
            margin-top: 0.5vh;
            transform: skewX(-40deg);
        }

        i:hover {
            color: #fff;
            transition: color 0.5s;
        }

    }

    .content {
        input {
            margin-top: 2.5vh;
            margin-left: 3vh;
            margin-right: 3vh;
            width: 35vh;
            height: 5vh;
            font-size: 2vh;
            color: #ccc;

            &::placeholder {
                color: grey;
            }
        }

        button {
            font-size: 1.5vh;
            margin-left: 3vh;
            height: 4vh;
            background-color: rgba(218, 114, 0, 0.8);

            &.btn {
                border-radius: 0.5vh;
                padding: 2vh;
                line-height: 0;
                margin-top: 2vh;
            }
        }
    }
}
</style>
<!-- components.Windows.show("GiveMoney") -->