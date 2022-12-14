<template>
    <v-ons-page>
        <v-ons-toolbar>
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-back-button class="pointerClass"></v-ons-back-button>
                </v-ons-toolbar-button>
            </div>
            <div class="center">Business Übersicht</div>
        </v-ons-toolbar>
        <div class="app_content">
            <div class="app_content_left">
                <div class="navigation">
                    <ul>
                        <li>Navigation</li>
                        <li v-for="(b,idx) in links" v-bind:key="idx" @click="loader(b)">
                            <i class="fas fa-caret-right" :style="selected==b ? 'color:green' : ''"></i> {{ b }}
                        </li>
                    </ul>
                </div>
                <div>
                    <img :src="getImageLoader(selected)" />
                </div>
            </div>
            <div class="app_content_right">
                <div class="flex-container" v-if="links.length>=1">
                    <component v-bind:is="currentComponent" v-bind:data="data" v-bind:secdata="secdata"></component>
                </div>
                <div v-if="links.length<=0">
                    Sie sind in keinem entsprechenden Business.
                </div>
            </div>
            <div class="clear"></div>
            <div class="loader_businessdetail" v-show="dataLoader">
                <div class="lds-dual-ring_businessdetail"></div>
            </div>
        </div>
    </v-ons-page>
</template>


<script>
import BaseApp from '../../BaseApp'
import Mitglieder from './MitgliederComp'
import Tankstelle from './TankstelleComp'
import Oelpumpe from './OelpumpeComp'
import Club from './NachtclubComp'

export default {
    name: 'BusinessDetailApp',

    extends: BaseApp,

    components: { Mitglieder, Tankstelle, Oelpumpe, Club },
    data () {
        return {
            links     : [],
            selected  : 'Mitglieder',
            data      : [],
            secdata   : [],
            dataLoader: false,
            timer     : 0,
        }
    },
    methods : {
        responseBusinessDetailLinks (response) {
            this.links = JSON.parse(response)
            if (this.links.length > 0) {
                this.triggerServer('requestBusinessDetailAllMembers')
                this.dataLoader = true
            }
        },
        responseBusinessDetail (response, arg = '[]') {
            this.dataLoader = false
            this.data       = JSON.parse(response)
            this.secdata    = JSON.parse(arg)
        },
        getImageLoader (image) {
            if (this.selected == 'Mitglieder') return
            return require('@/assets/business/' + image + '.png')
        },
        loader (idx) {
            if (idx == this.selected) return
            if ((+new Date() - this.timer) < 5000) {
                this.trigger('businessNotify', '[]')
                return
            }
            this.timer      = +new Date()
            this.selected   = idx
            this.data       = []
            this.dataLoader = false
            switch (this.selected) {
                case 'Mitglieder':
                    this.triggerServer('requestBusinessDetailAllMembers')
                    break
                case 'Tankstelle':
                    this.triggerServer('requestBusinessDetailFuelstation')
                    break
                case 'Oelpumpe':
                    this.triggerServer('requestBusinessDetailRaffinery')
                    break
                case 'Club':
                    this.triggerServer('requestBusinessDetailNightclub')
                    break
            }
        },
    },
    props   : ['pageStack'],
    computed: {
        currentComponent: function () {
            return this.selected
        },
    },
    mounted () {
        this.triggerServer('requestBusinessDetail')
        this.timer = +new Date()
    },

}
</script>

<style lang="scss" scoped>
section {
    margin: 20px;
}

.mittig {
    text-align: center;
}

.pointerClass {
    cursor: pointer;
}

.segment {
    width: 100% !important;
    border-bottom: 1px solid #3c3c3c;

    & .__item:hover {
        background-color: #0076ff;
        color: #fff !important;

        .segment__button {
            color: white;
        }
    }

    &__button {
        border-radius: 0;
        border: 0;
    }

    :checked + &__button {
        color: white;
    }

}

.appBox {
    .title {
        font-size: 1.3em;
        border-bottom: 1px solid #3c3c3c;
        font-weight: 600;
    }

    .contentright {
        text-align: left;
        padding: 0 0.2rem 0 0;
        //color: black;
        font-size: 0.8em;
        padding-bottom: 1em;

        p {
            padding-bottom: 0.5em;
        }
    }

    .contentleft {
        float: left;
        width: 30%;
        padding: 0 1rem 1rem 0.5rem;
    }

    padding: 0;
}

.fRow_businessdetail {
    padding: 1rem 0 0 0rem;
}

.shadow_businessdetail {
    //-webkit-box-shadow: 3px 3px 5px 6px #ccc;
    //-moz-box-shadow: 3px 3px 5px 6px #ccc;
    //box-shadow: 3px 3px 5px 6px #ccc;
    padding: 1vh;
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
    font-size: 1.4vh;
}

.navigation ul li:first-child:hover {
    padding-left: 1vh;
}

.navigation ul li {
    height: 4vh;
    line-height: 4vh;
    border-bottom: 0.1vh solid #3c3c3c;
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
    width: 78%;
    padding: 1vh;
    overflow-x: hidden;
    overflow-y: scroll;
}

.clear {
    clear: both
}

.loader_businessdetail {
    position: absolute;
    z-index: 999;
    //background-color: rgba(0, 0, 0, .5);
    width: 100%;
    height: 100%;
    top: 0;
}

.lds-dual-ring_businessdetail {
    display: inline-block;
    width: 8vh;
    height: 8vh;
    position: relative;
    left: 50%;
    top: 35%;
}

.lds-dual-ring_businessdetail:after {
    content: " ";
    display: block;
    width: 7vh;
    height: 7vh;
    margin: 1vh;
    border: 6px solid #3c3c3c;
    border-radius: 50%;
    border-color: #3c3c3c transparent #3c3c3c transparent;
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

</style>