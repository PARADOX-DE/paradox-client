<template>
    <v-ons-page>
        <v-ons-toolbar style="background-color: darkred;">
            <div class="left">
                <v-ons-toolbar-button>
                    <v-ons-icon
                        style="color: #fff;"
                        icon="md-arrow-back, material:md-arrow-back"
                        size="material: 1.875vh"
                        v-on:click="backBtn"
                    ></v-ons-icon>
                </v-ons-toolbar-button>
            </div>
            <div class="center">
                <img class="titleimg" src="../../../assets/weazelnewslogo.png" />
            </div>
        </v-ons-toolbar>
        <v-ons-list>
            <v-ons-list-header>News Veröffentlichen</v-ons-list-header>
            <v-ons-list-item modifier="longdivider" tappable>
                <label class="left">
                    <v-ons-radio value="0" name="options" v-model="active" active></v-ons-radio>
                </label>
                <label class="center">Standard News</label>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider" tappable>
                <label class="left">
                    <v-ons-radio value="1" name="options" v-model="active"></v-ons-radio>
                </label>
                <label class="center">Event News</label>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider" tappable>
                <label class="left">
                    <v-ons-radio value="2" name="options" v-model="active"></v-ons-radio>
                </label>
                <label class="center">Neuer Bericht</label>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider" tappable>
                <label class="left">
                    <v-ons-radio value="3" name="options" v-model="active"></v-ons-radio>
                </label>
                <label class="center">Lotto</label>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <input style="width:100%; margin-right: 0.9375vh;" placeholder="Überschrift" v-model="headline" />
                </div>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider">
                <div class="center">
                    <textarea
                        style="width:100%; margin-right: 0.9375vh; font-size: 1.5vh;"
                        class="textarea"
                        rows="2"
                        placeholder="Beitrag schreiben"
                        v-model="content"
                    ></textarea>
                </div>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider" tappable>
                <label class="left">
                    <v-ons-switch :checked="gps" v-model="gps"></v-ons-switch>
                </label>
                <label class="center"> GPS anheften</label>
            </v-ons-list-item>
            <v-ons-list-item modifier="longdivider">
                <v-ons-button
                    style="width:100%; margin-right: 0.9375vh; margin-top: -1px;"
                    class="color-background red"
                    modifier="large"
                    v-on:click="submitPost"
                >Veröffentlichen
                </v-ons-button>
            </v-ons-list-item>
        </v-ons-list>
    </v-ons-page>
</template>

<script>
import BaseApp from '../../BaseApp'

export default {
    name   : 'NewsAddApp',
    extends: BaseApp,
    data () {
        return {
            active           : 0,
            headline         : '',
            content          : '',
            newMessage       : '',
            gps              : false,
            lotto            : false,
            playerFirstName  : '',
            playerLastName   : '',
            playerPhoneNumber: 0,
            lottodate        : '',
            lottoPrice       : 0,
            playerTeamRank   : 0,
        }
    },
    methods: {
        onReady: function (firstName, lastName, phone, teamRank) {
            this.playerFirstName   = firstName
            this.playerLastName    = lastName
            this.playerPhoneNumber = phone
            this.playerTeamRank    = teamRank
        },
        submitPost () {
            if (this.headline == '' && this.content == '') return
            if (this.gps != false) {
                this.trigger('getLocation', JSON.stringify({ x: 0, y: 0 }))
            } else if (this.lotto != false && this.lottodate != '' && this.lottoPrice != 0) {
                this.triggerServer('addNews', 1, '3$%%$' + this.headline + '$%%$' + this.playerFirstName + '_' + this.playerLastName + '$%%$' + this.lottodate + '$%%$', this.content + '$%%$LOTTO$%%$' + this.lottoPrice + '$%%$' + this.playerPhoneNumber)
            } else {
                this.triggerServer('addNews', 1, this.active + '$%%$' + this.headline + '$%%$' + this.playerFirstName + '_' + this.playerLastName + '$%%$', this.content)
                this.pageStack.splice(1, this.pageStack.length - 1)
            }
        },
        backBtn () {
            this.pageStack.pop()
        },
        setGPSdata (x, y) {
            this.triggerServer('addNews', 1, this.active + '$%%$' + this.headline + '$%%$' + this.playerFirstName + '_' + this.playerLastName + '$%%$', this.content + '$%%$GPS$%%$' + x + '$$' + y)
            this.pageStack.splice(1, this.pageStack.length - 1)
        },
        checkInput () {
            for (this.charAmount = 0; this.charAmount < this.content.length; this.charAmount++) {
                if ([' ', 'ä', 'ö', 'ü', 'ß', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.', '-', '_', '|', '§', '$', '%', '&', '#', ':', '*', '+', '?', '!', '='].indexOf(this.content[this.charAmount].toLowerCase()) == -1) {
                    this.newMessage += '-'
                } else {
                    this.newMessage += this.content[this.charAmount]
                }
            }
            this.content    = ''
            this.content    = this.newMessage
            this.newMessage = ''
        },
    },
    props  : ['pageStack'],
}
</script>