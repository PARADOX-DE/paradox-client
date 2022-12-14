<template>
    <div class="adminmenu">
        <div style="width:60vh" class="loader" v-show="loader">
            <div class="lds-dual-ring"></div>
        </div>
        <div class="adminlist" v-if="alist">
            <div class="overheader">
                <div class="header">
                    <span class="headertitle"> Admin-Menü </span>
                    <span class="closespan">
                        <i class="fas fa-times" @click="terminate()"></i>
                    </span>
                </div>
            </div>

            <div class="innermenu">
                <ul id="menuItems">
                    <li v-for="(menupoint,idx) in menupoints"
                        :key="idx"
                        class="menupoints"
                        @click="handler(menupoint)">{{menupoint.title}} </li>
                </ul>
            </div>
        </div>

        <div class="playerlist" v-if="plist">
            <div class="overheader">
                <div class="headerp">
                    <span class="headertitle"> Spielerliste </span>
                    <span class="closespan">
                        <i class="fas fa-arrow-left" @click="plist = false; alist = true;savecmd='';saveplayer=''"></i>
                    </span>
                    <span class="closespan">
                        <i class="fas fa-times" @click="terminate()"></i>
                    </span>
                    <br>
                    <input type="text"
                           name="p"
                           class="search"
                           placeholder="Suche..."
                           v-model="filter" />
                </div>
            </div>

            <div class="innermenu">
                <ul id="menuItems">
                    <li v-for="(player,idx) in displayResults"
                        :key="idx"
                        class="menupoints"
                        @click="handlerplayer(player)">{{player.realname}}#{{player.id}} - {{player.fakename}}</li>
                </ul>
            </div>

        </div>
        <Modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">{{savecmd.Title}}</h3>
            <div slot="body" class="form">
                <form ref="adminConfirm" style="color:white">
                    Id: {{saveplayer.id}}<br />
                    Realname: {{saveplayer.realname}}<br />
                    Fakename: {{saveplayer.fakename}}<br />
                                                     <br />
                    <div v-if="savecmd.input"><input type="text" name="modalInput" :placeholder="savecmd.input ? savecmd.input:'Parameter'"/></div>
                </form>
            </div>
            <div class="btn" style="color:white" slot="footer" @click="confirm()">Ausführen</div>
            <div class="btn" style="color:orange" slot="footer" @click="showModal=false">Abbrechen</div>
        </Modal>
</div>
</template>

<script>
import BaseWindow from '../BaseWindow'
import Modal from '../Apps/marketplace/modalComp'

export default {
    name: 'AdminMenu',
    extends: BaseWindow,
    components: { Modal },
    data () {
        return {
            menu_id: null,
            alist: true,
            plist: false,
            loader: false,
            showModal: false,
            savecmd: '',
            saveplayer:'',
            filter: '',
            menupoints: [], 
            players: [] 
        }
    },
    methods: {
        resultsSearchFilter () {
            var tmp_result = this.players
            if (this.filter.length >= 2) {
                tmp_result = tmp_result.filter((x) => {
                    return(
                    x.fakename.toLowerCase().includes(this.filter.toLowerCase())||
                    x.realname.toLowerCase().includes(this.filter.toLowerCase()) ||
                    x.id.toString().toLowerCase().includes(this.filter.toLowerCase())
                    )
                })
            }
            return tmp_result
        },
        terminate() {
            this.dismiss()
        },
        responseCloseAdminMenu() {
            this.dismiss();
        },
        responseAdminMenu(data,players) {
            this.menupoints = JSON.parse(data)
            this.players = JSON.parse(players)
            this.loader = false
        },
        handler(nav) {
            this.savecmd = nav;
            if (!this.savecmd.showplayers) {
                this.triggerServer('requestAdminMenuCmd', this.savecmd.cmd, 0, "")
            } else {
                this.alist = false;
                this.plist = true;
            }
        },
        handlerplayer(player) {
            if (this.savecmd && player) {
                this.saveplayer = player;
                if (!this.savecmd.confirm) {
                    if (this.savecmd.server) {
                        this.triggerServer('requestAdminMenuCmd', this.savecmd.cmd, player.id, "")
                    }
                } else {
                    this.showModal = true;
                }
            }
        },
        confirm() {
            if (this.savecmd && this.saveplayer) {
                if (this.savecmd.input) {
                    var input = this.$refs.adminConfirm.elements;
                    [...input].forEach((x) => {
                        if (!x.value) {
                            x.style.borderBottomColor = 'red'
                            return;
                        }
                    })
                }
                if (this.savecmd.server) {
                    this.triggerServer('requestAdminMenuCmd', this.savecmd.cmd, this.saveplayer.id, (input.modalInput.value) ? input.modalInput.value : "")
                    this.dismiss()
                }
            }
            this.showModal = false;
        }
    },
    computed: {
            displayResults () {
                return this.resultsSearchFilter()
            }
        },
    mounted() {
            this.triggerServer('requestAdminMenu')
            this.loader = true
    }
}
</script>

<style lang="css" scoped>
    .loader {
        position: absolute;
        z-index: 999;
        background-color: rgba(0, 0, 0, .5);
        width: 35vh;
        height: 100%;
        border-radius: 1vh 0 0 1vh;
    }

    .lds-dual-ring {
        display: inline-block;
        width: 8vh;
        height: 8vh;
        position: absolute;
        top: 50%;
        left: 35%;
    }

        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 7vh;
            height: 7vh;
            margin: 1vh;
            border: 6px solid #fff;
            border-radius: 50%;
            border-color: #fff transparent #fff transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }


.adminmenu{
    width: 36rem;
    height: 45rem;
    min-height: 40rem;
    max-height: 50rem;
    float: right;
    margin-top: 16vh;
    margin-right: 0vh;
    position: relative;
    overflow: hidden;
}
.overheader{
    width: 100%;
    height: 9%;
    background: linear-gradient(320deg, rgba(218, 114, 0, 0.8) 10%, rgba(0, 0, 0, 0) 85%);
}
.innermenu{
    width: 100%;
    height: 91%;
    max-height: 28rem;
    overflow: overlay;
}
::-webkit-scrollbar{
  width: 4px;
}
::-webkit-scrollbar-thumb{
  background-color: rgba(255, 187, 0, 0.9);
}
.header{
    text-align: right;
    justify-content: center;
    line-height: 2.6rem;
    margin-right: 1rem;
}
.headerp{
    text-align: right;
    justify-content: center;
    margin-right: 1rem;
}
.headertitle{
    align-items: center;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
}
.closespan{
    width: 3.5rem;
    height: 3.5rem;
    color: white;
    border-radius: 50%;
    padding-left: 0.5rem;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
}
.menupoints{
    text-align: right;
    margin-right: 0.5rem;
    color: white;
}
.menupoints:hover{
    background: linear-gradient(270deg, rgba(116, 114, 114, 0.601) 90%, rgba(228, 54, 54, 0) 90%);
}
ul{
  margin: 0;
  padding: 0;
  min-height: 28rem;
  height: 28rem;
}
li{
  list-style: none;
  justify-content: center;
  line-height: 2rem;
  font-size: 1.2rem;
  height: 2.5rem;
  width: 99%;
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  background: linear-gradient(270deg, rgba(0, 0, 0, 0.600717787114846) 90%, rgba(0, 0, 0, 0) 90%);
}
.active {
    opacity: 1;
    margin-left: 1vh;
    background: rgba(220, 160, 140, 0.5);
}
.search{
    color: white;
    height: 2rem;
    margin: 0;
    text-align: right;
}
</style>
