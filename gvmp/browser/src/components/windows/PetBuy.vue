<template>
    <div class="PetBuyWindows">
        <div class="headline">
            <h1>{{ PetShopData.Name }}</h1>
            <button class="cancelbtn" @click="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
        <div class="levelbadge">
            <div class="text"><small>Ab Level </small><br>
                {{ PetShopData.Level }}
            </div>
        </div>
        <div class="content">
            <div class="sourceitems">
                <h4><i class="fa fa-car" aria-hidden="true"></i> Tiere zum kauf</h4>
                <ul>
                    <li class="item" v-for="item in PetShopItems" :key="item.Id" @click="setChoosedItem(item)">
                        {{ item.Name }} <span>$ {{ item.Price }}</span>
                    </li>
                </ul>

            </div>
            <div class="sourceitems info">
                <h4><i class="fa fa-info-circle" aria-hidden="true"></i> Information</h4>
                <div class="infocontent">
                    <b>{{ PetShopData.Name }}</b><br><br>
                    Hier kannst du ein Tier bestellen, es wird zur nächsten Wende geliefert.<br>
                    <br>
                    <div v-if="ChoosedItem && ChoosedItem.ModelHash" class="choosed">
                        <small>Aktuell ausgewählt</small><br>
                        <br>
                        <img :src="require('@/assets/pets/'+ChoosedItem.ModelHash+'.png')"><br><br><br>
                        <center>
                            <div class="choosedname">
                                <div class="revert">{{ ChoosedItem.Name }}</div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>

            <div class="buttonarea">

                <div class="infowarning">
                    <i class="fa fa-exclamation-circle" aria-hidden="true"></i> Möchtest du dieses Tier kaufen?
                </div>
                <br>
                <button v-if="ChoosedItem" class="select" @click="sendRentWorkstation()">Tier kaufen</button>
                <button v-else class="select deactivated">Tier kaufen</button>
            </div>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'PetBuy',

    extends: BaseWindow,

    props: {
        data: String,
    },
    data () {
        return {
            PetShopData : JSON.parse(this.data),
            PetShopItems: JSON.parse(this.data).Items,
            ChoosedItem : null,
        }
    },
    methods: {

        cancel () {
            this.dismiss()
        },
        setChoosedItem (item) {
            this.ChoosedItem = item
        },
        sendRentWorkstation () {
            this.triggerServer('PetBuyAction', this.PetShopData.Id, this.ChoosedItem.Id)
            this.dismiss()
        },
    },
    mounted () {
    },
}
</script>

<style lang="scss" scoped>

.PetBuyWindows {
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

    .notavailable {
        background-color: rgba(255, 255, 255, 0.3);
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
            width: 55vh;
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
                padding: 1vh 3vh;
                cursor: pointer;
                font-weight: bold;

                &:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                span {
                    float: right;
                    color: orange;
                }
            }
        }

        .info {
            float: right;
            height: 45vh;
            width: 25vh;

            .infocontent {
                padding: 1vh 2vh;
            }

            img {
            }

            .choosedname {
                padding: 1vh 1vh;
                background-color: rgba(255, 255, 255, 0.3);

                .revert {
                    font-weight: bold;
                    color: orange;
                }
            }
        }

        .buttonarea {
            float: left;
            width: 55vh;
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
                cursor: pointer;
            }

            .deactivated {
                background-color: rgba(255, 255, 255, 0.3);
                cursor: auto;
            }


            .infowarning {
                padding: 1vh 2vh;
                background-color: rgba(255, 255, 255, 0.1);
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
<!--
components.Windows.show("PetBuy", '{"Id":1,"Name":"Tierhandel Sandy-Shores","Level": 5,"Items":[{"Id":95,"Name":"Retriever","Price":1337, "ModelHash": "shepherd"},{"Id":96,"Name":"Rottweiler","Price":1337, "ModelHash": "chop"},{"Id":97,"Name":"Fahrrad333","Price":1337, "ModelHash": "chop"}]}');

-->