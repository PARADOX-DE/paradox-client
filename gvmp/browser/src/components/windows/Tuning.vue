<template @mousedown.middle="cursor(false)" @mouseup.middle="cursor(true)">
    <div class="wrapper_tuningMenu">
        <div class="right_tuningMenubox">
            <div class="loader" v-show="loader">
                <div class="lds-dual-ring"></div>
            </div>
            <div class="tuningMenubox_close"><i class="fas fa-times" v-on:click="terminate()"></i></div>

            <span class="" id="playerlist">
                <div class="tuningMenutitel">Tuning Menü</div>
                <hr>
                <input
                    type="text"
                    name="q"
                    class="navsearch"
                    placeholder="Suchbegriff"
                    v-show="!loader"
                    v-model="filter"
                >
                <div class="tuningMenubox_inner2" style="">
                    <div class="tuningMenubox_inner" style="">
                        <ul>
                            <li v-for="(nav,idx) in displayResults"
                                :key="idx"
                                tabindex="0"
                                ref="navbar"
                                class="gvmp-d-flex gvmp-justify-between gvmp-align-items-center" v-show="nav.maxindex>0||nav.id==22||nav.id==22">
                                
                                <i @click="idxDown(idx)" style="padding:1vh" class="fas fa-chevron-left"></i>
                                {{nav.name}} <span style="color:green">{{nav.index}}</span> <span style="color:white">{{nav.oldval}}</span> <span style="color:red">{{nav.maxindex}}</span>

                                    <div>
                                        <i @click="idxUp(idx)" style="padding:1vh;" class="fas fa-chevron-right"></i>
                                        <i @click="saveMod(idx)" style="padding:1vh;margin-left:2.5vh" class="fas fa-check"></i>
                                    </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import BaseWindow from '../BaseWindow'

export default {
    name: 'Tuning',

    extends: BaseWindow,

    props: {
        data: String,
    },

    data () {
        return {
            VisibleNav: [],
            loader         : false,
            filter         : '',
            save           : {},
        }
    },
    methods : {
        terminate () {
            this.triggerServer('requestResetTuningMod')
            this.dismiss()
        },
        saveMod(idx) {
            this.triggerServer('requestSaveTuningMod', this.VisibleNav[idx].id, this.VisibleNav[idx].index)
            this.$refs.navbar[idx].style.backgroundColor = '#228B22';
        },
        idxDown(idx) {
            if (this.VisibleNav[idx].index <= -1) {
                this.VisibleNav[idx].index = -1;

            } else {
                this.VisibleNav[idx].index--;
            }

            this.triggerServer('requestTuningMod', this.VisibleNav[idx].id, this.VisibleNav[idx].index)
            if (this.VisibleNav[idx].index == this.VisibleNav[idx].oldval) {
                this.$refs.navbar[idx].style.backgroundColor = '';
            } else {
                this.$refs.navbar[idx].style.backgroundColor = '#FFA500';
            }
        },
        idxUp(idx) {
            if (this.VisibleNav[idx].index >= this.VisibleNav[idx].maxindex)
            {
                this.VisibleNav[idx].index = this.VisibleNav[idx].maxindex;

            } else
            {
                this.VisibleNav[idx].index++;
            }

            this.triggerServer('requestTuningMod', this.VisibleNav[idx].id, this.VisibleNav[idx].index)
            if (this.VisibleNav[idx].index == this.VisibleNav[idx].oldval) {
                this.$refs.navbar[idx].style.backgroundColor = '';
            } else {
                this.$refs.navbar[idx].style.backgroundColor = '#FFA500';
            }
        },

        responseListMods(data) {
            this.VisibleNav = JSON.parse(data);
            this.loader = false
        },
        responseTuningModlist(data,veh) {
            this.trigger('getMaxIndex', JSON.stringify([data,veh]));
        },
        cursor(data) {
            this.trigger('cursor', JSON.stringify([data]));
        },
        resultsSearchFilter () {
            var tmp_result = this.VisibleNav
            // Search Filter
            if (this.filter.length >= 3) {
                tmp_result = tmp_result.filter((x) => {
                    return (
                        x.name.toLowerCase().includes(this.filter.toLowerCase())
                    )
                })
            }
            return tmp_result
        },

    },
    computed: {
        displayResults () {
            return this.resultsSearchFilter()
        },
    },
    mounted () {
        this.triggerServer('requestTuningModlist')
        this.loader = true;
    },
}
</script>

<style lang="scss" scoped>
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

.wrapper_tuningMenu {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    color: #fff;
    font-size: 1.6vh;
    z-index: 9999;
}

.right_tuningMenubox {
    height: 90VH;
    width: 40vh;
    float: right;
    background-color: rgba(0, 0, 0, 0.5);
    margin-top: 2vh;
    margin-right: 4vh;
    border-radius: 0.35em;
    padding: 2vh;
    overflow: hidden;
    position: relative;
}

.tuningMenubox_close {
    font-size: 2vh;
    position: absolute;
    right: 0;
    height: 4vh;
    width: 4vh;
    color: red;
    text-align: center;
    top: 0.5vh;
    line-height: 4vh;
}

.tuningMenubox_back {
    font-size: 2vh;
    position: absolute;
    left: 0;
    height: 4vh;
    width: 4vh;
    color: #ffff;
    text-align: center;
    top: 0.5vh;
    line-height: 4vh;
}

.tuningMenubox_inner {
    height: 100%;
    border-radius: 0.35em;
}

.tuningMenubox_inner ul {
    margin: 0;
    padding: 0;
    padding-top: 1vh;
    overflow-y: scroll;
    height: 92%;
}

    .tuningMenubox_inner ul li {
        width: 95%;
        list-style-type: none;
        background: blue;
        height: 5vh;
        line-height: 5vh;
        padding-left: 1vh;
        padding-right: 1vh;
        margin-bottom: 1vh;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 0.35em;
    }


.tuningMenutitel {
    font-size: 1.8vh;
    padding: 1vh 0vh;
    text-align: center;
}


.tuningMenubox_inner2 {
    height: 100%;
    border-radius: 0.35em;
}

.tuningMenubox_inner2 ul {
    margin: 0;
    padding: 0;
    padding-top: 1vh;
    overflow-y: auto;
    height: 78%;
}

.tuningMenubox_inner2 ul li {
    width: 95%;
    list-style-type: none;
    background: blue;
    height: 5vh;
    line-height: 5vh;
    padding-left: 1vh;
    margin-bottom: 1vh;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.35em;
}

.tuningMenubox_inner2 ul li:hover {
    transition: 500ms all;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
}


.selected {
    margin-left: 0.5vh;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    background: rgba(220, 160, 140, 0.5);
}


.tuningMenubox_inner2 input {
    width: 100%;
    height: 4vh;
    background-color: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 0.35em;
    border: 0.02vh solid #000;
    color: #fff;
    padding-left: 1vh
}


.button {
    width: 45%;
    height: 4vh;
    background-color: rgba(0, 0, 0, 0.2);
    border: 0;
    border-radius: 0.35em;
    border: 0.02vh solid #000;
    color: #fff;
    text-align: center;
    margin: 1vh 0VH;
    line-height: 4vh
}

.button:hover {
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: 500ms all;
}

.confirmarea {
    margin-top: 3vh
}

.confirm {
    border: 0.02vh solid green;
    float: RIGHT;
}

.abort {
    border: 0.02vh solid red;
    float: LEFT;
}

/* width */
::-webkit-scrollbar {
    width: 2px;
    height: 2px;
}

::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}

::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-thumb:hover {
    background: #fff;
}

::-webkit-scrollbar-thumb:active {
    background: #000;
}

::-webkit-scrollbar-track {
    background: #666;
    border: 0px none #fff;
    border-radius: 50px;
}

::-webkit-scrollbar-track:hover {
    background: #666;
}

::-webkit-scrollbar-track:active {
    background: #333;
}

::-webkit-scrollbar-corner {
    background: transparent;
}


::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #fff;
    opacity: 1; /* Firefox */
}


.flex-container {
    display: flex;
    flex-wrap: wrap;
    max-height: 67vh;
    overflow: hidden;
    overflow-y: scroll;
}

.flex-container > div {
    width: 49%;
    height: 10vh;
    margin: 0.1vh;
    text-align: center;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 1.2vh;
    line-height: 10vh;
    overflow: hidden;
    transition: 500ms all;
    border-radius: 0.35em;
}

.flex-container > div:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transition: 500ms all;
}
</style>
