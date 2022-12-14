<!--TODO: add loading spinner-->
<template>
    <div class="ejectWindow" style="">
        <div class="headline">
            <button class="cancelbtn" @click="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        <div class="content" style="max-height: 50vw; overflow-y: scroll">
            <div class="seatcontroller" v-for="item in Seats" :key="item.seatid">
                <div v-if="item.seatid < 0 || seatid > 99" class="seatcantused seatbutton"></div>
                <div v-else-if="item.used" @click="ejectAction(item.seatid)" class="seatused seatbutton"></div>
                <div v-else class="seatempty seatbutton"></div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'EjectWindow',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            Seats: JSON.parse(this.data).seats,
        }
    },
    methods: {

        cancel () {
            this.dismiss()
        },
        ejectAction (seatid) {
            this.triggerServer('ejectSeat', seatid)
            this.dismiss()
        },
    },
    mounted () {
    },
}
</script>

<style lang="scss" scoped>
.ejectWindow {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 22vh;
    padding: 2vh;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 0.46875vh;
    color: #ccc;
    font-size: 1.2vh;

    .cancelbtn {
        position: absolute;
        right: 1vh;
        top: 0.3vh;
        color: #ccc;
        font-size: 2vh;
    }

    .content {
        width: 20vh;

        &:after {
            content: "";
            display: table;
            clear: both;
        }

        .seatcontroller {
            float: left;
            padding: 2vh;

            .seatbutton {
                width: 5vh;
                height: 5vh;
                border-radius: 7vh;
            }

            .seatcantused {
                background-color: rgba(124, 227, 255, 0.5);
            }

            .seatused {
                background-color: rgba(0, 255, 0, 0.5);
                cursor: pointer;
            }

            .seatempty {
                background-color: rgba(255, 255, 255, 0.3);
            }
        }
    }
}
</style>