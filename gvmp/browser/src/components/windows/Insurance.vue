<!--TODO: add loading spinner-->
<template>
    <div class="insurancewindow">
        <div class="headline">
            <button class="cancelbtn" @click="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        <div class="item">
            <h3 style="color: lightgrey"><i class="fa fa-heart" aria-hidden="true"></i> Keine Versicherung</h3>

            <br>
            <br>
            <h4><i class="fa fa-sticky-note" aria-hidden="true"></i> Kostenübernahme</h4>
            <ul>
                <li>0% im Komafall</li>
                <li>0% bei Behandlungen</li>
                <li>0% bei Arbeitsunfähigkeit</li>
            </ul>
            <br>
            <br>
            <h4><i class="fa fa-usd" aria-hidden="true"></i> Kosten</h4>
            <ul>
                <li>Keine</li>
            </ul>

            <button class="select" @click="sendInput(0)">AUSWÄHLEN</button>
        </div>
        <div class="item">
            <h3><i class="fa fa-heart" aria-hidden="true"></i> Krankenversicherung</h3>

            <br>
            <br>
            <h4><i class="fa fa-sticky-note" aria-hidden="true"></i> Kostenübernahme</h4>
            <ul>
                <li>50% im Komafall</li>
                <li>50% bei Behandlungen</li>
                <li>0% bei Arbeitsunfähigkeit</li>
            </ul>
            <br>
            <br>
            <h4><i class="fa fa-usd" aria-hidden="true"></i> Kosten</h4>
            <ul>
                <li>$ 1.275 / Payday</li>
            </ul>

            <button class="select" @click="sendInput(1)">AUSWÄHLEN</button>
        </div>
        <div class="item">
            <h3><i class="fa fa-heartbeat" aria-hidden="true"></i> Privatversicherung</h3>

            <br>
            <br>
            <h4><i class="fa fa-sticky-note" aria-hidden="true"></i> Kostenübernahme</h4>
            <ul>
                <li>100% im Komafall</li>
                <li>100% bei Behandlungen</li>
                <li>25% bei Arbeitsunfähigkeit</li>
            </ul>
            <br>
            <br>
            <h4><i class="fa fa-usd" aria-hidden="true"></i> Kosten</h4>
            <ul>
                <li>$ 5.000 / Payday</li>
            </ul>

            <button class="select" @click="sendInput(2)">AUSWÄHLEN</button>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Insurance',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {}
    },

    methods: {
        cancel () {
            this.dismiss()
        },

        sendInput (item) {
            this.triggerServer('setInsurance', item)
            this.dismiss()
        },
    },
}
</script>

<style lang="scss" scoped>
.insurancewindow {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100vh;
    height: 56.25vh;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0.46875vh;
    padding: 1vh;
    color: #ccc;
    font-size: 1.2vh;

    .cancelbtn {
        position: absolute;
        right: 0.5vh;
        top: 0.3vh;
        color: #ccc;
        font-size: 2vh;
    }

    .item {
        width: 30vh;
        background-color: rgba(0, 0, 0, 0.4);
        float: left;
        height: 48vh;
        margin-left: 2vh;
        text-align: center;
        margin-top: 2vh;

        h3 {
            color: #ccc;
            background-color: rgba(0, 0, 0, 0.4);
            width: 100%;
            padding: 2vh 0;
            font-size: 2vh;
            margin-top: 0;
            color: orange;

            i {
                margin-right: 1vh;
            }
        }

        .select {
            background-color: rgba(218, 114, 0, 1);
            color: #000;
            width: 100%;
            padding: 1vh 0;
            font-size: 2vh;
            margin-top: 9vh;
            font-weight: bold;
        }

        .select:hover {
            background-color: orange;
            cursor: pointer;
        }
    }
}
</style>