<template>
    <v-ons-page class="streifenapp">
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Streifen App - TO PROTECT AND SERVE</div>
        </v-ons-toolbar>
        <div class="app_content">
            <div class="headline">
                <div v-if="info" class="item">
                    <div v-for="item in info.items" :key="item.desc">
                        <div class="desc">{{ item.desc }}</div>
                        <br>
                        <div class="value">{{ item.val }}</div>
                    </div>
                </div>
                <div class="ampel">
                    <div v-bind:class="'button_1 ' + (info.state == 1 ? 'active' : '')" v-on:click="setState(1)"></div>
                    <div v-bind:class="'button_2 ' + (info.state == 2 ? 'active' : '')" v-on:click="setState(2)"></div>
                    <div v-bind:class="'button_3 ' + (info.state == 3 ? 'active' : '')" v-on:click="setState(3)"></div>
                </div>
                <div class="add_Button">
                    <button v-on:click="changeEditMode()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        Streifen bearbeiten
                    </button>
                </div>
            </div>
            <div class="flex-container">
                <ul class="streifenlist">
                    <li class="streife" v-for="streife in streifen" :key="streife.id">
                        <div v-if="editmode" v-bind:class="'headinfo ampel_' +streife.state">
                            <span><input
                                :readonly="!editmode"
                                v-model="streife.name"
                                maxlength="24"
                                placeholder="Streifenname"
                            /> </span>
                            <i class="fa fa-trash" aria-hidden="true" v-on:click="deleteStreife(streife)"></i>
                            <i class="fa fa-floppy-o" aria-hidden="true" v-on:click="updateStreife(streife)"></i>
                        </div>
                        <div v-else v-bind:class="'headinfo ampel_' +streife.state">
                            <div class="kfzicon">
                                <i v-if="streife.kfz == 4" class="fa fa-motorcycle" aria-hidden="true"></i>
                                <i v-else-if="streife.kfz == 3" class="fa fa-plane" aria-hidden="true"></i>
                                <i v-else-if="streife.kfz == 2" class="fa fa-ship" aria-hidden="true"></i>
                                <i v-else class="fa fa-car" aria-hidden="true"></i>
                            </div>
                            <div class="actions">
                                <i class="fa fa-podcast" aria-hidden="true" v-on:click="findStreife(streife)"></i>
                                <i
                                    class="fa fa-life-ring"
                                    aria-hidden="true"
                                    v-on:click="askSupportStreife(streife)"
                                ></i>
                            </div>
                            <div class="infoname">{{ streife.name }}<br>
                                <small>
                                    {{ streife.location }}
                                </small>
                            </div>
                        </div>
                        <div class="vehicleinfo">
                            <div class="vehdata">
                                <input
                                    :readonly="!editmode"
                                    type="number"
                                    v-model="streife.vehid"
                                    maxlength="10"
                                    placeholder="KFZ-Id"
                                />
                                {{ streife.vehname }}
                            </div>
                            <div class="status">
                                <input :readonly="!editmode" v-model="streife.code" maxlength="8" placeholder="Code" />
                            </div>
                        </div>
                        <table class="officers">
                            <tr v-for="officer in streife.officers" :key="officer.name">
                                <td width="10%">{{ officer.rank }}</td>
                                <td width="55%">{{ officer.name }}</td>
                                <td width="15%" style="text-align: right;">{{ officer.handy }}</td>
                                <td width="20%" style="text-align: right;">{{ officer.funk }}</td>
                                <td v-if="editmode">
                                    <button class="remove" v-on:click="removeOfficer(streife, officer.name)">
                                        <i class="fa fa-minus-circle" aria-hidden="true"></i></button>
                                </td>
                            </tr>
                            <tr v-if="editmode" class="insert">
                                <td colspan="3"><input
                                    @change="refreshToAddOfficer($event.target.value)"
                                    maxlength="64"
                                    placeholder="Name / Id"
                                /></td>
                                <td colspan="2">
                                    <button v-on:click="addOfficer(streife)"><i
                                        class="fa fa-plus-circle"
                                        aria-hidden="true"
                                    ></i></button>
                                </td>
                            </tr>
                        </table>
                    </li>
                    <li v-if="editmode" class="streife">
                        <div class="headinfo">
                            <span><input
                                :readonly="!editmode"
                                v-model="addStreifeName"
                                maxlength="24"
                                placeholder="Streifenname"
                            /> </span>
                            <i class="fa fa-plus-circle" aria-hidden="true" v-on:click="createStreife()"></i>
                        </div>

                        <div class="vehicleinfo">
                            <div class="vehdata">
                                <input
                                    :readonly="!editmode"
                                    type="number"
                                    v-model="addStreifeVehId"
                                    maxlength="8"
                                    placeholder="KFZ-Id"
                                />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'StreifenApp',
    extends: BaseApp,
    data () {
        return {
            streifen       : [],
            info           : [],
            editmode       : false,
            toaddOfficer   : '',
            addStreifeName : '',
            addStreifeVehId: '',
            timer          : null,
        }
    },
    methods: {
        responseStreifenData (response) {
            this.streifen = JSON.parse(response)
        },
        responseStreifenInfo (response) {
            this.info = JSON.parse(response)
        },
        changeEditMode () {
            this.editmode = this.editmode ? false : true
        },
        deleteStreife (streife) {
            this.triggerServer('deleteStreife', streife.id)
        },
        updateStreife (streife) {
            this.triggerServer('updateStreife', streife.id, streife.name, streife.vehid, streife.code)
        },
        addOfficer (streife) {
            this.triggerServer('addOfficerToStreife', streife.id, this.toaddOfficer)
            this.toaddOfficer = ''
        },
        removeOfficer (streife, name) {
            this.triggerServer('removeOfficerFromStreife', streife.id, name)
        },
        setState (state) {
            this.triggerServer('setStreifenState', state)
        },
        createStreife () {
            this.triggerServer('createStreife', this.addStreifeName, this.addStreifeVehId)
            this.addStreifeName  = ''
            this.addStreifeVehId = ''
        },
        refreshToAddOfficer (val) {
            this.toaddOfficer = val
        },
        findStreife (streife) {
            this.triggerServer('findStreife', streife.id)
        },
        askSupportStreife (streife) {
            this.triggerServer('askSupportStreife', streife.id)
        },
        refresh () {
            if (this.editmode === false) {
                this.triggerServer('requestCurrentStreifen')
            }
        },
    },
    mounted () {
        this.triggerServer('requestCurrentStreifen')
        this.triggerServer('requestStreifenInfo')

        if (this.timer) clearInterval(this.timer)

        let that   = this
        this.timer = setInterval(function () {
            that.refresh()
        }, 10000)
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
.streifenapp {

    .toolbar--material, .toolbar, .toolbar--material__center, .page__content, .app_content {
        color: #ccc;
        background: rgba(0, 0, 0, 0.7);
    }

    .headline {
        width: 100%;
        height: 7vh;
        padding: 1.2vh 2vh 1vh 2vh;
        border-bottom: 2px solid rgba(0, 0, 0, 0.5);

        .add_Button button {
            position: absolute;
            right: 1vh;
            top: 2vh;
            padding: 1vh 2vh;
            color: #ccc;
            background-color: rgba(218, 114, 0, 0.8);
            cursor: pointer;
        }

        .ampel {
            position: absolute;
            right: 20vh;
            top: 3vh;

            div {
                width: 2vh;
                height: 2vh;
                cursor: pointer;
                border-radius: 3vh;
                opacity: 0.2;
                float: left;
                margin: 0 1vh;
            }

            div:hover, .active {
                opacity: 0.5;
            }

            .button_1 {
                background-color: rgba(0, 255, 0, 1);
            }

            .button_2 {
                background-color: rgba(255, 255, 0, 1);
            }

            .button_3 {
                background-color: rgba(255, 0, 0, 1);
            }
        }

        .item {
            float: left;

            div {
                float: left;
                margin: 0 0.5vh;

                .desc {
                    background-color: rgba(0, 0, 0, 0.5);
                    padding: 0.2vh 1vh;
                    text-align: center;
                    font-weight: bold;
                    font-size: 1.4vh;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                    margin: 0;
                    width: 100%;
                }

                .value {
                    background-color: rgba(255, 255, 255, 0.1);
                    padding: 0.2vh 1vh;
                    width: 100%;
                    margin: 0;
                    font-size: 1.4vh;
                    text-align: center;
                    border: 1px solid rgba(0, 0, 0, 0.5);
                }
            }
        }
    }

    .streifenlist {

        height: 48vh;
        overflow-y: scroll;
        width: 100%;
        padding: 1vh;

        li.streife {
            margin: 0 2vh 2vh 0;
            width: 33vh;
            display: inline-block;
            vertical-align: top;
            float: none;
            background-color: rgba(0, 0, 0, 0.4);

            .headinfo {
                font-size: 1.3vh;
                width: 100%;
                padding: 0.5vh 0;
                height: 5vh;
                text-align: center;
                margin: 0;
                background-color: rgba(0, 0, 0, 0.3);
                border-left: 1vh solid rgba(0, 255, 0, 0);

                .kfzicon {
                    float: left;
                    margin-left: 1vh;
                    width: 15%;
                }

                .actions {
                    float: right;
                    width: 20%;
                    text-align: right;

                    i {
                        float: left;
                        width: 0.8vh;
                        text-align: right;
                    }
                }

                .infoname {
                    float: left;
                    width: 58%;
                    height: 4vh;
                    text-align: center;
                    color: rgba(218, 114, 0, 1);
                }

                input {
                    color: #ccc;
                    border: 0px;
                    width: 90%;
                    padding: 0;
                    margin: 0;
                    font-size: 1.3vh !important;
                    text-align: center;
                    height: 2vh;
                }

                span {
                    float: left;
                    width: 80%;
                }

                i {
                    float: right;
                    margin-right: 2vh;
                    margin-top: 0.3vh;
                    cursor: pointer;
                }
            }

            .ampel_1 {
                border-left: 1vh solid rgba(0, 255, 0, 0.3);
            }

            .ampel_2 {
                border-left: 1vh solid rgba(255, 255, 0, 0.3);
            }

            .ampel_3 {
                border-left: 1vh solid rgba(255, 0, 0, 0.3);
            }

            .location {
                font-size: 1.3vh;
                width: 100%;
                padding: 0.3vh 0;
                height: 3vh;
                text-align: center;
                margin: 0;
            }

            table.officers {
                width: 100%;
                font-size: 1.3vh;
                border: 0;

                tr {
                    width: 100%;

                    td {
                        padding: 0.2vh;

                        button.remove {
                            color: orange;
                            cursor: pointer;
                        }
                    }
                }

                tr.insert {

                    background-color: rgba(0, 0, 0, 0.2);

                    input {
                        color: #ccc;
                        border: 0px;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        font-size: 1.3vh !important;
                        text-align: center;
                        height: 2vh;
                    }

                    button {
                        color: green;
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        color: #ccc;
                        background-color: rgba(218, 114, 0, 0.8);
                        cursor: pointer;
                    }
                }
            }

            .vehicleinfo {
                width: 100%;
                padding: 0.5vh 1vh;
                font-size: 1.3vh;
                height: 3vh;

                .vehdata {
                    width: 80%;
                    float: left;

                    input {
                        color: #ccc;
                        border: 0px;
                        width: 25%;
                        padding: 0;
                        margin: 0;
                        font-size: 1.2vh !important;
                        height: 2vh;
                    }
                }

                .status {
                    width: 20%;
                    float: right;

                    input {
                        color: #ccc;
                        border: 0px;
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        font-size: 1.2vh !important;
                        text-align: right;
                        height: 2vh;
                    }
                }
            }
        }
    }
}
</style>

<!--components.Hud.visible = true-->
<!--components.Computer.app = "ComputerMainScreen"-->
<!--components.DesktopApp.responseComputerApps('[{"id":1,"appName":"StreifenApp","name":"StreifenApp","icon":"streifenapp.png"}]')-->
<!--components.StreifenApp.responseStreifenData(' [{"id": 1, "vehid": 1202, "vehname": "Police Felon", "state": 1, "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": [{"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Dr. Christian Cunningham",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Yasha-Tiberius Bleifuss",  "rank": 12, "funk": "1000.7", "handy": 1337}, {"name": "Hannes Hill",  "rank": 12, "funk": "1000.7", "handy": 12345},{"name": "Bernd Brinkmann",  "rank": 12, "funk": "1000.7", "handy": 254651}]}, {"vehid": 1202, "vehname": "Police Felon", "name": "Downtown 1", "location": "Grapeseed Farm East", "officers": []}]');-->