<!--TODO: add loading spinner-->
<template>
    <div class="workstationwindow">
        <div class="headline">
            <h1>{{ Workstation.Name }}</h1>
            <button class="cancelbtn" @click="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        <div v-if="Workstation.RequiredLevel > 0" class="levelbadge">
            <div class="text"><small>Benötigtes Level: </small><br>
                {{ Workstation.RequiredLevel }}
            </div>
        </div>
        <div class="content">
            <div class="sourceitems">
                <h4><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Benötigte Gegenstände</h4>
                <div class="item" v-for="item in SourceItems" :key="item.Name">
                    {{ item.Amount }}x {{ item.Name }}
                </div>
            </div>
            <div class="sourceitems">
                <h4><i class="fa fa-cart-plus" aria-hidden="true"></i> Endprodukte</h4>
                <div class="item" v-for="item in EndItems" :key="item.Name">
                    {{ item.Amount }}x {{ item.Name }}
                </div>
            </div>
            <div class="sourceitems info">
                <h4><i class="fa fa-info-circle" aria-hidden="true"></i> Information</h4>
                <div class="infocontent">
                    Willkommen in der Workstation "{{ Workstation.Name }}"<br><br>
                    Hier kannst du verschiedene Gegenstände verarbeiten lassen. Du kannst auch immer nur eine
                    Workstation besitzen... aber dazu gibts ja den Handel oder nich?
                    <br><br>
                    Gib mir ein bisschen Geld, für die ganzen Fixkosten (Strom etc..) Dann bring dein Zeug vorbei und
                    ich verarbeite dir es.<br><br>
                    Wenn ich es dann fertig habe kannst du es abholen, schau einfach mal gelegentlich vorbei!

                </div>
            </div>

            <div class="buttonarea">

                <div class="infowarning">
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Möchtest du dich in diese Workstation
                                                                                einmieten? <br><br>Solltest du bereits
                                                                                eine andere Workstation betreiben,
                                                                                entfernt der Staat alle deine
                                                                                Gegenstände, welche sich noch darin
                                                                                befinden.
                </div>
                <br>
                <small>Das Einmieten kostet einmalig $ {{ Price }}</small>
                <button class="select" @click="sendRentWorkstation()">Workstation mieten</button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Workstation',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            Workstation: JSON.parse(this.data).workstation,
            EndItems   : JSON.parse(this.data).endItems,
            SourceItems: JSON.parse(this.data).sourceItems,
            Price      : JSON.parse(this.data).price,
        }
    },
    methods: {

        cancel () {
            this.dismiss()
        },
        sendRentWorkstation () {
            this.triggerServer('RentWorkstationEvent', this.Workstation.Id)
            this.dismiss()
        },
    },
    mounted () {
    },
}
</script>

<style lang="scss" scoped>

.workstationwindow {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    width: 100vh;
    height: 56.25vh;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 0.46875vh;
    color: #ccc;
    font-size: 1.2vh;

    .cancelbtn {
        position: absolute;
        right: -3.3vh;
        top: 0.3vh;
        color: #ccc;
        font-size: 2vh;
        transform: skewX(-40deg);
    }

    .levelbadge {
        position: absolute;
        right: 3vh;
        top: 0vh;
        background-color: rgba(218, 114, 0, 0.8);
        color: #ccc;
        height: 7vh;
        padding: 1vh 4vh;
        text-align: center;
        font-size: 1.5vh;
        transform: skewX(40deg);

        .text {
            transform: skewX(-40deg);
        }
    }

    .headline {

        transform: skewX(40deg);
        background-color: rgba(255, 255, 255, 0.2);
        width: 94vh;
        margin-left: 3vh;
        border-bottom: 2px solid #ccc;

        h1 {
            transform: skewX(-40deg);
            margin: 0;
            padding-top: 1.5vh;
            height: 7vh;
            padding-bottom: 1vh;
            padding-left: 5vh;
            font-size: 3.5vh;
        }
    }

    .content {
        padding: 2vh 8vh;

        .sourceitems {
            background-color: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(0, 0, 0, 0.9);
            height: 25vh;
            width: 30%;
            float: left;
            margin-right: 2vh;

            h4 {
                background-color: rgba(255, 255, 255, 0.25);
                width: 100%;
                padding: 1.5vh 0;
                font-size: 1.5vh;
                margin-top: 0;
                color: orange;
                text-align: center;

                i {
                    margin-right: 1vh;
                }
            }

            .item {
                padding: 1vh 2vh;
            }
        }

        .info {
            float: right;
            height: 45vh;

            .infocontent {
                padding: 1vh 2vh;

            }
        }

        .buttonarea {
            float: left;
            width: 53vh;
            position: absolute;
            left: 8vh;
            bottom: 2vh;

            .select {
                background-color: rgba(218, 114, 0, 1);
                color: #000;
                width: 100%;
                padding: 1vh 0;
                font-size: 2vh;
                border: 1px solid rgba(0, 0, 0, 0.7);
                color: #fff;
                text-shadow: 1px 1px black;
            }


            .infowarning {
                padding: 1vh 2vh;
                background-color: rgba(255, 255, 255, 0.1);
                margin-top: 19.5vh;
                border: 1px solid rgba(0, 0, 0, 0.3);

                i {
                    margin-right: 1vh;
                    color: orange;
                }
            }
        }
    }
}
</style>

<!-- components.Windows.show("Workstation", '{"workstation":{"Id":1,"Name":"eine Orangenpresse","RequiredLevel":0},"endItems":[{"Id":304,"Name":"Orange","Amount":15},{"Id":972,"Name":"Orangensaft","Amount":5}],"sourceItems":[], "price": 2500}');-->