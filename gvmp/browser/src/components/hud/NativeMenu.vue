<template>
    <div v-if="visible" id="app" class="nativeui">
        <div class="wrapper">
            <div class="right_menu">
                <div class="inner">
                    <div class="headline">
                        <div class="title pos2">
                            {{ title }}

                            <span
                                @click="hide()"
                                class="card_shadow inter"
                            >
                                <i class="fas fa-sign-out-alt"></i>
                            </span>
                        </div>
                    </div>

                    <hr>

                    <div class="modul" style="">
                        <div class="title">
                            <span class="numbers">
                                {{ currentIndex + 1 }} / {{ items.length }}
                            </span>

                            <span class="numbers2">
                                {{ sub_title }}
                            </span>

                            <div class="clear"></div>
                        </div>

                        <div class="navi_mini" style="">
                            <ul id="menuItems">
                                <li
                                    v-for="item in sortedItems"
                                    :key="item.index"
                                    @click="currentIndex = item.index; handle()"
                                    :class="{ active: currentIndex === parseInt(item.index)}"
                                >
                                    <p>{{ item.data.Label }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseComponent from '../BaseComponent'

export default {
    name: 'NativeMenu',

    extends: BaseComponent,

    data () {
        return {
            menu_id: null,
            visible: false,

            title    : '',
            sub_title: '',
            items    : [],

            currentIndex: 0,
        }
    },

    computed: {
        sortedItems () {
            let clone = this.items

            clone.sort((a, b) => {
                return parseInt(a.index) - parseInt(b.index)
            })

            return clone
        },
    },

    methods: {
        createMenu (title, sub_title) {
            this.items = []
            this.title = title
            this.sub_title = ''

            if (typeof sub_title !== 'undefined' && sub_title) {
                this.sub_title = sub_title
            }

            this.currentIndex = 0
        },

        addItem (item, idx) {
            this.items.push({
                data : JSON.parse(item),
                index: idx,
            })
        },

        addItemClean (item, idx) {
            this.items.push({
                data : item,
                index: idx,
            })
        },

        show (id) {
            this.menu_id = id
            this.visible = true

            this.trigger('show', [])
        },

        showNativeMenu (menu, id) {
            menu = JSON.parse(menu)

            this.createMenu(menu.Title, menu.Description)

            menu.Items.forEach((item, idx) => {
                this.addItemClean(item, idx)
            })

            this.show(id)
        },

        hide () {
            this.visible = false

            this.trigger('hide')

            this.triggerServer('m', -this.menu_id)
        },

        handle () {
            this.triggerServer('m', this.currentIndex)
        },

        onKeyUp (event) {
            if (!this.visible) return

            switch (event.keyCode) {
                case 2:
                case 18:
                case 27:
                    this.hide()

                    break
                case 13:
                    this.handle(this.currentIndex)

                    break
                case 38: // up
                    if (this.currentIndex > 0) {
                        this.currentIndex = this.currentIndex - 1
                    } else if (this.currentIndex === 0) {
                        this.currentIndex = this.items.length - 1
                    }

                    document.getElementById('menuItems').childNodes[this.currentIndex].scrollIntoView(false)

                    break
                case 40: // down
                    if (this.currentIndex < this.items.length - 1) {
                        this.currentIndex = this.currentIndex + 1
                    } else if (this.currentIndex === this.items.length - 1) {
                        this.currentIndex = 0
                    }

                    document.getElementById('menuItems').childNodes[this.currentIndex].scrollIntoView(false)

                    break
            }
        },
    },

    mounted () {
        window.addEventListener('keyup', this.onKeyUp)
    },

    destroyed () {
        window.removeEventListener('keyup', this.onKeyUp)
    },
}
</script>

<style lang="scss" scoped>

.buttongroup {
    margin-top: 4vh;
}

.search {
    width: 70%;
    color: #fff;
}

input:focus {
    color: #fff;
    border-bottom-color: #fff;
}

input {
    color: #fff;
    border-bottom-color: #666;;
}


.button_left {
    background-image: url('./../../assets/cardbg.png');
    float: left;
    width: 50%;
    text-align: center;
    height: 5vh;
    line-height: 5vh;
    border-top-left-radius: 0.5vh;
    border-bottom-left-radius: 0.5vh;
    background-size: cover;
    opacity: 0.7;
    transition: 200ms all;
}

.button_right {
    background-image: url('./../../assets/cardbg.png');
    float: right;
    width: 50%;
    text-align: center;
    height: 5vh;
    line-height: 5vh;
    border-top-right-radius: 0.5vh;
    border-bottom-right-radius: 0.5vh;
    background-size: cover;
    opacity: 0.7;
    transition: 200ms all;
}

.button_left:hover {
    opacity: 1;
    transition: 200ms all;
    cursor: pointer;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(213, 26, 1, 0.8);
}

.button_right:hover {
    opacity: 1;
    transition: 200ms all;
    cursor: pointer;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(84, 233, 44, 0.9);
}

.active {
    opacity: 1;
    margin-left: 1vh;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    background: rgba(220, 160, 140, 0.5);
}

.inter:hover {
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(216, 91, 0, 0.9);
    cursor: pointer;
}


.clear {
    clear: both;
}

.wrapper {
    z-index: 900;
    color: #fff;
    font-family: 'Oswald', sans-serif;
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-size: cover;
    font-size: 1.5vh;
    animation: fadeIn 0.5s;
    background: rgb(0, 0, 0);
    background: linear-gradient(268deg, rgba(0, 0, 0, 0.600717787114846) 10%, rgba(0, 0, 0, 0) 100%);
}

.right_menu {
    position: absolute;
    width: 25%;
    height: 100%;
    right: 0vh;
    animation: slideinright 0.1s;

}

.inner {
    padding: 5vh;
}

.menu_logo {
    text-align: center;
}

.menu_logo img {
    height: 8vh;
    text-align: center;
    padding-bottom: 6vh;
}

.balance {
    font-size: 4vh;
}

.balance span {
    font-size: 2vh;
}

hr {
    opacity: 0.3;
}

.title {
    margin: 3vh 0vh;
    font-size: 2.5vh;
    font-weight: 300
}

.title .material-icons {
    font-size: 2.7vh;
}


.navi_mini {
    height: 67vh;
    overflow-y: scroll;
    overflow-x: hidden;
}

.navi_mini ul {
    margin: 0;
    padding: 0;
    padding-right: 2.5vh;
}

.navi_mini ul li {
    display: inline-block;
    line-height: 3vh;
    height: 4vh;
    width: 100%;
    font-size: 1.4vh;
    margin-bottom: 1vh;
    background-size: cover;
    opacity: 0.7;
    transition: 500ms all;
    padding-top: 0.5vh;
    padding-left: 1vh;
    border-radius: 0.5vh;
    background-image: url('./../../assets/cardbg.png');
}


.navi_mini ul li:hover {
    opacity: 1;
    transition: 500ms all;
    cursor: pointer;
    margin-left: 1vh;
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);

}

.navi_mini ul li span {
    font-size: 1.4vh;
}

.inter {
    transition: 200ms all;
}

.numbers {
    float: right;
    padding: 0.5vh 1vh;
    border-radius: 0.5vh;
    text-align: center;
    line-height: 4vh;
    font-size: 1.6vh;
    margin-left: 1.0vh;
    background-image: url('./../../assets/cardbg.png');
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
}

.numbers2 {
    float: right;
    padding: 0.5vh 1vh;
    border-radius: 0.5vh;
    text-align: center;
    font-size: 1.6vh;
    line-height: 4vh;
    margin-left: 1.0vh;
}

.pos2 span {
    float: right;
    height: 4vh;
    width: 4vh;
    border-radius: 0.5vh;
    text-align: center;
    line-height: 4vh;
    margin-left: 1.0vh;
    background-image: url('./../../assets/cardbg.png');
    -webkit-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    -moz-box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
    box-shadow: inset 0px 0px 0px 0.02vh rgba(112, 112, 112, 0.8);
}

.pos2 .fas {
    font-size: 2.3vh;
}


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


@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}


@keyframes slideinleft {
    0% {
        left: -1000vh;
    }
    100% {
        left: 0vh;
    }
}

@keyframes slideinright {
    0% {
        right: -1000vh;
    }
    100% {
        right: 0vh;
    }
}

.nativeui {
    .headline {
        background-color: rgba(218, 114, 0, 0.8);
        transform: skewX(-40deg);
        padding: 1vh 6vh;

        .title {
            transform: skewX(40deg);
            font-size: 2vh;
            margin: 0;

            span {
                height: 3vh !important;
                width: 3vh !important;
                line-height: 2.5vh;
            }

            i {
                font-size: 1.5vh;
            }
        }
    }
}

</style>

<!-- components.Hud.visible = true -->
<!-- components.NativeMenu.createMenu("Headline", "Subheadline") -->
<!-- components.Hud.visible = true -->
<!-- components.NativeMenu.addItem("item1") -->
<!-- components.NativeMenu.show(1) -->
<!-- components.NativeMenu.hide() --> 