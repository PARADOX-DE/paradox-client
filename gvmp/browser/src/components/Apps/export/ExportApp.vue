<template>
    <v-ons-page class="exportapp">
        <v-ons-toolbar class="app_header">
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Export Handel</div>
        </v-ons-toolbar>
        <div class="app_content">
            <div class="app_content_left">
                <div class="navigation">
                    <ul>
                        <li>Export Locations</li>
                        <li
                            v-for="exportitem in exportitems"
                            v-bind:key="exportitem.id"
                            @click="switchSelect(exportitem)"
                        >
                            <i class="fas fa-caret-right" :style="selectedExport==exportitem ? 'color:green' : ''"></i>
                            {{ exportitem.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="app_content_right">
                <div class="flex-container">
                    <div v-if="selectedExport != null">
                        <span class="description">
                            {{ selectedExport.desc }}
                        </span>
                        <br>

                        <button class="markgps" @click="find(selectedExport)">
                            <span class="fa fa-map-marked-alt"></span>
                        </button>

                        <table class="itemlisttable">
                            <tr>
                                <th colspan="2" width="40%">Beschreibung</th>
                                <th width="40%">Preis</th>
                            </tr>

                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                            <tr v-for="item in selectedExport.items" v-bind:key="item.id">
                                <td><img align="middle" v-bind:src="imagePathFinder(item.png)" @error="img/itemImages/sorry.png" /></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.price }} $</td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'ExportApp',
    extends: BaseApp,
    data () {
        return {
            exportitems   : [],
            selectedExport: null,
        }
    },
    methods: {
        responseExports (response) {
            this.exportitems    = JSON.parse(response)
            this.selectedExport = this.exportitems[0]
        },
        switchSelect (exportitem) {
            this.selectedExport = exportitem
        },
        find (exportitem) {
            this.triggerServer('findExport', exportitem.id)
        },
        imagePathFinder (url) {
            return 'img/itemImages/' + url
        },
    },
    mounted () {
        this.triggerServer('requestExports')
    },
    props: ['pageStack'],
}
</script>

<style lang="scss" scoped>
.exportapp {
    .app_wrapper {
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, .5);
        font-size: 1.5vh;
        color: #ccc;
    }

    .app_header {
        height: 6vh;
        line-height: 6vh;
        box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
        background-color: #313131 !important;
        color: #fff;
    }

    .app_header_left {
        float: left;
        width: 50%;
        font-size: 2vh;
        color: #fff;
    }

    .app_header_left .back {
        font-size: 2vh;
        float: left;
        width: 6vh;
        text-align: center;
    }

    .app_header_left .back:hover {
        cursor: pointer;
    }

    .app_header_left .title {
        float: left;
        padding-left: 1vh;
    }

    .app_header_right {
        float: right;
        width: 50%;
        padding-top: 1.4vh;
        text-align: right;
        padding-right: 2vh;
    }

    .app_content {
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        color: #ccc;
    }

    .app_content_left {
        float: left;
        width: 22%;
        height: 100%;
        position: relative;
        padding-top: 1vh;
        box-shadow: 5px 6px 19px 0px rgba(0, 0, 0, 0.37);
    }


    .navigation ul {
        margin: 0;
        padding: 0;
    }

    .navigation ul li:first-child, .checkboxes ul li:first-child {
        border: 0;
        font-size: 1.1vh;
    }

    .navigation ul li:first-child:hover {
        padding-left: 1vh;
    }

    .navigation ul li {
        font-size: 1.2vh;
        height: 3vh;
        line-height: 3vh;
        border-bottom: 0.1vh solid #ccc;
        padding-left: 1vh;
        transition: 500ms all;
    }

    .navigation ul li:hover {
        padding-left: 1.5vh;
        transition: 500ms all;
        cursor: pointer;
    }

    .navigation ul li .fas {
        opacity: 0.5;
    }


    .app_content_right {
        float: right;
        height: 100%;
        width: 80%;
        padding: 1vh;
        overflow-x: hidden;
        overflow-y: scroll;
        width: 75%;
        padding-top: 1vh;
    }

    .clear {
        clear: both
    }

    .checkboxes {
        bottom: 0vh;
        position: absolute;
        width: 100%;
    }

    .checkboxes ul {
        margin: 0;
        padding: 0;
    }

    .checkboxes ul li {
        height: 4vh;
        line-height: 4vh;
        border-bottom: 0.1vh solid #ccc;
        padding-left: 1vh;
        position: relative;
        transition: 500ms all;
    }

    .checkboxes ul li label {
        position: absolute;
        left: 3vh;
        top: -0.2vh;
    }

    .checkboxes ul li input {
        height: 1.5vh;
        width: 1.5vh;
    }

    .btn:hover {
        transform: scale(1.1);
        transition: 500ms all;
    }

    .search {
        padding: 1vh;
        margin-top: 1vh;
        position: relative;
    }

    .search .searchbtn {
        position: absolute;
        right: 1vh;
        top: 1.15vh;
        font-size: 1vh;
        width: 4vh;
        height: 4vh;
        line-height: 4vh;
        font-size: 1.6vh;
        text-align: center;
        color: grey;
        border: 0.2vh solid #ccc;
        border-radius: 0.3vh;
    }

    .search .searchbtn:hover {
        transform: scale(1.1);
        transition: 500ms all;
    }

    .search .sidebar_title {
        font-size: 1.4vh;
    }

    .search input {
        width: 78%;
        font-family: 'Helvetica', FontAwesome, sans-serif;
    }

    .switch2 {
        position: relative;
        display: inline-block;
        width: 5vh;
        height: 3vh;
    }


    input {
        margin: .4rem;
    }

    /* Angebot design*/

    .flex-container {
        display: flex;
        flex-wrap: wrap;
    }

    .flex-container > .flex-box {
        width: 32%;
        margin: 1.5vh 0.5vh;
        border: 0.1vh solid #ccc;
        min-height: 15vh;
        position: relative;
        background: #fff;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
    }

    .flex-box-inner {
        padding: 1vh;
    }

    .box-center {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .form input {
        width: 100%
    }

    .description {
        width: 50%;
        font-size: 1vh;
        float: left;
        margin-bottom: 5%;
        margin-top: 1%;
    }

    .markgps {
        width: 2vh;
        margin-left: 1vh;
        float: right;
    }

    .markgps:hover, .markgps span:hover {
        cursor: pointer;
        color: rgba(218, 114, 0, 1);
    }

    .markgps span {
        color: rgba(218, 114, 0, 0.8);
        font-size: 2vh;
    }

    /* Dark mode */


    .toolbar--material__center {
        //color: #fff !important;
    }

    .itemlisttable {
        width: 40em;
        text-align: center;
        border: 0;
    }

    .itemlisttable th {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-size: 1.1vh;
    }

    .itemlisttable td {
        font-size: 1.1vh;
    }

    .itemlisttable img {
        width: 30px !important;
        height: 30px;
    }
}
</style>